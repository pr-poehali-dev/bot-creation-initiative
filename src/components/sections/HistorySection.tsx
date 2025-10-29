import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Trade {
  id: number;
  pair: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  amount: number;
  profit: number;
  date: string;
  status: 'completed' | 'active';
}

export default function HistorySection() {
  const trades: Trade[] = [
    {
      id: 1,
      pair: 'BTC/USDT',
      type: 'BUY',
      entryPrice: 42150,
      exitPrice: 43250,
      amount: 0.5,
      profit: 550,
      date: '29.10.2025 14:23',
      status: 'completed',
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      type: 'SELL',
      entryPrice: 2300,
      exitPrice: 2280,
      amount: 5,
      profit: -100,
      date: '29.10.2025 12:45',
      status: 'completed',
    },
    {
      id: 3,
      pair: 'SOL/USDT',
      type: 'BUY',
      entryPrice: 95,
      exitPrice: 98.75,
      amount: 50,
      profit: 187.5,
      date: '29.10.2025 10:30',
      status: 'completed',
    },
    {
      id: 4,
      pair: 'BNB/USDT',
      type: 'BUY',
      entryPrice: 310,
      exitPrice: 312.40,
      amount: 10,
      profit: 24,
      date: '28.10.2025 18:15',
      status: 'completed',
    },
    {
      id: 5,
      pair: 'XRP/USDT',
      type: 'SELL',
      entryPrice: 0.65,
      exitPrice: 0.62,
      amount: 2000,
      profit: -60,
      date: '28.10.2025 15:20',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={20} />
            История сделок
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Пара</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Тип</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Вход</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Выход</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Объем</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Прибыль</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Дата</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Статус</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-border/20 hover:bg-background/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold">{trade.pair}</td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          trade.type === 'BUY'
                            ? 'bg-green-500/20 text-green-500 border-green-500/30'
                            : 'bg-red-500/20 text-red-500 border-red-500/30'
                        }
                      >
                        {trade.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right font-mono">${trade.entryPrice.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right font-mono">${trade.exitPrice.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">{trade.amount}</td>
                    <td className={`py-4 px-4 text-right font-semibold ${
                      trade.profit > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{trade.date}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="outline" className="border-green-500/30 text-green-500">
                        {trade.status === 'completed' ? 'Завершена' : 'Активна'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} />
            Статистика за период
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-green-500">+$601.50</p>
              <p className="text-sm text-muted-foreground mt-1">Общая прибыль</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground mt-1">Всего сделок</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-green-500">3</p>
              <p className="text-sm text-muted-foreground mt-1">Успешных</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-red-500">2</p>
              <p className="text-sm text-muted-foreground mt-1">Убыточных</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
