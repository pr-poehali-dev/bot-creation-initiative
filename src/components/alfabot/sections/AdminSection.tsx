import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/989b0978-28a1-4e74-b0d2-64a1f0dacdc6';

interface User {
  id: number;
  name: string;
  telegramId: string;
  balance: number;
  referrals: number;
  joined: string;
}

interface PendingRequest {
  id: number;
  type: 'withdrawal' | 'activation';
  user: string;
  amount: number;
  details: string;
  date: string;
}

export default function AdminSection() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalEarnings: 0,
    pendingWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes, pendingRes] = await Promise.all([
        fetch(`${API_URL}?action=stats`),
        fetch(`${API_URL}?action=users`),
        fetch(`${API_URL}?action=pending`),
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      const pendingData = await pendingRes.json();

      setStats(statsData);
      setUsers(usersData);
      setPendingRequests(pendingData);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить данные',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: PendingRequest) => {
    try {
      const response = await fetch(`${API_URL}?action=activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: request.id, adminId: 0 }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Успешно!',
          description: `Карта активирована для ${request.user}`,
        });
        loadData();
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось активировать',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка сети',
        variant: 'destructive',
      });
    }
  };

  const handleReject = (id: number) => {
    toast({
      title: 'Отклонено',
      description: 'Заявка отклонена',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-red-700 mb-4">
          <Icon name="Settings" size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
        <p className="text-muted-foreground">Управление ботом и пользователями</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="Users" className="mx-auto mb-2 text-primary" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.totalUsers}</p>
            <p className="text-sm text-muted-foreground">Всего пользователей</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="UserCheck" className="mx-auto mb-2 text-green-500" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.activeUsers}</p>
            <p className="text-sm text-muted-foreground">Активных</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="TrendingUp" className="mx-auto mb-2 text-secondary" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.totalEarnings} ₽</p>
            <p className="text-sm text-muted-foreground">Выплачено</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Icon name="Clock" className="mx-auto mb-2 text-yellow-500" size={28} />
            <p className="text-3xl font-bold mb-1">{stats.pendingWithdrawals} ₽</p>
            <p className="text-sm text-muted-foreground">В ожидании</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Заявки</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertCircle" size={20} />
                Ожидают рассмотрения
                <Badge className="ml-2 bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                  {pendingRequests.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        request.type === 'withdrawal'
                          ? 'bg-secondary/20'
                          : 'bg-green-500/20'
                      }`}
                    >
                      <Icon
                        name={request.type === 'withdrawal' ? 'ArrowUpRight' : 'CreditCard'}
                        className={request.type === 'withdrawal' ? 'text-secondary' : 'text-green-500'}
                        size={20}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{request.user}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.amount} ₽ · {request.details}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request)}
                      className="bg-green-500 hover:bg-green-600"
                      disabled={loading}
                    >
                      <Icon name="Check" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      disabled={loading}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Список пользователей
                </CardTitle>
                <Input placeholder="Поиск..." className="max-w-xs" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50 hover:bg-background/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.telegramId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary">{user.balance} ₽</p>
                      <p className="text-sm text-muted-foreground">
                        {user.referrals} рефералов
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}