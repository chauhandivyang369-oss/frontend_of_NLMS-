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
      className={`bg-[#0b1325] border-r border-slate-800 flex flex-col transition-all duration-200 shrink-0 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header: NAVIGATION MODULES + Hamburger Icon */}
      <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-sans">
            Navigation Modules
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors mx-auto"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* 10 Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-2 px-2.5 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all ${
                isActive
                  ? 'bg-[#172554] border border-slate-700/90 text-white font-medium shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
              title={isCollapsed ? `${item.number}. ${item.title}` : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-xs truncate font-medium">
                    <span className="text-slate-400 mr-1.5">{item.number}.</span>
                    {item.title}
                  </span>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-medium ml-1.5 shrink-0 ${
                      item.badgeType === 'warning' 
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/80' 
                        : 'bg-slate-800 text-slate-300 border border-slate-750'
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
        <div className="p-3 border-t border-slate-800/80 text-[11px] bg-[#090f1e]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white leading-tight">RB MANAGER</div>
              <div className="text-[10px] text-slate-400 truncate">Authenticated Government User</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/60 font-sans">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span>Last sync: 14 Sep 2026, 14:32 IST</span>
          </div>
        </div>
      )}
    </aside>
  );
}

