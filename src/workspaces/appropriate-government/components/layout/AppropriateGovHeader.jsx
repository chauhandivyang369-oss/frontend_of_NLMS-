import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  HelpCircle, 
  UserCheck, 
  ChevronDown, 
  Layers, 
  Globe2, 
  ShieldCheck, 
  Check, 
  Landmark, 
  LogOut,
  Sparkles,
  Scale,
  Menu
} from 'lucide-react';
import { useAppropriateGovernment } from '../../context/AppropriateGovernmentContext.jsx';

export default function AppropriateGovHeader() {
  const {
    jurisdiction,
    setJurisdiction,
    activeRole,
    setActiveRole,
    availableRoles,
    setIsSearchOpen,
    setIsNotificationCenterOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    openProjectDrawer,
    onSwitchWorkspace
  } = useAppropriateGovernment();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const isCentral = jurisdiction === 'CENTRAL';

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] shadow-md sticky top-0 z-40 shrink-0">
      {/* Top Banner Ribbon */}
      <div className="bg-[#142642] px-4 py-1 text-[11px] text-slate-300 flex items-center justify-between border-b border-slate-700/60 font-sans">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wider text-slate-200 uppercase">
            {isCentral ? 'GOVERNMENT OF INDIA' : 'STATE GOVERNMENT • REVENUE & FOREST DEPARTMENT'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">
            Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Statutory Orchestration Gateway • Active
          </span>
          <span className="text-amber-300/80">API Ready • PostGIS &amp; DILRMP Sync</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Left: Branding & National Seal */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#0F1E33] text-[#E6CA85] hover:text-white border border-slate-600/80 cursor-pointer shrink-0"
            title="Toggle 8 Menus Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-white/10 border border-[#C5A059]/60 flex items-center justify-center text-[#E6CA85] font-serif font-black text-xl shadow-xs shrink-0">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                NLAMS
              </span>
              <span className="text-[10px] sm:text-xs bg-[#C5A059] text-slate-950 font-bold px-1.5 py-0.5 rounded font-mono">
                PILLAR 6 &amp; 7
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium tracking-tight truncate max-w-[170px] sm:max-w-none">
              National Land Acquisition &amp; Management System
            </div>
          </div>

          {/* Current Workspace Identifier */}
          <div className="hidden md:flex ml-4 pl-4 border-l border-slate-700 items-center gap-2">
            <div className="space-y-0.5">
              <div className="text-[9px] uppercase tracking-widest text-[#E6CA85] font-bold">
                CURRENT WORKSPACE
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                {isCentral ? 'Central Appropriate Government' : 'State Appropriate Government'}
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-blue-900/80 text-blue-200 border border-blue-400/40">
                  {isCentral ? 'National Apex' : 'State Revenue Head'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Quick Jurisdiction Switcher */}
        <div className="hidden lg:flex items-center bg-[#142642] p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => {
              setJurisdiction('CENTRAL');
              if (onSwitchWorkspace) onSwitchWorkspace('central-appropriate-gov');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isCentral
                ? 'bg-[#C5A059] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Central Jurisdiction</span>
          </button>
          <button
            onClick={() => {
              setJurisdiction('STATE');
              if (onSwitchWorkspace) onSwitchWorkspace('state-appropriate-gov');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              !isCentral
                ? 'bg-[#C5A059] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>State Jurisdiction</span>
          </button>
        </div>

        {/* Right: Actions, Global Search, Notifications, Switcher & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Action Drawer Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`p-1.5 px-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
              isDrawerOpen
                ? 'bg-[#C5A059] border-[#C5A059] text-slate-950 font-bold shadow-md'
                : 'bg-[#142642] border-slate-700 text-[#E6CA85] hover:text-white hover:border-[#C5A059]'
            }`}
            title={isDrawerOpen ? 'Close Action Drawer' : 'Open Contextual Action Drawer'}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-bold font-mono">Dossier</span>
          </button>

          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-[#142642] hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded border border-slate-700 text-xs cursor-pointer transition-colors"
            title="Search Project ID, Proposal ID, ULPIN, Notification"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] bg-slate-700 text-slate-300 px-1 rounded font-mono">⌘K</kbd>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative p-1.5 bg-[#142642] hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 cursor-pointer transition-colors"
            title="Statutory Alerts &amp; Timers"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          {/* Master 7-Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="bg-[#142642] hover:bg-slate-800 border border-[#C5A059]/60 text-[#E6CA85] hover:text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>Switch Workspace</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isWorkspaceMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-slate-900 border border-[#C5A059]/60 rounded-lg shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  NLAMS Master Workspace Switcher (7 Pillars)
                </div>

                <div className="p-1 space-y-1">
                  {/* Workspace 0: National Landing Page */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('landing');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-amber-300 hover:text-amber-200 flex items-center justify-between group cursor-pointer border-b border-slate-800"
                  >
                    <div>
                      <div className="font-bold text-amber-300">
                        0. National Landing Page &amp; Public Portal
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Citizen Services, ULPIN Search, 7 Role Groups
                      </div>
                    </div>
                  </button>

                  {/* Workspace 1: Requiring Body */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('requiring-body');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        1. Requiring Body Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Form-I Wizard, Escrow Ledger, 10 Menus
                      </div>
                    </div>
                  </button>

                  {/* Workspace 2: Policy Maker */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('policy-maker');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        2. Policy Maker &amp; Executive Oversight
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Apex Committee, NMC/SMC, Lapsing Radar
                      </div>
                    </div>
                  </button>

                  {/* Workspace 3: SIA & IEG */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('sia-ieg');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        3. SIA &amp; IEG Combined Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Baseline Census, SIMP, Sec 7 Appraisal
                      </div>
                    </div>
                  </button>

                  {/* Workspace 4: R&R Authority */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('rr-authority');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        4. R&amp;R Authority Master Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Administrator (Sec 43) &amp; Commissioner (Sec 44)
                      </div>
                    </div>
                  </button>

                  {/* Workspace 5: LARR Authority */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('larr-authority');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        5. LARR Authority — Judicial Tribunal
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sections 51–74 Reference, Cause List, Awards
                      </div>
                    </div>
                  </button>

                  {/* Workspace 6: Central Appropriate Government */}
                  <button
                    onClick={() => {
                      setJurisdiction('CENTRAL');
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('central-appropriate-gov');
                    }}
                    className={`w-full text-left p-2 rounded flex items-center justify-between group cursor-pointer ${
                      isCentral ? 'bg-[#1B365D] border border-[#C5A059] text-white' : 'hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div>
                      <div className={`font-bold ${isCentral ? 'text-[#E6CA85]' : 'group-hover:text-amber-300'}`}>
                        6. Central Appropriate Government
                      </div>
                      <div className="text-[10px] text-slate-400">
                        National Ministries, Multi-State Corridors, Gazette
                      </div>
                    </div>
                    {isCentral && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>

                  {/* Workspace 7: State Appropriate Government */}
                  <button
                    onClick={() => {
                      setJurisdiction('STATE');
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('state-appropriate-gov');
                    }}
                    className={`w-full text-left p-2 rounded flex items-center justify-between group cursor-pointer ${
                      !isCentral ? 'bg-[#1B365D] border border-[#C5A059] text-white' : 'hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div>
                      <div className={`font-bold ${!isCentral ? 'text-[#E6CA85]' : 'group-hover:text-amber-300'}`}>
                        7. State Appropriate Government
                      </div>
                      <div className="text-[10px] text-slate-400">
                        State Revenue Dept, Bhu-Naksha, Land Bank
                      </div>
                    </div>
                    {!isCentral && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>

                  {/* Workspace 8: District Collector */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('district-collector');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold group-hover:text-amber-300">
                        8. Master District Collector Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Collector, CALA, Form-I, Sec 15, Award Sec 23 &amp; Sec 38
                      </div>
                    </div>
                  </button>

                  {/* Workspace 9: Citizen Portal */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('citizen');
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-amber-300">
                        9. Citizen &amp; Affected Person Portal
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ULPIN Bhu-Aadhaar, Sec 15 Objections &amp; PFMS DBT
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-2 bg-[#142642] hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded cursor-pointer transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059] text-slate-950 font-bold flex items-center justify-center text-xs">
                {activeRole.title.charAt(0)}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-white line-clamp-1 max-w-[130px]">
                  {activeRole.title}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 max-w-[130px]">
                  {activeRole.department}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-slate-900 border border-slate-700 rounded shadow-xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Statutory Persona ({jurisdiction})
                </div>
                {availableRoles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setActiveRole(role);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      activeRole.id === role.id ? 'bg-[#1B365D] text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{role.title}</div>
                      <div className="text-[10px] text-slate-400">{role.department}</div>
                    </div>
                    {activeRole.id === role.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button -> Landing Page */}
          <button
            onClick={() => {
              if (onSwitchWorkspace) onSwitchWorkspace('landing');
            }}
            title="Logout & Return to NLAMS Public Portal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
