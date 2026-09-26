import React from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Gauge, 
  Layers, 
  FileText, 
  Map, 
  Landmark, 
  Clock, 
  Gavel, 
  Home, 
  ShieldCheck, 
  Archive,
  Menu,
  CheckCircle2
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', number: '1', title: 'Executive Dashboard', icon: Gauge },
  { id: 'form-i-wizard', number: '2', title: 'Form-I Smart Wizard', icon: FileText, badge: 'New', badgeType: 'neutral' },
  { id: 'requisition-hub', number: '3', title: 'Master Requisition Hub', icon: Layers, badge: '18', badgeType: 'neutral' },
  { id: 'gis-canvas', number: '4', title: 'GIS Spatial Canvas', icon: Map },
  { id: 'escrow-ledger', number: '5', title: 'Financial Escrow Ledger', icon: Landmark },
  { id: 'timeline-tracker', number: '6', title: 'Statutory Timeline Tracker', icon: Clock, badge: '3 SLA', badgeType: 'warning' },
  { id: 'objections-hearings', number: '7', title: 'Objections & Hearings', icon: Gavel },
  { id: 'rnr-dbt', number: '8', title: 'R&R Oversight & DBT', icon: Home },
  { id: 'pia-rbac', number: '9', title: 'PIA Delegation & RBAC', icon: ShieldCheck },
  { id: 'document-vault', number: '10', title: 'Document & Gazette Vault', icon: Archive },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { activeModule, setActiveModule } = useWorkspace();

  return (
    <aside 
      className={`bg-[#1B365D] border-r border-blue-900/40 flex flex-col transition-all duration-200 shrink-0 select-none shadow-lg ${
        isCollapsed ? 'w-16' : 'w-68 xl:w-72'
      }`}
    >
      {/* Header: NAVIGATION MODULES + Hamburger Icon */}
      <div className="px-4 py-3.5 border-b border-blue-400/20 bg-[#142947] flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-[11px] font-bold text-amber-300 tracking-wider uppercase font-sans">
            Navigation Modules
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-blue-100 hover:text-white transition-colors mx-auto cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* 10 Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-blue-300/30">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#142947] border border-amber-400/60 text-white font-bold shadow-xs'
                  : 'text-blue-100 hover:bg-[#244777] hover:text-white'
              }`}
              title={isCollapsed ? `${item.number}. ${item.title}` : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-blue-200'}`} />

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-xs truncate font-medium">
                    <span className="text-blue-200 mr-1.5 font-mono">{item.number}.</span>
                    {item.title}
                  </span>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ml-1.5 shrink-0 ${
                      item.badgeType === 'warning' 
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40' 
                        : 'bg-[#142947] text-blue-100 border border-blue-400/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Active gold dot */}
              {isActive && !isCollapsed && (
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 ml-1"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Authentication & Last Sync Box */}
      {!isCollapsed && (
        <div className="p-3.5 border-t border-blue-400/20 text-[11px] bg-[#142947]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-slate-200 font-bold font-mono text-[10px] truncate">
                DILRMP • NIC AUTHENTICATED
              </div>
              <div className="text-blue-200/80 text-[9px] truncate">
                Govt. Enterprise Cloud Gateway
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

