import React, { useState } from 'react';
import PublicTopUtilityBar from './PublicTopUtilityBar.jsx';
import PublicHeader from './PublicHeader.jsx';
import LandingHeroSection from './LandingHeroSection.jsx';
import NationalMetricsSection from './NationalMetricsSection.jsx';
import RbacRoleDirectorySection from './RbacRoleDirectorySection.jsx';
import TrackMyLandTab from './TrackMyLandTab.jsx';
import CompensationExplainerTab from './CompensationExplainerTab.jsx';
import RnrPassbookTab from './RnrPassbookTab.jsx';
import PublicGazetteVaultTab from './PublicGazetteVaultTab.jsx';
import PublicGisExplorerTab from './PublicGisExplorerTab.jsx';
import StatutoryActOverviewSection from './StatutoryActOverviewSection.jsx';
import OfficerLoginModal from './OfficerLoginModal.jsx';
import BhumiMitraPublicDrawer from './BhumiMitraPublicDrawer.jsx';
import PublicFooter from './PublicFooter.jsx';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function LandingPage({ 
  onLaunchWorkspace,
  onOpenLogin,
  onOpenSignUp
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'track-land' | 'compensation' | 'rnr-passbook' | 'gazette-vault' | 'gis-explorer' | 'rbac-directory'
  const [textSize, setTextSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [highContrast, setHighContrast] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOfficerLoginOpen, setIsOfficerLoginOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [isBhumiMitraOpen, setIsBhumiMitraOpen] = useState(false);

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setIsOfficerLoginOpen(true);
    }
  };

  const handleOpenSignUp = () => {
    if (onOpenSignUp) {
      onOpenSignUp();
    } else {
      onLaunchWorkspace('citizen');
    }
  };

  const textSizeClass = textSize === 'small' 
    ? 'text-[92%]' 
    : textSize === 'large' 
    ? 'text-[108%]' 
    : 'text-[100%]';

  const contrastClass = highContrast 
    ? 'contrast-125 saturate-150' 
    : '';

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans ${textSizeClass} ${contrastClass}`}>
      
      {/* 1. Public Top Utility Bar */}
      <PublicTopUtilityBar
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* 2. Public Government Header */}
      <PublicHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOfficerLogin={handleOpenLogin}
        onLaunchCitizenWorkspace={handleOpenSignUp}
      />

      {/* 3. Main Body Content Based on Active Tab */}
      <main id="main-content" className="flex-1">
        {activeTab === 'overview' && (
          <>
            <LandingHeroSection
              onSelectTab={(tabId) => setActiveTab(tabId)}
              onOpenOfficerLogin={handleOpenLogin}
            />
            <NationalMetricsSection />
            <RbacRoleDirectorySection
              onLaunchWorkspace={(wsKey) => onLaunchWorkspace(wsKey)}
            />
            <StatutoryActOverviewSection />
          </>
        )}

        {activeTab === 'track-land' && (
          <TrackMyLandTab 
            onSwitchToCalculator={() => setActiveTab('compensation')}
          />
        )}

        {activeTab === 'compensation' && (
          <CompensationExplainerTab />
        )}

        {activeTab === 'rnr-passbook' && (
          <RnrPassbookTab />
        )}

        {activeTab === 'gazette-vault' && (
          <PublicGazetteVaultTab />
        )}

        {activeTab === 'gis-explorer' && (
          <PublicGisExplorerTab />
        )}

        {activeTab === 'rbac-directory' && (
          <RbacRoleDirectorySection
            onLaunchWorkspace={(wsKey) => onLaunchWorkspace(wsKey)}
          />
        )}
      </main>

      {/* 4. Comprehensive Government Footer */}
      <PublicFooter
        onOpenOfficerLogin={() => setIsOfficerLoginOpen(true)}
      />

      {/* 5. Floating Bhumi Mitra AI Assistant Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsBhumiMitraOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#1B365D] hover:bg-[#142642] text-[#E6CA85] border-2 border-[#C5A059] rounded-full shadow-2xl cursor-pointer transition-all hover:scale-105 group"
          title="Open Bhumi Mitra AI Citizen Assistant"
        >
          <div className="w-7 h-7 rounded-full bg-[#C5A059] flex items-center justify-center text-slate-950 font-bold shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-white group-hover:text-amber-300">
              Bhumi Mitra AI
            </div>
            <div className="text-[10px] text-slate-300">
              भूमि मित्र सहायता
            </div>
          </div>
        </button>
      </div>

      {/* 6. Officer Login / RBAC Gateway Modal */}
      <OfficerLoginModal
        isOpen={isOfficerLoginOpen}
        initialMode={authInitialMode}
        onClose={() => setIsOfficerLoginOpen(false)}
        onLaunchWorkspace={(wsKey) => onLaunchWorkspace(wsKey)}
      />

      {/* 7. Bhumi Mitra AI Legal Assistant Drawer */}
      <BhumiMitraPublicDrawer
        isOpen={isBhumiMitraOpen}
        onClose={() => setIsBhumiMitraOpen(false)}
      />

    </div>
  );
}
