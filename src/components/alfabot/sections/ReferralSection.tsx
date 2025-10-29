import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function ReferralSection() {
  const { toast } = useToast();
  const [referralLink] = useState('https://t.me/AlfaBot?start=ref123456');
  const [stats] = useState({
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: 4800,
    pendingEarnings: 1200,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Скопировано!',
      description: 'Реферальная ссылка скопирована в буфер обмена',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-yellow-600 mb-4">
          <Icon name="Users" size={32} className="text-secondary-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Реферальная программа</h1>
        <p className="text-muted-foreground">Зарабатывайте, приглашая друзей</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="Users" className="mx-auto mb-2 text-primary" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.totalReferrals}</p>
            <p className="text-sm text-muted-foreground">Всего рефералов</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="UserCheck" className="mx-auto mb-2 text-green-500" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.activeReferrals}</p>
            <p className="text-sm text-muted-foreground">Активных</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="DollarSign" className="mx-auto mb-2 text-secondary" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.totalEarned} ₽</p>
            <p className="text-sm text-muted-foreground">Всего заработано</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="Clock" className="mx-auto mb-2 text-yellow-500" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.pendingEarnings} ₽</p>
            <p className="text-sm text-muted-foreground">В ожидании</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Link" size={20} />
            Ваша реферальная ссылка
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="font-mono text-sm bg-background/50"
            />
            <Button onClick={copyToClipboard} className="bg-primary">
              <Icon name="Copy" size={18} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Поделитесь этой ссылкой с друзьями и получайте бонусы за каждого нового пользователя
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gift" size={20} />
            Условия программы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Check" className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">500 ₽ за каждого друга</h4>
                <p className="text-sm text-muted-foreground">
                  Получайте 500 рублей, когда ваш друг оформит карту и совершит покупку от 200 ₽
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" className="text-secondary" size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Быстрые выплаты</h4>
                <p className="text-sm text-muted-foreground">
                  Выводите заработанные средства в любое время после подтверждения активации
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Infinity" className="text-green-500" size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Без ограничений</h4>
                <p className="text-sm text-muted-foreground">
                  Приглашайте неограниченное количество друзей и увеличивайте свой доход
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
