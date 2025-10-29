import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HomeSection() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-red-700 mb-4">
          <Icon name="Gift" size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Привет, друзья! 🌟</h1>
        <p className="text-xl text-muted-foreground">Получите 1000 ₽ прямо сейчас!</p>
      </div>

      <Card className="border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-primary">500 ₽</span> от нас +{' '}
              <span className="text-primary">500 ₽</span> от Альфа-Банка
            </h2>
            <div className="text-5xl font-bold text-primary mb-2">= 1000 ₽</div>
            <p className="text-muted-foreground">Ваша итоговая сумма</p>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="text-xl font-semibold text-center">Что нужно сделать?</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 rounded-lg bg-background/50 border border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Оформить Альфа-Карту</h4>
                  <p className="text-sm text-muted-foreground">
                    Перейдите по реферальной ссылке и оформите карту
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-lg bg-background/50 border border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Активировать карту</h4>
                  <p className="text-sm text-muted-foreground">
                    Активируйте карту в мобильном приложении Альфа-Банка
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-lg bg-background/50 border border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Сделать покупку от 200 ₽</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Совершите любую покупку на сумму от 200 рублей
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Отправить чек: @Alfa_Bank778
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-red-700 hover:from-primary/90 hover:to-red-700/90"
              onClick={() => window.open('https://alfa.me/ASQWHN', '_blank')}
            >
              <Icon name="CreditCard" size={24} className="mr-2" />
              Оформить Альфа-Карту
            </Button>

            <a
              href="https://t.me/Alfa_Bank778"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full h-12 border-primary/30 hover:bg-primary/10">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить чек для выплаты 500 ₽
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Icon name="Users" className="text-secondary" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Приглашайте друзей</h3>
              <p className="text-sm text-muted-foreground">
                Получайте бонусы за каждого приглашенного друга
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
