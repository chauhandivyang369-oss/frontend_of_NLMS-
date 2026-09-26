import React, { useState } from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Menu, 
  User, 
  ArrowRightLeft, 
  FileCheck2, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Sparkles,
  Award,
  LogOut
} from 'lucide-react';

export default function RRTopbar({ onSwitchWorkspace }) {
  const {
    currentRole,
    setCurrentRole,
    selectedProjectId,
    setSelectedProjectId,
    projects,
    selectedProject,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    executeUlpinSearch,
    isRightPanelOpen,
    setIsRightPanelOpen
  } = useRRAuthority();

  const [topSearchText, setTopSearchText] = useState('');
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (topSearchText.trim()) {
      executeUlpinSearch(topSearchText);
    }
  };

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] sticky top-0 z-40 select-none shadow-md">
      <div className="min-h-[64px] px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4 md:gap-5">
        
        {/* LEFT: Universal 3-lines Toggle + Emblem + Title + Workspace Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileSidebarOpen(!isMobileSidebarOpen);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            className="p-2 rounded-lg bg-[#142947] text-white hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer shadow-xs"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#C5A059]" />
          </button>

          {/* National Emblem / Government Seal */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-[#C5A059]/60 flex items-center justify-center text-[#E6CA85] shadow-xs">
            🏛️
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-sans">
                NLAMS
              </span>
              <span className="hidden sm:inline text-[11px] text-blue-100 font-medium">
                National Land Acquisition &amp; Management System
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold font-mono px-2 py-0.2 rounded bg-[#C5A059]/25 text-[#E6CA85] border border-[#C5A059]/60">
                R&amp;R AUTHORITY
              </span>
              <span className="hidden lg:inline text-[10px] text-blue-100 font-mono">
                RFCTLARR Act 2013 • Sec 43 (Admin) &amp; Sec 44 (Comm)
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: Project Selector + Global ULPIN Search */}
        <div className="flex-1 max-w-2xl mx-1 sm:mx-3 flex items-center gap-2">
          
          {/* Project Quick Switcher */}
          <div className="relative hidden lg:block shrink-0">
            <button
              onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
              className="flex items-center gap-1.5 bg-[#142947] hover:bg-[#203D66] text-slate-100 border border-blue-900/60 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors max-w-xs truncate shadow-xs"
              title="Change active R&R project"
            >
              <span className="text-[10px] font-mono text-[#C5A059] font-bold">PROJECT:</span>
              <span className="truncate max-w-[140px] text-white font-mono text-[11px]">
                {selectedProject.code}
              </span>
              <ChevronDown className="w-3 h-3 text-blue-200 shrink-0" />
            </button>

            {isProjectMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-1.5 text-xs">
                <div className="p-2 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Assigned R&R Projects
                </div>
                <div className="space-y-1 py-1 max-h-60 overflow-y-auto">
                  {(projects || []).map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedProjectId(proj.id);
                        setIsProjectMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col gap-0.5 cursor-pointer ${
                        selectedProjectId === proj.id 
                          ? 'bg-[#183A62] border border-[#C5A059]/50 text-white font-bold' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#E6CA85] text-[11px]">{proj.code}</span>
                        <span className="text-[10px] font-mono text-slate-400">{proj.state}</span>
                      </div>
                      <div className="text-[11px] line-clamp-1">{proj.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{proj.totalAffectedFamilies} Families</span>
                        <span className="text-emerald-400">{proj.rrStatus}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Global ULPIN Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-200">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={topSearchText}
              onChange={(e) => setTopSearchText(e.target.value)}
              placeholder="Global Search: 14-Digit ULPIN / Survey No / Family ID..."
              className="w-full bg-[#1C4472] text-xs text-white placeholder-blue-200/70 pl-9 pr-16 py-2 rounded-lg border border-blue-300/30 focus:outline-hidden focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all font-mono shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#C5A059] hover:bg-[#b08b43] text-slate-950 font-bold text-[10px] rounded-md flex items-center cursor-pointer transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* RIGHT: Role Badge + Dual-Charge Toggle + SLA + DSC + Workspace Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Statutory SLA Countdown Ticker */}
          <div className="hidden xl:flex items-center gap-1.5 bg-[#1C4472] px-2.5 py-1.5 rounded-lg border border-blue-300/30 text-[11px] font-mono shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-blue-200">SLA:</span>
            <span className="text-emerald-300 font-bold">Sec 16-18 • {selectedProject.daysRemaining}d Left</span>
          </div>

          {/* e-Sign / DSC Token Badge */}
          <div className="hidden 2xl:flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-2.5 py-1.5 rounded-lg text-[10px] font-mono shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DSC Token: Active</span>
          </div>

          {/* Dynamic RBAC Role Badge & Switcher */}
          <div className="flex items-center bg-[#1C4472] border border-blue-300/30 rounded-lg p-0.5 text-[11px] shadow-xs">
            <button
              onClick={() => setCurrentRole('ADMINISTRATOR')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                currentRole === 'ADMINISTRATOR' 
                  ? 'bg-[#C5A059] text-slate-950 shadow-xs' 
                  : 'text-blue-100 hover:text-white'
              }`}
              title="RFCTLARR Section 43 Administrator (Menus 1-7)"
            >
              Administrator
            </button>

            <button
              onClick={() => setCurrentRole('COMMISSIONER')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                currentRole === 'COMMISSIONER' 
                  ? 'bg-[#C5A059] text-slate-950 shadow-xs' 
                  : 'text-blue-100 hover:text-white'
              }`}
              title="RFCTLARR Section 44 Commissioner (Menus 8-10)"
            >
              Commissioner
            </button>

            <button
              onClick={() => setCurrentRole('DUAL_CHARGE')}
              className={`hidden sm:inline-block px-2 py-1 rounded-md font-mono text-[10px] transition-all cursor-pointer ${
                currentRole === 'DUAL_CHARGE' 
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' 
                  : 'text-blue-200 hover:text-white'
              }`}
              title="Senior Officer Holding Dual Charge (Menus 1-10)"
            >
              Dual
            </button>
          </div>

          {/* Right Action Drawer Toggle */}
          <button
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className={`p-2 px-3 rounded-lg border transition-colors cursor-pointer ${
              isRightPanelOpen 
                ? 'bg-[#C5A059]/20 border-[#C5A059]/60 text-[#E6CA85]' 
                : 'bg-[#1C4472] border-blue-300/30 text-blue-100 hover:text-white'
            }`}
            title="Toggle Right Context Action Panel"
          >
            <Bell className="w-3.5 h-3.5" />
          </button>

          {/* Master Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="flex items-center gap-1.5 bg-[#1C4472] hover:bg-[#285A94] border border-[#C5A059]/50 text-[#E6CA85] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Switch NLAMS Master Workspace"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Workspace</span>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {isWorkspaceMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#183A62] border border-blue-400/40 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-2 border-b border-blue-400/25 text-[10px] font-mono uppercase text-blue-200 font-bold">
                  NLAMS Master Workspaces
                </div>
                <div className="space-y-1 py-1">
                  
                  {/* Workspace 1: Requiring Body */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('requiring-body');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#1C4472] text-slate-100 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-100 group-hover:text-amber-300">
                        1. Requiring Body Workspace
                      </div>
                      <div className="text-[10px] text-blue-200">
                        Form-I Wizard, GIS, Escrow, Timeline
                      </div>
                    </div>
                  </button>

                  {/* Workspace 2: SIA & IEG */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('sia-ieg');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#1C4472] text-slate-100 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-100 group-hover:text-amber-300">
                        2. SIA &amp; IEG Combined Workspace
                      </div>
                      <div className="text-[10px] text-blue-200">
                        Baseline Census, SIMP, IEG Appraisal Sec 7
                      </div>
                    </div>
                  </button>

                  {/* Workspace 3: Policy Maker */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('policy-maker');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#1C4472] text-slate-100 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-100 group-hover:text-amber-300">
                        3. Policy Maker &amp; Executive Oversight
                      </div>
                      <div className="text-[10px] text-blue-200">
                        Apex Committee, NMC/SMC, Lapsing Radar
                      </div>
                    </div>
                  </button>

                  {/* Workspace 4: R&R Authority */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('rr-authority');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#1C4472] text-slate-100 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-100 group-hover:text-amber-300">
                        4. R&amp;R Authority Master Workspace
                      </div>
                      <div className="text-[10px] text-blue-200">
                        Administrator (Sec 43) &amp; Commissioner (Sec 44)
                      </div>
                    </div>
                  </button>

                  {/* Workspace 5: LARR Authority Tribunal */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('larr-authority');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        5. LARR Authority Judicial Tribunal
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sections 51-74 Adjudication, Cause List, Awards
                      </div>
                    </div>
                  </button>

                  {/* Workspace 6: Central Appropriate Government */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('central-appropriate-gov');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        6. Central Appropriate Government
                      </div>
                      <div className="text-[10px] text-slate-400">
                        National Ministries, Multi-State Corridors, Gazette
                      </div>
                    </div>
                  </button>

                  {/* Workspace 7: State Appropriate Government */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('state-appropriate-gov');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        7. State Appropriate Government
                      </div>
                      <div className="text-[10px] text-slate-400">
                        State Revenue Dept, Bhu-Naksha, Land Bank
                      </div>
                    </div>
                  </button>

                  {/* Workspace 8: District Collector */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('district-collector');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-amber-300">
                        8. Master District Collector Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        CALA / LAO Statutory Inquiry &amp; Awards
                      </div>
                    </div>
                  </button>

                  {/* Workspace 9: Citizen Portal */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('citizen');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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

          {/* Logout Button -> Landing Page */}
          <button
            onClick={() => {
              if (onSwitchWorkspace) onSwitchWorkspace('landing');
            }}
            title="Logout & Return to NLAMS Public Portal"
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>
    </header>
  );
}
