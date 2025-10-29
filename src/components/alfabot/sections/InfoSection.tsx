import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function InfoSection() {
  const faqItems = [
    {
      question: 'Как получить 1000 рублей?',
      answer:
        'Оформите Альфа-Карту по реферальной ссылке, активируйте её в приложении и совершите покупку от 200 ₽. Отправьте чек в @Alfa_Bank778 для получения 500 ₽ от нас. Ещё 500 ₽ вы получите от Альфа-Банка.',
    },
    {
      question: 'Сколько можно заработать на рефералах?',
      answer:
        'Вы получаете 500 ₽ за каждого приглашённого друга, который оформит карту и выполнит условия. Количество рефералов не ограничено.',
    },
    {
      question: 'Как быстро приходят выплаты?',
      answer:
        'Заявки на вывод обрабатываются в течение 1-3 рабочих дней. После подтверждения средства поступают на указанные реквизиты в течение нескольких часов.',
    },
    {
      question: 'Какая минимальная сумма вывода?',
      answer: 'Минимальная сумма для вывода составляет 500 рублей. Максимальная сумма не ограничена.',
    },
    {
      question: 'Какие способы вывода доступны?',
      answer:
        'Доступны следующие способы: банковская карта, СБП (Система быстрых платежей), ЮMoney, QIWI кошелек.',
    },
    {
      question: 'Можно ли участвовать несколько раз?',
      answer:
        'Вы можете оформить карту один раз для получения 1000 ₽, но можете приглашать неограниченное количество друзей и получать по 500 ₽ за каждого.',
    },
  ];

  const features = [
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Все данные защищены и не передаются третьим лицам',
    },
    {
      icon: 'Zap',
      title: 'Быстрые выплаты',
      description: 'Обработка заявок в течение 1-3 рабочих дней',
    },
    {
      icon: 'Users',
      title: 'Реферальная программа',
      description: 'Зарабатывайте, приглашая друзей',
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Всегда готовы помочь и ответить на вопросы',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-red-700 mb-4">
          <Icon name="Info" size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Информация о боте</h1>
        <p className="text-muted-foreground">Всё, что нужно знать о программе</p>
      </div>

      <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sparkles" size={20} />
            О программе
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Наш бот помогает вам получить выгодное предложение от Альфа-Банка и заработать на
            реферальной программе. Оформляйте карту, выполняйте простые условия и получайте 1000 ₽.
            Приглашайте друзей и зарабатывайте ещё больше!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="HelpCircle" size={20} />
            Часто задаваемые вопросы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircle" size={20} />
            Контакты
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/40">
            <Icon name="Send" className="text-primary" size={24} />
            <div>
              <p className="font-semibold">Telegram поддержка</p>
              <a
                href="https://t.me/Alfa_Bank778"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                @Alfa_Bank778
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/40">
            <Icon name="Clock" className="text-secondary" size={24} />
            <div>
              <p className="font-semibold">Время работы</p>
              <p className="text-sm text-muted-foreground">Ежедневно, 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
