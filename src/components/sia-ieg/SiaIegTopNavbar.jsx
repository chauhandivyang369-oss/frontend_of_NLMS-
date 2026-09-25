import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Menu, 
  X,
  User,
  ArrowRightLeft,
  FileCheck2,
  FileText
} from 'lucide-react';

export default function SiaIegTopNavbar({ onSwitchWorkspace }) {
  const { 
    currentRole, 
    setCurrentRole,
    searchQuery,
    setSearchQuery,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    isHelpOpen,
    setIsHelpOpen,
    isProfileOpen,
    setIsProfileOpen
  } = useSiaIeg();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  return (
    <header className="bg-[#1B365D] text-white border-b border-slate-700/80 sticky top-0 z-40 select-none shadow-sm">
      
      {/* Top Navbar Row */}
      <div className="h-14 px-3 sm:px-5 flex items-center justify-between gap-3">
        
        {/* LEFT: Mobile Toggle + Emblem + Title + Workspace Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Menu Toggle Button */}
          <button
            id="sia-ieg-mobile-menu-toggle"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* National Emblem / Government Seal */}
          <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] shadow-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-sans">
                NLAMS
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-300 font-medium">
                National Land Acquisition & Management System
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold font-mono px-2 py-0.2 rounded bg-[#C5A059]/25 text-[#E6CA85] border border-[#C5A059]/60">
                SIA & IEG EVALUATION
              </span>
              <span className="hidden lg:inline text-[10px] text-slate-300 font-mono">
                RFCTLARR Act 2013 • Sec 4 to 9
              </span>
            </div>
          </div>

        </div>

        {/* CENTER / SEARCH AREA: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2 lg:mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="sia-ieg-global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Project / ULPIN / Survey No. / Family ID"
              className="w-full bg-[#0F2342] text-xs text-white placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg border border-slate-600/70 focus:outline-hidden focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
            />
          </div>
        </div>

        {/* RIGHT: SLA Area + Notifications + Help + Profile/Role */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Statutory SLA indicator area */}
          <div className="hidden xl:flex items-center gap-2 bg-[#0F2342] px-2.5 py-1 rounded-md border border-slate-600/60 text-[11px] font-mono">
            <div className="flex items-center gap-1 text-[#E6CA85]">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-bold">SLA:</span>
            </div>
            <span className="text-slate-300">Sec 4(2) 6-Mo</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-300 font-semibold">Sec 7(2) 60-Day Active</span>
          </div>

          {/* Master Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              id="sia-ieg-workspace-switcher-button"
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="flex items-center gap-1.5 bg-[#0F2342] hover:bg-slate-800 border border-[#C5A059]/50 text-[#E6CA85] px-2 sm:px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer"
              title="Switch NLAMS Master Workspace"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Workspace</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isWorkspaceMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0F2342] border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-2 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  NLAMS Master Workspaces
                </div>
                <div className="space-y-1 py-1">
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('requiring-body');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        1. Requiring Body Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Form-I Wizard, GIS, Escrow, Timeline
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('policy-maker');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        2. Policy Makers & Oversight
                      </div>
                      <div className="text-[10px] text-slate-400">
                        NMC, SMC, Lapsing Risk, Video Meetings
                      </div>
                    </div>
                  </button>

                  <div className="p-2 rounded-lg bg-[#1B365D] border border-[#C5A059]/60 text-white flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#E6CA85]">
                        3. SIA &amp; IEG Evaluation
                      </div>
                      <div className="text-[10px] text-slate-300">
                        Sec 4-6 Operations &amp; Sec 7-9 Appraisal
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  </div>

                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('rr-authority');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        4. R&amp;R Authority Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sec 43 (Admin) &amp; Sec 44 (Commissioner)
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              id="sia-ieg-notifications-button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Notifications & Statutory Reminders"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute 0 top-1 right-1 w-2 h-2 bg-[#C5A059] rounded-full"></span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0F2342] border border-slate-700 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Statutory SIA/IEG Reminders</span>
                  </div>
                  <button 
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 py-1">
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                    <div className="text-[10px] font-mono text-[#E6CA85] font-bold">SECTION 5 STATUTORY HEARING</div>
                    <div className="text-[11px] font-semibold text-white mt-0.5">Sanand Industrial Corridor (Sec 5)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Mandatory Gram Sabha hearing scheduled in 7 days</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">SECTION 7 APPRAISAL DUE</div>
                    <div className="text-[11px] font-semibold text-white mt-0.5">NHAI Western Ring Road Corridors</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">IEG appraisal timeline active (38 days remaining)</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            id="sia-ieg-help-button"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
            title="Help & Statutory Guidelines"
            aria-label="Help & Guidelines"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Profile / Role Badge */}
          <div className="relative">
            <button
              id="sia-ieg-user-profile-button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 bg-[#0F2342] hover:bg-slate-800 border border-slate-600/70 px-2 sm:px-2.5 py-1 rounded-md text-left transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059]/25 border border-[#C5A059]/50 flex items-center justify-center text-[#E6CA85] text-[10px] font-bold">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span>{currentRole === 'SIA_AGENCY' ? 'SIA Agency' : 'IEG Expert'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[9px] text-[#E6CA85] font-mono">
                  {currentRole === 'SIA_AGENCY' ? 'Sec 4 Unit Lead' : 'Sec 7 Chairperson'}
                </div>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0F2342] border border-slate-700 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="border-b border-slate-800 pb-2 mb-2">
                  <div className="font-bold text-white">Dr. K. Swaminathan, IAS (Retd.)</div>
                  <div className="text-[10px] text-[#E6CA85] font-mono">Empanelled Social Scientist / IEG Member</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">DSC Certificate: VERIFIED (Class III)</div>
                </div>

                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                  RBAC View Persona Switch:
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setCurrentRole('SIA_AGENCY');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                      currentRole === 'SIA_AGENCY'
                        ? 'bg-[#1B365D] border-[#C5A059] text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>SIA Agency View</span>
                      {currentRole === 'SIA_AGENCY' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Operations, Survey, Hearing & SIMP
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRole('IEG_EXPERT');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                      currentRole === 'IEG_EXPERT'
                        ? 'bg-[#1B365D] border-[#C5A059] text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>IEG Expert View</span>
                      {currentRole === 'IEG_EXPERT' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Independent Appraisal & Sec 7 Audit
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </header>
  );
}
