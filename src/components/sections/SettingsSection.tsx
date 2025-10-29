import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function SettingsSection() {
  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="trade-signals">Торговые сигналы</Label>
              <p className="text-sm text-muted-foreground">Получать уведомления о новых сигналах</p>
            </div>
            <Switch id="trade-signals" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="price-alerts">Ценовые оповещения</Label>
              <p className="text-sm text-muted-foreground">Уведомления при достижении целевой цены</p>
            </div>
            <Switch id="price-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notif">Email уведомления</Label>
              <p className="text-sm text-muted-foreground">Отправлять важные уведомления на email</p>
            </div>
            <Switch id="email-notif" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} />
            Безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
              <p className="text-sm text-muted-foreground">Дополнительная защита аккаунта</p>
            </div>
            <Switch id="2fa" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="api-access">API доступ</Label>
              <p className="text-sm text-muted-foreground">Разрешить доступ к API для торговли</p>
            </div>
            <Switch id="api-access" defaultChecked />
          </div>
          <Button variant="outline" className="w-full">
            <Icon name="Key" size={16} className="mr-2" />
            Изменить пароль
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sliders" size={20} />
            Торговые настройки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-trade">Автоматическая торговля</Label>
              <p className="text-sm text-muted-foreground">Выполнять сделки автоматически</p>
            </div>
            <Switch id="auto-trade" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="stop-loss">Автоматический Stop-Loss</Label>
              <p className="text-sm text-muted-foreground">Устанавливать стоп-лосс для новых сделок</p>
            </div>
            <Switch id="stop-loss" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="take-profit">Автоматический Take-Profit</Label>
              <p className="text-sm text-muted-foreground">Автоматическая фиксация прибыли</p>
            </div>
            <Switch id="take-profit" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
