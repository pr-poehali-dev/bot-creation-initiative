import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsSection() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'success',
      title: 'Успешная сделка',
      message: 'BTC/USDT позиция закрыта с прибылью +2.4%',
      time: '5 мин назад',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Ценовое оповещение',
      message: 'ETH/USDT достиг целевой цены $2,300',
      time: '15 мин назад',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'Новый сигнал',
      message: 'Рекомендация BUY для SOL/USDT',
      time: '1 час назад',
      read: false,
    },
    {
      id: 4,
      type: 'success',
      title: 'Пополнение баланса',
      message: 'Ваш счет пополнен на $1,000',
      time: '3 часа назад',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      title: 'Системное обновление',
      message: 'Платформа обновлена до версии 2.5.0',
      time: '1 день назад',
      read: true,
    },
  ];

  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: 'CheckCircle2', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      case 'info':
        return { icon: 'Info', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      default:
        return { icon: 'Bell', color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={20} />
              Уведомления
              <Badge className="bg-primary/20 text-primary">3 новых</Badge>
            </CardTitle>
            <Button variant="outline" size="sm">
              Отметить все прочитанными
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notif) => {
            const { icon, color, bg } = getIconAndColor(notif.type);
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 hover:bg-background/80 ${
                  notif.read
                    ? 'border-border/40 bg-background/30'
                    : 'border-primary/30 bg-primary/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={icon} size={20} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold">{notif.title}</h4>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notif.message}</p>
                  <p className="text-xs text-muted-foreground">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
