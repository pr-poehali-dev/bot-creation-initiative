'''
Business: Telegram бот для Альфа-реферальной программы с админ-панелью
Args: event - dict с httpMethod, body, headers
      context - объект с атрибутами request_id, function_name
Returns: HTTP response dict для webhook
'''

import json
import os
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
import random
import string

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
DATABASE_URL = os.environ.get('DATABASE_URL', '')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def generate_referral_code() -> str:
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

def is_admin(telegram_id: int) -> bool:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT is_admin FROM users WHERE telegram_id = %s", (telegram_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user and user.get('is_admin', False)

def activate_card_for_user(telegram_id: int, admin_id: int) -> bool:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM users WHERE telegram_id = %s", (telegram_id,))
    user = cur.fetchone()
    
    if not user or user['card_activated']:
        cur.close()
        conn.close()
        return False
    
    cur.execute(
        "UPDATE users SET card_activated = TRUE, balance = balance + 500, total_earned = total_earned + 500 WHERE telegram_id = %s",
        (telegram_id,)
    )
    
    if user['referrer_id']:
        cur.execute(
            "UPDATE users SET balance = balance + 200, total_earned = total_earned + 200 WHERE telegram_id = %s",
            (user['referrer_id'],)
        )
        
        try:
            send_message(
                user['referrer_id'],
                f"🎉 <b>Поздравляем!</b>\n\nВаш реферал активировал карту!\nНа ваш баланс начислено <b>200 ₽</b>",
            )
        except:
            pass
    
    cur.execute(
        "INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES (%s, %s, %s, %s)",
        (admin_id, 'card_activation', telegram_id, 'Карта активирована, начислено 500₽')
    )
    
    conn.commit()
    cur.close()
    conn.close()
    
    try:
        send_message(
            telegram_id,
            "🎉 <b>Поздравляем!</b>\n\nВаша карта активирована!\nНа ваш баланс начислено <b>500 ₽</b>\n\nТеперь вы можете вывести средства через раздел 'Вывод средств'",
        )
    except:
        pass
    
    return True

def get_or_create_user(telegram_id: int, username: str, first_name: str, referrer_code: Optional[str] = None) -> Dict:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM users WHERE telegram_id = %s", (telegram_id,))
    user = cur.fetchone()
    
    if not user:
        referral_code = generate_referral_code()
        referrer_id = None
        
        if referrer_code:
            cur.execute("SELECT telegram_id FROM users WHERE referral_code = %s", (referrer_code,))
            referrer = cur.fetchone()
            if referrer:
                referrer_id = referrer['telegram_id']
                cur.execute(
                    "UPDATE users SET referrals_count = referrals_count + 1 WHERE telegram_id = %s",
                    (referrer_id,)
                )
        
        cur.execute(
            """INSERT INTO users (telegram_id, username, first_name, referrer_id, referral_code)
               VALUES (%s, %s, %s, %s, %s) RETURNING *""",
            (telegram_id, username, first_name, referrer_id, referral_code)
        )
        user = cur.fetchone()
        conn.commit()
    
    cur.close()
    conn.close()
    return dict(user)

def get_keyboard(keyboard_type: str = 'main', is_admin_user: bool = False) -> Dict:
    if keyboard_type == 'main':
        buttons = [
            [{'text': '💳 Оформить карту', 'url': 'https://alfa.me/ASQWHN'}],
            [{'text': '🤝 Реферальная программа', 'callback_data': 'referral'}],
            [{'text': '💰 Вывод средств', 'callback_data': 'withdrawal'}],
            [{'text': 'ℹ️ Информация', 'callback_data': 'info'}],
            [{'text': '📊 Мой профиль', 'callback_data': 'profile'}],
        ]
        if is_admin_user:
            buttons.append([{'text': '⚙️ Админ-панель', 'callback_data': 'admin_panel'}])
        return {'inline_keyboard': buttons}
    elif keyboard_type == 'back':
        return {
            'inline_keyboard': [
                [{'text': '◀️ Назад в меню', 'callback_data': 'menu'}]
            ]
        }
    elif keyboard_type == 'withdrawal':
        return {
            'inline_keyboard': [
                [{'text': '💳 Банковская карта', 'callback_data': 'withdraw_card'}],
                [{'text': '⚡ СБП', 'callback_data': 'withdraw_sbp'}],
                [{'text': '💰 ЮMoney', 'callback_data': 'withdraw_yoomoney'}],
                [{'text': '🥝 QIWI', 'callback_data': 'withdraw_qiwi'}],
                [{'text': '◀️ Назад в меню', 'callback_data': 'menu'}]
            ]
        }
    elif keyboard_type == 'admin':
        return {
            'inline_keyboard': [
                [{'text': '✅ Активировать карту', 'callback_data': 'admin_activate'}],
                [{'text': '💰 Заявки на вывод', 'callback_data': 'admin_withdrawals'}],
                [{'text': '👥 Список пользователей', 'callback_data': 'admin_users'}],
                [{'text': '📊 Статистика', 'callback_data': 'admin_stats'}],
                [{'text': '◀️ Назад в меню', 'callback_data': 'menu'}]
            ]
        }

def send_message(chat_id: int, text: str, reply_markup: Optional[Dict] = None, parse_mode: str = 'HTML'):
    import urllib.request
    
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': parse_mode
    }
    if reply_markup:
        data['reply_markup'] = json.dumps(reply_markup)
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    urllib.request.urlopen(req)

def answer_callback_query(callback_query_id: str, text: Optional[str] = None):
    import urllib.request
    
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/answerCallbackQuery'
    data = {'callback_query_id': callback_query_id}
    if text:
        data['text'] = text
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    urllib.request.urlopen(req)

def handle_start_command(chat_id: int, telegram_id: int, username: str, first_name: str, referrer_code: Optional[str]):
    user = get_or_create_user(telegram_id, username or '', first_name or '', referrer_code)
    is_admin_user = user.get('is_admin', False)
    
    welcome_text = f"""
🌟 <b>Привет, {first_name}!</b>

Получи <b>1000 ₽</b> прямо сейчас!

<b>500 ₽</b> от нас + <b>500 ₽</b> от Альфа-Банка

<b>Что нужно сделать?</b>

1️⃣ Оформить Альфа-Карту по кнопке ниже
2️⃣ Активировать карту в приложении
3️⃣ Сделать покупку от 200 ₽
4️⃣ Отправить чек: @Alfa_Bank778

<b>Бонус:</b> Получайте <b>200 ₽</b> за каждого приглашенного друга!
"""
    
    send_message(chat_id, welcome_text, get_keyboard('main', is_admin_user))

def handle_referral_menu(chat_id: int, telegram_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM users WHERE telegram_id = %s", (telegram_id,))
    user = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if user:
        bot_username = 'Zzaszxcvbot'
        referral_link = f"https://t.me/{bot_username}?start={user['referral_code']}"
        
        text = f"""
🤝 <b>Реферальная программа</b>

📊 <b>Ваша статистика:</b>
• Рефералов: {user['referrals_count']}
• Баланс: {user['balance']} ₽
• Заработано: {user['total_earned']} ₽

🔗 <b>Ваша реферальная ссылка:</b>
<code>{referral_link}</code>

💰 <b>Получайте 200 ₽ за каждого друга!</b>

Когда ваш друг оформит карту и совершит покупку от 200 ₽, вам автоматически начислится 200 ₽!
"""
        
        keyboard = {
            'inline_keyboard': [
                [{'text': '📤 Поделиться ссылкой', 'switch_inline_query': referral_link}],
                [{'text': '◀️ Назад в меню', 'callback_data': 'menu'}]
            ]
        }
        
        send_message(chat_id, text, keyboard)

def handle_withdrawal_menu(chat_id: int, telegram_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT balance FROM users WHERE telegram_id = %s", (telegram_id,))
    user = cur.fetchone()
    
    cur.close()
    conn.close()
    
    balance = user['balance'] if user else 0
    
    text = f"""
💰 <b>Вывод средств</b>

💵 Доступно для вывода: <b>{balance} ₽</b>

Минимальная сумма вывода: 500 ₽

Для вывода средств свяжитесь с администратором: @Alfa_Bank778
"""
    
    send_message(chat_id, text, get_keyboard('back'))

def handle_info_menu(chat_id: int):
    text = """
ℹ️ <b>Информация о программе</b>

<b>Как получить 1000 ₽:</b>
1. Оформите Альфа-Карту по реферальной ссылке
2. Активируйте карту в приложении
3. Совершите покупку от 200 ₽
4. Отправьте чек в @Alfa_Bank778

<b>Реферальная программа:</b>
• <b>200 ₽</b> за каждого приглашенного друга
• Неограниченное количество рефералов
• Автоматическое начисление после активации

<b>Условия вывода:</b>
• Минимум: 500 ₽
• Сроки: 1-3 рабочих дня

📞 Поддержка: @Alfa_Bank778
"""
    
    send_message(chat_id, text, get_keyboard('back'))

def handle_profile_menu(chat_id: int, telegram_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM users WHERE telegram_id = %s", (telegram_id,))
    user = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if user:
        card_status = '✅ Активирована' if user['card_activated'] else '❌ Не активирована'
        
        text = f"""
📊 <b>Ваш профиль</b>

👤 Имя: {user['first_name']}
🆔 ID: {user['telegram_id']}
📅 Регистрация: {user['created_at'].strftime('%d.%m.%Y')}

💳 Карта: {card_status}
💰 Баланс: <b>{user['balance']} ₽</b>
📈 Всего заработано: {user['total_earned']} ₽
👥 Рефералов: {user['referrals_count']}

🔗 Реферальный код: <code>{user['referral_code']}</code>
"""
        
        send_message(chat_id, text, get_keyboard('back'))

def handle_admin_panel(chat_id: int, telegram_id: int):
    if not is_admin(telegram_id):
        send_message(chat_id, "⛔ У вас нет доступа к админ-панели")
        return
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT COUNT(*) as total FROM users")
    total_users = cur.fetchone()['total']
    
    cur.execute("SELECT COUNT(*) as active FROM users WHERE card_activated = TRUE")
    active_users = cur.fetchone()['active']
    
    cur.execute("SELECT SUM(total_earned) as total_paid FROM users")
    total_paid = cur.fetchone()['total_paid'] or 0
    
    cur.close()
    conn.close()
    
    text = f"""
⚙️ <b>Админ-панель</b>

📊 <b>Статистика:</b>
• Всего пользователей: {total_users}
• Активировали карты: {active_users}
• Выплачено: {total_paid} ₽

Выберите действие:
"""
    
    send_message(chat_id, text, get_keyboard('admin'))

def handle_admin_stats(chat_id: int, telegram_id: int):
    if not is_admin(telegram_id):
        return
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT COUNT(*) as total FROM users")
    total_users = cur.fetchone()['total']
    
    cur.execute("SELECT COUNT(*) as active FROM users WHERE card_activated = TRUE")
    active_users = cur.fetchone()['active']
    
    cur.execute("SELECT SUM(balance) as total_balance FROM users")
    total_balance = cur.fetchone()['total_balance'] or 0
    
    cur.execute("SELECT SUM(total_earned) as total_paid FROM users")
    total_paid = cur.fetchone()['total_paid'] or 0
    
    cur.execute("SELECT COUNT(*) as pending FROM card_activations WHERE status = 'pending'")
    pending_activations = cur.fetchone()['pending']
    
    cur.close()
    conn.close()
    
    text = f"""
📊 <b>Подробная статистика</b>

👥 <b>Пользователи:</b>
• Всего: {total_users}
• Активировали карты: {active_users}
• Ожидают активации: {total_users - active_users}

💰 <b>Финансы:</b>
• Баланс пользователей: {total_balance} ₽
• Всего выплачено: {total_paid} ₽

📋 <b>Заявки:</b>
• На активацию: {pending_activations}
"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '◀️ Назад в админку', 'callback_data': 'admin_panel'}]
        ]
    }
    
    send_message(chat_id, text, keyboard)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    if method != 'POST':
        return {'statusCode': 405, 'body': json.dumps({'error': 'Method not allowed'})}
    
    body = json.loads(event.get('body', '{}'))
    
    if 'message' in body:
        message = body['message']
        chat_id = message['chat']['id']
        telegram_id = message['from']['id']
        username = message['from'].get('username', '')
        first_name = message['from'].get('first_name', '')
        text = message.get('text', '')
        
        if text.startswith('/start'):
            referrer_code = None
            if ' ' in text:
                referrer_code = text.split(' ')[1]
            handle_start_command(chat_id, telegram_id, username, first_name, referrer_code)
        elif text.startswith('/activate') and is_admin(telegram_id):
            parts = text.split()
            if len(parts) == 2:
                target_id = int(parts[1])
                if activate_card_for_user(target_id, telegram_id):
                    send_message(chat_id, f"✅ Карта активирована для пользователя {target_id}")
                else:
                    send_message(chat_id, f"❌ Ошибка активации для {target_id}")
    
    elif 'callback_query' in body:
        callback = body['callback_query']
        chat_id = callback['message']['chat']['id']
        telegram_id = callback['from']['id']
        callback_data = callback['data']
        
        answer_callback_query(callback['id'])
        
        if callback_data == 'menu':
            handle_start_command(
                chat_id,
                telegram_id,
                callback['from'].get('username', ''),
                callback['from'].get('first_name', ''),
                None
            )
        elif callback_data == 'referral':
            handle_referral_menu(chat_id, telegram_id)
        elif callback_data == 'withdrawal':
            handle_withdrawal_menu(chat_id, telegram_id)
        elif callback_data == 'info':
            handle_info_menu(chat_id)
        elif callback_data == 'profile':
            handle_profile_menu(chat_id, telegram_id)
        elif callback_data == 'admin_panel':
            handle_admin_panel(chat_id, telegram_id)
        elif callback_data == 'admin_stats':
            handle_admin_stats(chat_id, telegram_id)
        elif callback_data.startswith('withdraw_'):
            method = callback_data.replace('withdraw_', '')
            text = f"Для вывода на {method.upper()} свяжитесь с поддержкой: @Alfa_Bank778"
            send_message(chat_id, text, get_keyboard('back'))
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True})
    }
