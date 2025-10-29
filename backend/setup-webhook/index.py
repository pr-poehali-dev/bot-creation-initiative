'''
Business: Автоматическая настройка webhook для Telegram бота
Args: event - dict с httpMethod, queryStringParameters
      context - объект с атрибутами request_id
Returns: HTTP response с результатом настройки webhook
'''

import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    webhook_url = 'https://functions.poehali.dev/e7999d90-8700-459b-ab17-a72b6ddc1870'
    
    if not bot_token:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN not set'})
        }
    
    try:
        url = f'https://api.telegram.org/bot{bot_token}/setWebhook'
        data = {'url': webhook_url}
        
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode('utf-8'))
        
        bot_info_url = f'https://api.telegram.org/bot{bot_token}/getMe'
        bot_info_req = urllib.request.Request(bot_info_url)
        bot_info_response = urllib.request.urlopen(bot_info_req)
        bot_info = json.loads(bot_info_response.read().decode('utf-8'))
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'webhook_set': result.get('ok', False),
                'webhook_url': webhook_url,
                'bot_info': bot_info.get('result', {}),
                'message': 'Webhook успешно настроен! Бот готов к работе.'
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }
