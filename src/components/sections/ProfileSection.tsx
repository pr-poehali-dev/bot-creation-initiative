import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function ProfileSection() {
  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            Информация профиля
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div>
              <Button className="mb-2">Изменить фото</Button>
              <p className="text-sm text-muted-foreground">JPG, PNG до 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" defaultValue="+7 (999) 123-45-67" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Страна</Label>
              <Input id="country" defaultValue="Россия" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button>Сохранить изменения</Button>
            <Button variant="outline">Отмена</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Trophy" size={20} />
            Статистика трейдера
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-green-500">156</p>
              <p className="text-sm text-muted-foreground">Успешных сделок</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-red-500">72</p>
              <p className="text-sm text-muted-foreground">Убыточных сделок</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-primary">68%</p>
              <p className="text-sm text-muted-foreground">Win Rate</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-green-500">+$8,450</p>
              <p className="text-sm text-muted-foreground">Общая прибыль</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
