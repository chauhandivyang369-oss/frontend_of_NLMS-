import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Key, 
  Shield, 
  Settings, 
  CheckCircle2,
  ArrowRightLeft,
  LogOut
} from 'lucide-react';

export default function GovernmentHeader({ onSwitchToPolicyMaker, onSwitchToSiaIeg, onSwitchWorkspace }) {
  const { 
    officer,
    openAiAssistant,
    setActiveModule
  } = useWorkspace();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  return (
    <header className="bg-[#0b1325] text-white border-b border-slate-800 sticky top-0 z-40 h-14 flex items-center select-none">
      <div className="w-full px-4 flex items-center justify-between gap-3">
        
        {/* Left: Gold Gear Emblem + Title & Subtitle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Golden Gear / Chakra Emblem */}
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-sans">
                National Land Acquisition & Management System
              </h1>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/40">
                NLAMS
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span>Real-Time Digital Monitoring & Decision Support</span>
              <span className="text-cyan-400 font-bold">•</span>
              <span className="text-amber-400 font-semibold tracking-wide uppercase">
                Requisitioning Body Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Input with Ctrl + K */}
        <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ULPIN..."
              className="w-full bg-[#111c33] border border-slate-700/80 rounded-md pl-8 pr-16 py-1 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700 px-1.5 py-0.5 rounded">
              Ctrl + K
            </div>
          </div>
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* SLA Monitor Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-[#111c33] border border-slate-750 px-2.5 py-1 rounded-md text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-slate-300 font-mono text-[11px] font-medium">SLA MONITOR</span>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
              Optimal
            </span>
          </div>

          {/* e-Sign Verified Pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#111c33] border border-amber-500/30 px-2.5 py-1 rounded-md text-xs">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 text-[11px]">e-Sign:</span>
            <span className="text-emerald-400 font-bold font-mono text-[11px]">VERIFIED</span>
          </div>

          {/* Notification Bell with '7' badge */}
          <button 
            onClick={() => setActiveModule('objections-hearings')}
            className="relative p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="7 Action Required Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white font-mono font-bold text-[9px] rounded-full flex items-center justify-center border border-[#0b1325]">
              7
            </span>
          </button>

          {/* Master Pillar Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111c33] hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors cursor-pointer"
              title="Switch Workspace"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Workspace</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-2 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  NLAMS Master Workspaces
                </div>
                <div className="space-y-1 py-1">
                  <button
                    onClick={() => {
                      setWorkspaceMenuOpen(false);
                      if (onSwitchWorkspace) onSwitchWorkspace('landing');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-amber-300 hover:text-amber-200 flex items-center justify-between group cursor-pointer border-b border-slate-800"
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

                  <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">
                        1. Requiring Body Workspace
                      </div>
                      <div className="text-[10px] text-amber-300">
                        Active Workspace (Form-I, GIS, Escrow)
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <button
                    onClick={() => {
                      setWorkspaceMenuOpen(false);
                      if (onSwitchToPolicyMaker) onSwitchToPolicyMaker();
                      else if (onSwitchWorkspace) onSwitchWorkspace('policy-maker');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-purple-300">
                        2. Policy Makers & Oversight
                      </div>
                      <div className="text-[10px] text-slate-400">
                        NMC, SMC, Lapsing Risk, Video Meetings
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setWorkspaceMenuOpen(false);
                      if (onSwitchToSiaIeg) onSwitchToSiaIeg();
                      else if (onSwitchWorkspace) onSwitchWorkspace('sia-ieg');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-[#E6CA85] group-hover:text-amber-300">
                        3. SIA & IEG Evaluation
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sec 4-6 Operations & Sec 7-9 Appraisal
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 bg-[#111c33] hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1 rounded-md text-left transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 text-[10px] font-bold">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-slate-100 flex items-center gap-1">
                  <span>RB MANAGER</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[9px] text-slate-400 font-sans">
                  NHAI / Project Division
                </div>
              </div>
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="border-b border-slate-800 pb-2 mb-2">
                  <div className="font-bold text-white">RB MANAGER (Senior Scale)</div>
                  <div className="text-[11px] text-slate-400">NHAI / Project Division</div>
                  <div className="text-amber-400 font-mono text-[10px] mt-0.5">Level-3 DSC Token Verified</div>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Cadre:</span>
                    <span>Level-14 (SAG)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Clearance:</span>
                    <span className="text-emerald-400 font-mono">Statutory Signatory</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModule('pia-rbac');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full mt-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-semibold rounded text-center"
                >
                  Manage PIA Delegation & Roles
                </button>
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

