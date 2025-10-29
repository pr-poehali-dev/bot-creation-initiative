import { useState } from 'react';
import Sidebar from '@/components/alfabot/Sidebar';
import HomeSection from '@/components/alfabot/sections/HomeSection';
import ReferralSection from '@/components/alfabot/sections/ReferralSection';
import WithdrawalSection from '@/components/alfabot/sections/WithdrawalSection';
import InfoSection from '@/components/alfabot/sections/InfoSection';
import AdminSection from '@/components/alfabot/sections/AdminSection';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'referral':
        return <ReferralSection />;
      case 'withdrawal':
        return <WithdrawalSection />;
      case 'info':
        return <InfoSection />;
      case 'admin':
        return <AdminSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}