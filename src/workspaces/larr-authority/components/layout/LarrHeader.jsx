import React, { useState } from 'react';
import { useLarrAuthority, LARR_ROLES } from '../../context/LarrAuthorityContext.jsx';
import { 
  Scale, 
  Search, 
  Bell, 
  ChevronDown, 
  ArrowRightLeft, 
  UserCheck, 
  ShieldAlert, 
  FileText,
  Clock,
  Landmark,
  Building2,
  ExternalLink,
  Layers,
  Menu,
  X
} from 'lucide-react';

export default function LarrHeader({ onSwitchWorkspace }) {
  const { 
    currentRole, 
    setCurrentRole, 
    selectedCase, 
    cases, 
    selectCaseById,
    setIsSearchOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    showToast
  } = useLarrAuthority();

  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  const roleMeta = LARR_ROLES[currentRole] || LARR_ROLES.PRESIDING_OFFICER;

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] shadow-md z-30 shrink-0">
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        
        {/* LEFT: Government Logo, NLAMS Title, Judicial Badge, Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#0F2342] text-[#E6CA85] hover:text-white border border-slate-600/80 cursor-pointer shrink-0"
            title="Toggle 10 Menus Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Emblem / Court Scales Icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#C5A059]/25 border border-[#C5A059] flex items-center justify-center text-[#E6CA85] shadow-xs shrink-0">
            <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-[#E6CA85]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase font-sans">
                NLAMS
              </span>
              <span className="hidden md:inline text-[11px] text-slate-300 font-medium">
                National Land Acquisition & Management System
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold">
                TRIBUNAL
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
              <span className="text-[10px] sm:text-[11px] font-bold font-mono text-[#E6CA85] uppercase tracking-wide truncate max-w-[150px] sm:max-w-none">
                LARR AUTHORITY (SEC 51–74)
              </span>
              <span className="hidden xl:inline text-[10px] text-slate-300 font-mono">
                • {selectedCase?.courtName?.split(',')[1] || 'Central Gujarat Bench'}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: Active Case Selector + Global Search */}
        <div className="flex-1 max-w-xl mx-2 flex items-center gap-2">
          
          {/* Quick Case Switcher */}
          <div className="relative hidden sm:block shrink-0">
            <button
              onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#0F2342] hover:bg-slate-800 text-slate-100 border border-slate-600/80 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors max-w-xs"
              title="Change active judicial case"
            >
              <span className="text-[10px] font-mono text-[#C5A059] font-bold">CASE:</span>
              <span className="truncate max-w-[130px] font-mono font-bold text-white">
                {selectedCase?.caseId || 'LARR/2026/GJ/001'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isCaseDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-84 bg-[#0F2342] border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-1.5 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold flex justify-between">
                  <span>Switch Judicial Case</span>
                  <span>{cases.length} Active Matters</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                  {cases.map((c) => (
                    <button
                      key={c.caseId}
                      onClick={() => {
                        selectCaseById(c.caseId);
                        setIsCaseDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                        c.caseId === selectedCase?.caseId
                          ? 'bg-[#1B365D] border border-[#C5A059]/60 text-white font-bold'
                          : 'hover:bg-slate-800/90 text-slate-200'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-mono text-[11px] text-[#E6CA85]">{c.caseId}</div>
                        <div className="text-[11px] truncate text-slate-200">{c.claimantName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ULPIN: {c.ulpin}</div>
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                        c.slaStatus === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                        c.slaStatus === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {c.slaDaysRemaining}d SLA
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Global Search Bar */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 flex items-center justify-between bg-[#0F2342]/90 hover:bg-slate-800 border border-slate-600/70 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="truncate">Search Case ID, ULPIN, Survey No, Claimant, Award...</span>
            </div>
            <kbd className="hidden md:inline font-mono text-[10px] bg-slate-800 border border-slate-600 px-1.5 py-0.5 rounded text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* RIGHT: Role Switcher, Context Drawer Toggle, Workspace Switcher */}
        <div className="flex items-center gap-2">
          
          {/* RBAC Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-1.5 bg-[#0F2342] hover:bg-slate-800 border border-slate-600 px-2 sm:px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer"
              title="Switch RBAC Persona"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-bold text-white text-[11px] truncate max-w-[120px]">
                {roleMeta.label}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0F2342] border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-2 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Select Judicial Role (RBAC)
                </div>
                <div className="space-y-1 py-1">
                  {Object.values(LARR_ROLES).map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setCurrentRole(role.id);
                        setIsRoleMenuOpen(false);
                        showToast(`Switched active role to ${role.label}`, 'info');
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-colors cursor-pointer ${
                        currentRole === role.id
                          ? 'bg-[#1B365D] border border-[#C5A059]/60 text-white font-bold'
                          : 'hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{role.label}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                          {role.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5 leading-tight">
                        {role.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Drawer Toggle */}
          <button
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className={`p-1.5 px-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
              isRightPanelOpen 
                ? 'bg-[#C5A059] border-[#C5A059] text-slate-950 font-bold shadow-md' 
                : 'bg-[#0F2342] border-slate-700 text-[#E6CA85] hover:text-white hover:border-[#C5A059]'
            }`}
            title={isRightPanelOpen ? "Close Judicial Action Panel" : "Open Judicial Action Panel"}
          >
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-bold font-mono">Actions</span>
          </button>

          {/* Master Workspace Switcher Dropdown (5 Workspaces) */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="flex items-center gap-1.5 bg-[#0F2342] hover:bg-slate-800 border border-[#C5A059]/60 text-[#E6CA85] px-2 sm:px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer"
              title="Switch NLAMS Master Workspace"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Workspace</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isWorkspaceMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0F2342] border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-2 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  NLAMS Master Workspaces (5 Major Pillars)
                </div>
                <div className="space-y-1.5 py-1">
                  
                  {/* Workspace 1: Requiring Body */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('requiring-body');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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

                  {/* Workspace 5: LARR Authority (Active) */}
                  <div className="p-2 rounded-lg bg-[#1B365D] border border-[#C5A059] text-white">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-[#E6CA85]">
                        5. LARR Authority — Judicial Tribunal
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                        ACTIVE PILLAR
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">
                      RFCTLARR Act 2013 • Sections 51–74 Tribunal Bench
                    </div>
                  </div>

                  {/* Workspace 6: Central Appropriate Government */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('central-appropriate-gov');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
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

        </div>

      </div>
    </header>
  );
}
