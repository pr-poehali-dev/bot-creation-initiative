import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TradingDashboard from '@/components/TradingDashboard';
import ProfileSection from '@/components/sections/ProfileSection';
import SettingsSection from '@/components/sections/SettingsSection';
import NotificationsSection from '@/components/sections/NotificationsSection';
import HistorySection from '@/components/sections/HistorySection';
import HelpSection from '@/components/sections/HelpSection';

export default function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <TradingDashboard />;
      case 'profile':
        return <ProfileSection />;
      case 'settings':
        return <SettingsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'history':
        return <HistorySection />;
      case 'help':
        return <HelpSection />;
      default:
        return <TradingDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {activeSection === 'dashboard' && 'Торговая Панель'}
              {activeSection === 'profile' && 'Профиль'}
              {activeSection === 'settings' && 'Настройки'}
              {activeSection === 'notifications' && 'Уведомления'}
              {activeSection === 'history' && 'История'}
              {activeSection === 'help' && 'Помощь'}
            </h1>
            <p className="text-muted-foreground">
              {activeSection === 'dashboard' && 'Отслеживайте рынок и управляйте сделками'}
              {activeSection === 'profile' && 'Управление профилем и статистикой'}
              {activeSection === 'settings' && 'Настройте параметры бота и безопасность'}
              {activeSection === 'notifications' && 'Все уведомления в одном месте'}
              {activeSection === 'history' && 'Полная история ваших сделок'}
              {activeSection === 'help' && 'Получите помощь и ответы на вопросы'}
            </p>
          </header>
          {renderSection()}
        </div>
      </main>
    </div>
  );
}