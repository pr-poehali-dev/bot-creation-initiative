import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Withdrawal {
  id: number;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'rejected';
  date: string;
}

export default function WithdrawalSection() {
  const { toast } = useToast();
  const [balance] = useState(4800);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');

  const [withdrawals] = useState<Withdrawal[]>([
    { id: 1, amount: 1000, method: 'Карта', status: 'completed', date: '25.10.2025' },
    { id: 2, amount: 500, method: 'СБП', status: 'pending', date: '28.10.2025' },
  ]);

  const handleWithdraw = () => {
    if (!amount || !paymentMethod || !paymentDetails) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (Number(amount) < 500) {
      toast({
        title: 'Ошибка',
        description: 'Минимальная сумма вывода 500 ₽',
        variant: 'destructive',
      });
      return;
    }

    if (Number(amount) > balance) {
      toast({
        title: 'Ошибка',
        description: 'Недостаточно средств',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: 'Ваша заявка на вывод средств принята в обработку',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Завершено</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">В обработке</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Отклонено</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-yellow-600 mb-4">
          <Icon name="Wallet" size={32} className="text-secondary-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Вывод средств</h1>
        <p className="text-muted-foreground">Выводите заработанные деньги</p>
      </div>

      <Card className="border-primary/30 bg-gradient-to-br from-card to-secondary/5">
        <CardContent className="p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Доступно для вывода</p>
          <p className="text-5xl font-bold text-secondary mb-4">{balance} ₽</p>
          <p className="text-sm text-muted-foreground">
            Минимальная сумма вывода: 500 ₽
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Send" size={20} />
            Создать заявку на вывод
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Сумма вывода (₽)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="500"
              max={balance}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Способ вывода</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите способ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Банковская карта</SelectItem>
                <SelectItem value="sbp">СБП (Система быстрых платежей)</SelectItem>
                <SelectItem value="yoomoney">ЮMoney</SelectItem>
                <SelectItem value="qiwi">QIWI кошелек</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Реквизиты</Label>
            <Input
              id="details"
              placeholder="Номер карты / телефона / кошелька"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
            />
          </div>

          <Button
            onClick={handleWithdraw}
            className="w-full bg-gradient-to-r from-secondary to-yellow-600 text-secondary-foreground hover:from-secondary/90 hover:to-yellow-600/90"
          >
            <Icon name="Send" size={18} className="mr-2" />
            Отправить заявку
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={20} />
            История выводов
          </CardTitle>
        </CardHeader>
        <CardContent>
          {withdrawals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Выводов пока нет</p>
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon name="ArrowUpRight" className="text-secondary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">{withdrawal.amount} ₽</p>
                      <p className="text-sm text-muted-foreground">
                        {withdrawal.method} · {withdrawal.date}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(withdrawal.status)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
