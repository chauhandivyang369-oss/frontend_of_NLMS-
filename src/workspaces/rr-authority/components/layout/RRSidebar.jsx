import React from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  ShieldAlert, 
  Megaphone, 
  Home, 
  CreditCard, 
  FileCheck2, 
  TrendingUp, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Shield,
  Layers
} from 'lucide-react';

const MENU_ICONS = {
  'rr-dashboard': LayoutDashboard,
  'affected-families': Users,
  'rr-scheme-builder': FileSpreadsheet,
  'sc-st-plan-builder': ShieldAlert,
  'public-hearing': Megaphone,
  'rr-allotment': Home,
  'rr-dbt': CreditCard,
  'commissioner-approval': FileCheck2,
  'rr-monitoring': TrendingUp,
  'rr-audit-vault': FileText
};

export default function RRSidebar() {
  const { 
    activeMenu, 
    setActiveMenu, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed,
    isMobileSidebarOpen, 
    setIsMobileSidebarOpen,
    visibleMenus,
    currentRole
  } = useRRAuthority();

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const adminMenus = visibleMenus.filter(m => m.roleCategory === 'ADMINISTRATOR');
  const commissionerMenus = visibleMenus.filter(m => m.roleCategory === 'COMMISSIONER');

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-[#0F2342] text-slate-200 border-r border-slate-700/80 transition-all duration-200 ease-in-out select-none shadow-md lg:shadow-none ${
          isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-64 xl:w-72'}`}
      >
        
        {/* Mobile/Tablet Drawer Header */}
        <div className="lg:hidden h-14 px-4 flex items-center justify-between border-b border-slate-700 bg-[#1B365D]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C5A059]" />
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              R&R Authority Navigation
            </span>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Slicing Header Badge */}
        {!isSidebarCollapsed && (
          <div className="hidden md:flex px-4 py-2.5 border-b border-slate-700/70 items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                {currentRole === 'DUAL_CHARGE' 
                  ? 'DUAL-CHARGE UNIFIED VIEW (1-10)' 
                  : currentRole === 'ADMINISTRATOR' 
                    ? 'ADMINISTRATOR DESK (1-7)' 
                    : 'COMMISSIONER DESK (8-10)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#C5A059] font-bold">
              {visibleMenus.length} Menus
            </span>
          </div>
        )}

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
          
          {/* Group 1: Administrator Menus (1 to 7) */}
          {adminMenus.length > 0 && (
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-wider flex items-center justify-between">
                  <span>Part I: Administrator Operations</span>
                  <span className="text-slate-400">Sec 43</span>
                </div>
              )}

              {(adminMenus || []).map((item) => {
                const IconComponent = MENU_ICONS[item.id] || LayoutDashboard;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    title={isSidebarCollapsed ? `${item.number} ${item.title}` : undefined}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer group ${
                      isActive 
                        ? 'bg-[#1B365D] text-white font-bold border-l-4 border-[#C5A059] shadow-inner' 
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#C5A059] scale-110' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />

                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 leading-snug">
                          <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`}>
                            {item.number}
                          </span>
                          <span className="truncate text-[11px] font-sans">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                          {item.statutoryRef}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Group 2: Commissioner Menus (8 to 10) */}
          {commissionerMenus.length > 0 && (
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-wider flex items-center justify-between border-t border-slate-700/60 pt-3">
                  <span>Part II: Commissioner Oversight</span>
                  <span className="text-slate-400">Sec 44</span>
                </div>
              )}

              {(commissionerMenus || []).map((item) => {
                const IconComponent = MENU_ICONS[item.id] || LayoutDashboard;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    title={isSidebarCollapsed ? `${item.number} ${item.title}` : undefined}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer group ${
                      isActive 
                        ? 'bg-[#1B365D] text-white font-bold border-l-4 border-[#C5A059] shadow-inner' 
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#C5A059] scale-110' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />

                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 leading-snug">
                          <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`}>
                            {item.number}
                          </span>
                          <span className="truncate text-[11px] font-sans">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                          {item.statutoryRef}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer: Collapse / Expand Toggle */}
        <div className="hidden md:flex h-11 px-3 border-t border-slate-700/80 items-center justify-between bg-slate-900/60 text-slate-400 text-xs">
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-slate-400">
              RFCTLARR 2013 • NIC / DoLR
            </span>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

      </aside>
    </>
  );
}
