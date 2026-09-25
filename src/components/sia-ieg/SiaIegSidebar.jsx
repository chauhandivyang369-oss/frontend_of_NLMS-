import React from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Megaphone, 
  FileSpreadsheet, 
  FileCheck2, 
  Award, 
  SearchCheck, 
  Scale, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const MENU_ICONS = {
  'sia-overview': LayoutDashboard,
  'survey-impact-census': ClipboardList,
  'public-hearing': Megaphone,
  'simp-builder': FileSpreadsheet,
  'final-sia-report': FileCheck2,
  'ieg-dashboard': Award,
  'sia-review': SearchCheck,
  'statutory-appraisal': Scale,
  'final-recommendation': ShieldCheck
};

export default function SiaIegSidebar() {
  const { 
    activeMenu, 
    setActiveMenu, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    menus 
  } = useSiaIeg();

  const siaMenus = menus.filter(m => m.group === 'SIA OPERATIONS');
  const iegMenus = menus.filter(m => m.group === 'IEG EVALUATION');

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const renderMenuItem = (item) => {
    const IconComponent = MENU_ICONS[item.id] || LayoutDashboard;
    const isActive = activeMenu === item.id;

    return (
      <button
        key={item.id}
        id={`sidebar-menu-${item.id}`}
        onClick={() => handleMenuClick(item.id)}
        title={isSidebarCollapsed ? `${item.number} ${item.title}` : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer group relative ${
          isActive
            ? 'bg-[#1B365D] text-white border-l-4 border-[#C5A059] shadow-sm font-bold'
            : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border-l-4 border-transparent'
        }`}
      >
        <div className={`shrink-0 ${isActive ? 'text-[#E6CA85]' : 'text-slate-400 group-hover:text-slate-200'}`}>
          <IconComponent className="w-4 h-4" />
        </div>

        {!isSidebarCollapsed && (
          <div className="flex items-center justify-between flex-1 min-w-0">
            <span className="truncate">{item.title}</span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 ml-2 ${
              isActive 
                ? 'bg-[#C5A059]/30 text-[#E6CA85] border border-[#C5A059]/40' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {item.number}
            </span>
          </div>
        )}

        {/* Tooltip for collapsed state */}
        {isSidebarCollapsed && (
          <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded shadow-xl border border-slate-700 whitespace-nowrap hidden group-hover:block z-50 pointer-events-none">
            <span className="font-mono text-[#E6CA85] mr-1.5">{item.number}</span>
            {item.title}
          </div>
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F2342] text-slate-100 border-r border-slate-700/70 select-none">
      
      {/* Mobile Drawer Header */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase font-mono">
            SIA & IEG NAVIGATION
          </span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        
        {/* GROUP 1: SIA OPERATIONS */}
        <div>
          {!isSidebarCollapsed ? (
            <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
              <span>SIA OPERATIONS</span>
              <span className="text-[9px] bg-slate-800/90 text-[#E6CA85] px-1.5 py-0.2 rounded font-semibold border border-slate-700">
                SEC 4-6
              </span>
            </div>
          ) : (
            <div className="border-t border-slate-700/60 my-2 mx-1" title="SIA OPERATIONS" />
          )}

          <div className="space-y-1">
            {siaMenus.map(renderMenuItem)}
          </div>
        </div>

        {/* GROUP 2: IEG EVALUATION */}
        <div className="pt-2">
          {!isSidebarCollapsed ? (
            <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between border-t border-slate-700/60 pt-3">
              <span>IEG EVALUATION</span>
              <span className="text-[9px] bg-slate-800/90 text-[#E6CA85] px-1.5 py-0.2 rounded font-semibold border border-slate-700">
                SEC 7-9
              </span>
            </div>
          ) : (
            <div className="border-t border-slate-700/60 my-2 mx-1" title="IEG EVALUATION" />
          )}

          <div className="space-y-1">
            {iegMenus.map(renderMenuItem)}
          </div>
        </div>

      </div>

      {/* Footer / Collapse Toggle */}
      <div className="p-2 border-t border-slate-700/80 hidden md:block">
        <button
          id="sia-ieg-sidebar-collapse-toggle"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#C5A059]" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[11px] font-mono text-slate-300">COLLAPSE SIDEBAR</span>
            </>
          )}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        id="sia-ieg-desktop-sidebar"
        className={`hidden md:block shrink-0 transition-all duration-200 h-[calc(100vh-3.5rem)] sticky top-14 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
