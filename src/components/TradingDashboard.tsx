import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Signal {
  id: number;
  pair: string;
  type: 'BUY' | 'SELL';
  price: number;
  time: string;
  profit: number;
}

export default function TradingDashboard() {
  const [signals] = useState<Signal[]>([
    { id: 1, pair: 'BTC/USDT', type: 'BUY', price: 43250.50, time: '14:23', profit: 2.4 },
    { id: 2, pair: 'ETH/USDT', type: 'SELL', price: 2280.30, time: '14:18', profit: -0.8 },
    { id: 3, pair: 'SOL/USDT', type: 'BUY', price: 98.75, time: '14:10', profit: 5.2 },
    { id: 4, pair: 'BNB/USDT', type: 'BUY', price: 312.40, time: '13:55', profit: 1.9 },
  ]);

  const stats = [
    { label: 'Баланс', value: '$12,450.80', icon: 'Wallet', change: '+8.2%', positive: true },
    { label: 'Прибыль 24ч', value: '+$542.30', icon: 'TrendingUp', change: '+12.4%', positive: true },
    { label: 'Активных сделок', value: '8', icon: 'Activity', change: '2 новые', positive: true },
    { label: 'Win Rate', value: '68%', icon: 'Target', change: '+3%', positive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name={stat.icon} className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Торговые сигналы
            <Badge className="ml-2 bg-green-500/20 text-green-500 border-green-500/30 animate-pulse-slow">
              LIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50 hover:bg-background/80 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-md font-semibold ${
                    signal.type === 'BUY' 
                      ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-500 border border-red-500/30'
                  }`}>
                    {signal.type}
                  </div>
                  <div>
                    <p className="font-semibold">{signal.pair}</p>
                    <p className="text-sm text-muted-foreground">{signal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold">${signal.price.toLocaleString()}</p>
                  <p className={`text-sm ${signal.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {signal.profit > 0 ? '+' : ''}{signal.profit}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="LineChart" size={20} />
              График активности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 70].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-md transition-all duration-300 hover:from-primary hover:to-primary/70"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} />
              Распределение портфеля
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { asset: 'BTC', percent: 45, color: 'bg-orange-500' },
                { asset: 'ETH', percent: 30, color: 'bg-blue-500' },
                { asset: 'SOL', percent: 15, color: 'bg-purple-500' },
                { asset: 'BNB', percent: 10, color: 'bg-yellow-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{item.asset}</span>
                    <span className="text-muted-foreground">{item.percent}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
