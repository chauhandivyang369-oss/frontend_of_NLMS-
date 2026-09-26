import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  MapPin, 
  UserCheck, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Check, 
  FileText,
  Clock,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function CollectorHeader() {
  const {
    districts,
    selectedDistrictId,
    setSelectedDistrictId,
    activeDistrict,
    roles,
    selectedRoleId,
    setSelectedRoleId,
    activeRole,
    setIsSearchOpen,
    openAuditDrawer,
    onSwitchWorkspace
  } = useDistrictCollector();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isDistrictMenuOpen, setIsDistrictMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  return (
    <header className="bg-[#142642] text-white border-b-2 border-[#C5A059] shadow-md sticky top-0 z-40 select-none">
      {/* Top Banner Ribbon */}
      <div className="bg-[#0D1829] px-4 py-1 text-[11px] text-slate-300 flex items-center justify-between border-b border-slate-800 font-sans">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wider text-[#C5A059] uppercase">
            GOVERNMENT OF INDIA • DISTRICT REVENUE ADMINISTRATION
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">
            Office of the District Magistrate &amp; Competent Authority Land Acquisition (CALA)
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[10px]">
            RFCTLARR ACT, 2013 (CENTRAL ACT 30 OF 2013)
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            District Revenue Cloud • Live &amp; Encrypted
          </span>
          <span className="text-amber-300/90 font-mono">DILRMP • ULPIN Bhu-Aadhaar v3.4</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Left: Emblem & National Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-slate-800/80 border border-[#C5A059]/70 flex items-center justify-center text-[#E6CA85] font-serif font-black text-xl shadow-xs">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-white tracking-wide">
                NLAMS
              </span>
              <span className="text-[10px] bg-[#C5A059] text-slate-950 font-bold px-1.5 py-0.5 font-mono">
                PILLAR 8
              </span>
              <span className="text-xs text-amber-200/90 font-semibold tracking-wide">
                DISTRICT COLLECTORATE
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium tracking-tight">
              Statutory Land Acquisition, Compensation &amp; R&amp;R Directorate
            </div>
          </div>

          {/* District Switcher Dropdown */}
          <div className="relative ml-4 pl-4 border-l border-slate-700">
            <button
              onClick={() => {
                setIsDistrictMenuOpen(!isDistrictMenuOpen);
                setIsWorkspaceMenuOpen(false);
                setIsRoleMenuOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1 bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-left transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
                  DISTRICT JURISDICTION
                </div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{activeDistrict?.name || 'Thane District'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({activeDistrict?.state})</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </div>
              </div>
            </button>

            {isDistrictMenuOpen && (
              <div className="absolute left-4 top-full mt-1 w-64 bg-[#0F1E33] border border-slate-700 shadow-xl z-50 p-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold text-[#C5A059] uppercase tracking-wider border-b border-slate-800">
                  Select Revenue District
                </div>
                {districts.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDistrictId(d.id);
                      setIsDistrictMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      selectedDistrictId === d.id ? 'bg-slate-800/90 text-[#E6CA85] font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-[10px] text-slate-400">{d.state} • {d.collectorName}</div>
                    </div>
                    {selectedDistrictId === d.id && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Search, Role Switcher, Cross-Workspace Switcher, Audit */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/60 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">Search Khasra / Survey / ULPIN...</span>
            <kbd className="text-[10px] bg-slate-900 px-1 py-0.5 text-slate-400 font-mono">⌘K</kbd>
          </button>

          {/* Officer Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsRoleMenuOpen(!isRoleMenuOpen);
                setIsWorkspaceMenuOpen(false);
                setIsDistrictMenuOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-left transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div className="text-left hidden md:block">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                  {activeRole?.jurisdictionLevel || 'District Officer'}
                </div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{activeRole?.title?.split('(')[0] || 'District Collector'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 bg-[#0F1E33] border border-slate-700 shadow-xl z-50 p-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold text-[#C5A059] uppercase tracking-wider border-b border-slate-800">
                  Switch Presiding Officer Designation (Sec 3(g))
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRoleId(r.id);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-2 flex items-start justify-between hover:bg-slate-800 cursor-pointer border-b border-slate-800/50 ${
                      selectedRoleId === r.id ? 'bg-slate-800/90 text-[#E6CA85]' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{r.title}</div>
                      <div className="text-[10px] text-slate-400">{r.officerName} • {r.designation}</div>
                      <div className="text-[9px] text-emerald-400 font-mono mt-0.5">{r.dscStatus}</div>
                    </div>
                    {selectedRoleId === r.id && <Check className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cross-Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen);
                setIsDistrictMenuOpen(false);
                setIsRoleMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Workspace Portal</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isWorkspaceMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 bg-[#0F1E33] border border-[#C5A059]/40 shadow-2xl z-50 p-1 text-xs font-sans">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] border-b border-slate-800">
                  NLAMS STATUTORY PILLARS (1-8)
                </div>

                <div className="space-y-0.5 py-1">
                  {/* Workspace 0: National Landing Page */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('landing');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-amber-300 hover:text-amber-200 flex items-center justify-between cursor-pointer border-b border-slate-800 font-bold"
                  >
                    <div>
                      <div>0. National Public Portal &amp; Landing Page</div>
                      <div className="text-[10px] text-slate-400 font-normal">Citizen Services, ULPIN Search, Gazette Vault</div>
                    </div>
                  </button>

                  {/* Workspace 1: Requisitioning Body */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('requiring-body');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">1. Requisitioning Body Workspace</div>
                      <div className="text-[10px] text-slate-400">NHAI, DFCCIL, Metro, State PWD</div>
                    </div>
                  </button>

                  {/* Workspace 2: Policy Maker */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('policy-maker');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">2. Policy Maker &amp; Executive Oversight</div>
                      <div className="text-[10px] text-slate-400">Apex Committee, NMC/SMC, Lapsing Radar</div>
                    </div>
                  </button>

                  {/* Workspace 3: SIA & IEG */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('sia-ieg');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">3. SIA &amp; IEG Combined Workspace</div>
                      <div className="text-[10px] text-slate-400">Baseline Census, SIMP, Sec 7 Appraisal</div>
                    </div>
                  </button>

                  {/* Workspace 4: R&R Authority */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('rr-authority');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">4. R&amp;R Authority Master Workspace</div>
                      <div className="text-[10px] text-slate-400">Administrator (Sec 43) &amp; Commissioner (Sec 44)</div>
                    </div>
                  </button>

                  {/* Workspace 5: LARR Authority */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('larr-authority');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">5. LARR Authority — Judicial Tribunal</div>
                      <div className="text-[10px] text-slate-400">Sections 51–74 Reference, Cause List</div>
                    </div>
                  </button>

                  {/* Workspace 6: Central Appropriate Government */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('central-appropriate-gov');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">6. Central Appropriate Government</div>
                      <div className="text-[10px] text-slate-400">MoRTH, Railways, Gazette &amp; NMC</div>
                    </div>
                  </button>

                  {/* Workspace 7: State Appropriate Government */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('state-appropriate-gov');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold">7. State Appropriate Government</div>
                      <div className="text-[10px] text-slate-400">Revenue Dept, State Gazette, Sec 11/19</div>
                    </div>
                  </button>

                  {/* Workspace 8: District Collector (CURRENT) */}
                  <div className="p-2 bg-slate-800/90 text-[#C5A059] font-bold border-l-2 border-[#C5A059] flex items-center justify-between">
                    <div>
                      <div>8. Master District Collector Workspace</div>
                      <div className="text-[10px] text-slate-400 font-normal">Active Session • Collector / CALA / LAO</div>
                    </div>
                    <Check className="w-4 h-4 text-[#C5A059]" />
                  </div>

                  {/* Workspace 9: Citizen & Affected Person Workspace */}
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('citizen');
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-amber-300">9. Citizen &amp; Affected Person Portal</div>
                      <div className="text-[10px] text-slate-400">ULPIN Bhu-Aadhaar, Sec 15 Objections &amp; PFMS DBT</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Audit Trail Shortcut */}
          <button
            onClick={openAuditDrawer}
            title="Statutory Immutable Audit Trail"
            className="p-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Logout Button -> Landing Page */}
          <button
            onClick={() => {
              if (onSwitchWorkspace) onSwitchWorkspace('landing');
            }}
            title="Logout & Return to NLAMS Public Portal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
