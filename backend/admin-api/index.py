'''
Business: API для веб-панели администратора реферальной программы
Args: event - dict с httpMethod, queryStringParameters, body
      context - объект с атрибутами request_id
Returns: HTTP response с данными для админ-панели
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL', '')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def get_stats() -> Dict:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT COUNT(*) as total FROM users")
    total_users = cur.fetchone()['total']
    
    cur.execute("SELECT COUNT(*) as active FROM users WHERE card_activated = TRUE")
    active_users = cur.fetchone()['active']
    
    cur.execute("SELECT SUM(total_earned) as total_paid FROM users")
    total_paid = cur.fetchone()['total_paid'] or 0
    
    cur.execute("SELECT SUM(balance) as pending FROM users")
    pending_balance = cur.fetchone()['pending'] or 0
    
    cur.close()
    conn.close()
    
    return {
        'totalUsers': total_users,
        'activeUsers': active_users,
        'totalEarnings': float(total_paid),
        'pendingWithdrawals': float(pending_balance)
    }

def get_users(limit: int = 50, offset: int = 0) -> list:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        """SELECT telegram_id, username, first_name, balance, referrals_count, 
                  card_activated, created_at 
           FROM users ORDER BY created_at DESC LIMIT %s OFFSET %s""",
        (limit, offset)
    )
    users = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return [
        {
            'id': user['telegram_id'],
            'name': user['first_name'],
            'telegramId': user['username'] or str(user['telegram_id']),
            'balance': float(user['balance']),
            'referrals': user['referrals_count'],
            'cardActivated': user['card_activated'],
            'joined': user['created_at'].strftime('%d.%m.%Y')
        }
        for user in users
    ]

def get_pending_activations() -> list:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        """SELECT u.telegram_id, u.first_name, u.username, u.created_at
           FROM users u
           WHERE u.card_activated = FALSE
           ORDER BY u.created_at DESC
           LIMIT 50"""
    )
    pending = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return [
        {
            'id': user['telegram_id'],
            'type': 'activation',
            'user': user['first_name'],
            'userId': user['telegram_id'],
            'amount': 500,
            'details': user['username'] or str(user['telegram_id']),
            'date': user['created_at'].strftime('%d.%m.%Y')
        }
        for user in pending
    ]

def activate_user_card(user_id: int, admin_id: int) -> Dict:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM users WHERE telegram_id = %s", (user_id,))
    user = cur.fetchone()
    
    if not user or user['card_activated']:
        cur.close()
        conn.close()
        return {'success': False, 'error': 'Карта уже активирована или пользователь не найден'}
    
    cur.execute(
        "UPDATE users SET card_activated = TRUE, balance = balance + 500, total_earned = total_earned + 500 WHERE telegram_id = %s",
        (user_id,)
    )
    
    if user['referrer_id']:
        cur.execute(
            "UPDATE users SET balance = balance + 200, total_earned = total_earned + 200 WHERE telegram_id = %s",
            (user['referrer_id'],)
        )
    
    cur.execute(
        "INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES (%s, %s, %s, %s)",
        (admin_id, 'card_activation', user_id, 'Карта активирована через веб-панель')
    )
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {'success': True, 'message': 'Карта активирована'}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'stats')
    
    try:
        if action == 'stats':
            stats = get_stats()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(stats)
            }
        
        elif action == 'users':
            limit = int(params.get('limit', 50))
            offset = int(params.get('offset', 0))
            users = get_users(limit, offset)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(users)
            }
        
        elif action == 'pending':
            pending = get_pending_activations()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(pending)
            }
        
        elif action == 'activate' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('userId')
            admin_id = body.get('adminId', 0)
            
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'userId required'})
                }
            
            result = activate_user_card(user_id, admin_id)
            return {
                'statusCode': 200 if result['success'] else 400,
                'headers': headers,
                'body': json.dumps(result)
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid action'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
