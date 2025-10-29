import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function HelpSection() {
  const faqItems = [
    {
      question: 'Как начать торговлю?',
      answer: 'Пополните счет, настройте торговые параметры в разделе "Настройки" и включите автоматическую торговлю. Бот начнет анализировать рынок и совершать сделки по вашим правилам.',
    },
    {
      question: 'Как работают торговые сигналы?',
      answer: 'Наш алгоритм анализирует рыночные данные в режиме реального времени и генерирует сигналы на покупку или продажу. Вы получите уведомление о каждом новом сигнале.',
    },
    {
      question: 'Безопасны ли мои средства?',
      answer: 'Мы используем двухфакторную аутентификацию, шифрование данных и работаем только с проверенными биржами. Ваши API ключи хранятся в зашифрованном виде.',
    },
    {
      question: 'Какая минимальная сумма для начала?',
      answer: 'Рекомендуемая минимальная сумма составляет $500 для эффективной диверсификации портфеля и управления рисками.',
    },
    {
      question: 'Как настроить Stop-Loss и Take-Profit?',
      answer: 'Перейдите в раздел "Настройки" → "Торговые настройки" и включите автоматическое создание Stop-Loss и Take-Profit ордеров. Можно задать процентные значения.',
    },
  ];

  const quickLinks = [
    { icon: 'BookOpen', title: 'Документация', desc: 'Полное руководство пользователя' },
    { icon: 'Video', title: 'Видео-уроки', desc: 'Обучающие материалы' },
    { icon: 'MessageCircle', title: 'Чат поддержки', desc: 'Онлайн консультант' },
    { icon: 'Mail', title: 'Email поддержка', desc: 'support@tradebot.com' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Card
            key={index}
            className="border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={link.icon} className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-1">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.desc}</p>
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
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Send" size={20} />
            Связаться с поддержкой
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Тема обращения</label>
            <Input placeholder="Опишите проблему кратко" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Подробное описание</label>
            <Textarea placeholder="Расскажите подробнее о вашем вопросе..." rows={5} />
          </div>
          <Button className="w-full">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить сообщение
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
