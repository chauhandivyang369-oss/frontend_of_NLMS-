import React from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { POLICY_MAKER_PERMISSIONS } from '../../permissions/policyMakerPermissions.js';
import { 
  BarChart3, 
  Layers, 
  AlertTriangle, 
  Coins, 
  Users2, 
  Wrench, 
  HeartHandshake, 
  FileSpreadsheet,
  ChevronRight,
  ChevronLeft,
  Lock,
  X
} from 'lucide-react';

export default function PolicyMakerSidebar({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}) {
  const { 
    activeModule, 
    setActiveModule, 
    setActiveSubPage,
    canAccess,
    currentRoleConfig
  } = usePolicyMaker();

  // 8 Core Policy Maker Modules (clean main menus without sub-menu clutter)
  const modules = [
    {
      id: 'executive-overview',
      number: '01',
      title: 'Executive Overview & GIS',
      icon: BarChart3,
      defaultSubPage: 'dashboard',
      permission: POLICY_MAKER_PERMISSIONS.EXECUTIVE_OVERVIEW_VIEW
    },
    {
      id: 'pipeline',
      number: '02',
      title: 'National / State Pipeline',
      icon: Layers,
      defaultSubPage: 'project-repository',
      permission: POLICY_MAKER_PERMISSIONS.PIPELINE_VIEW
    },
    {
      id: 'risk-engine',
      number: '03',
      title: 'Lapsing Risk Engine',
      icon: AlertTriangle,
      defaultSubPage: 'risk-dashboard',
      permission: POLICY_MAKER_PERMISSIONS.RISK_VIEW,
      badge: '12 Crit',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 'finance-oversight',
      number: '04',
      title: 'PFMS & DBT Oversight',
      icon: Coins,
      defaultSubPage: 'financial-dashboard',
      permission: POLICY_MAKER_PERMISSIONS.FINANCE_VIEW
    },
    {
      id: 'meetings-mom',
      number: '05',
      title: 'NMC / SMC Meetings & MoM',
      icon: Users2,
      defaultSubPage: 'meetings',
      permission: POLICY_MAKER_PERMISSIONS.MEETINGS_VIEW,
      badge: 'MoM',
      badgeColor: 'bg-purple-600 text-white'
    },
    {
      id: 'bottleneck-resolver',
      number: '06',
      title: 'Bottleneck Resolver',
      icon: Wrench,
      defaultSubPage: 'dashboard',
      permission: POLICY_MAKER_PERMISSIONS.BOTTLENECK_VIEW,
      badge: '34 Open',
      badgeColor: 'bg-amber-600 text-white'
    },
    {
      id: 'rr-social-audit',
      number: '07',
      title: 'R&R & Social Audit Review',
      icon: HeartHandshake,
      defaultSubPage: 'rnr-dashboard',
      permission: POLICY_MAKER_PERMISSIONS.RR_VIEW
    },
    {
      id: 'mis-reports',
      number: '08',
      title: 'MIS & Executive Reports',
      icon: FileSpreadsheet,
      defaultSubPage: 'report-dashboard',
      permission: POLICY_MAKER_PERMISSIONS.REPORTS_VIEW
    }
  ];

  const handleSelectModule = (modId, defaultSubPage) => {
    setActiveModule(modId);
    if (defaultSubPage) {
      setActiveSubPage(defaultSubPage);
    }
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  // Collapsed Sidebar View (Desktop Icon-only)
  if (isCollapsed) {
    return (
      <aside className="hidden md:flex w-16 bg-[#142642] border-r border-slate-700/80 flex-col items-center py-4 select-none shrink-0 z-30">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer mb-6"
          title="Expand Sidebar"
        >
          <ChevronRight className="w-5 h-5 text-[#C5A059]" />
        </button>

        <div className="flex flex-col gap-2.5 w-full px-2">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isSelected = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => {
                  handleSelectModule(mod.id, mod.defaultSubPage);
                  setIsCollapsed(false);
                }}
                className={`w-full p-2.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer relative group ${
                  isSelected 
                    ? 'bg-[#1B365D] text-white border-2 border-[#C5A059]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={`${mod.number}. ${mod.title}`}
              >
                <Icon className="w-4 h-4" />
                {mod.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
                <div className="absolute left-full ml-2 hidden group-hover:block z-50 whitespace-nowrap bg-[#0F1E33] text-white text-xs px-2.5 py-1 rounded shadow-lg border border-slate-700">
                  <span className="font-mono text-[#C5A059] mr-1.5">{mod.number}</span>
                  {mod.title}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#142642] text-slate-200 select-none border-r border-slate-700/80">
      {/* Sidebar Header */}
      <div className="p-3 border-b border-slate-800 bg-[#0D1829] flex items-center justify-between shrink-0">
        <div>
          <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#C5A059]" />
            <span>POLICY &amp; EXECUTIVE OVERSIGHT</span>
          </div>
          <div className="text-xs font-bold text-white mt-0.5">
            8 Executive Statutory Modules
          </div>
        </div>

        {/* Mobile close button / Desktop collapse button */}
        <div className="flex items-center gap-1">
          {setIsMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              title="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(true)}
            className="hidden md:block p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8 Main Modules Navigation List (Clean, No sub-menus) */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isSelected = activeModule === mod.id;
          const hasAccess = canAccess(mod.permission);

          if (!hasAccess) {
            return (
              <div
                key={mod.id}
                className="p-2.5 rounded opacity-40 text-slate-500 flex items-center justify-between text-xs cursor-not-allowed border border-transparent"
                title="Unauthorized under current committee scope"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 text-slate-600 shrink-0" />
                  <span className="font-mono text-[10px] text-slate-600">{mod.number}</span>
                  <span className="truncate text-xs">{mod.title}</span>
                </div>
                <Lock className="w-3.5 h-3.5 shrink-0" />
              </div>
            );
          }

          return (
            <button
              key={mod.id}
              onClick={() => handleSelectModule(mod.id, mod.defaultSubPage)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-semibold cursor-pointer transition-all border-l-3 text-left ${
                isSelected
                  ? 'bg-[#1B365D] text-white border-[#C5A059] shadow-sm'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 rounded ${
                  isSelected ? 'bg-[#C5A059] text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  {mod.number}
                </span>

                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C5A059]' : 'text-slate-400'}`} />

                <span className="truncate text-xs font-medium">{mod.title}</span>
              </div>

              {mod.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ml-1.5 ${mod.badgeColor}`}>
                  {mod.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Notice at Bottom */}
      <div className="p-3 bg-[#0D1829] border-t border-slate-800 text-[10px] text-slate-400 shrink-0">
        <div className="flex items-center justify-between font-mono">
          <span className="text-[#C5A059] font-bold">{currentRoleConfig?.badgeText || 'NATIONAL COMMITTEE'}</span>
          <span className="text-slate-500">Sec 45/48/50</span>
        </div>
        <div className="text-slate-300 text-[10px] truncate mt-0.5 font-medium">
          {currentRoleConfig?.title || 'Policy Maker & Executive'}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 flex-col shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
