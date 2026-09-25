import React from 'react';
import { 
  BarChart3, 
  Inbox, 
  UserPlus, 
  Compass, 
  Scale, 
  Users, 
  Megaphone, 
  Award, 
  CheckCircle2, 
  Map, 
  AlertCircle
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function CollectorSidebar() {
  const { 
    activeMenuId, 
    setActiveMenuId, 
    formIInwards, 
    objections, 
    claims, 
    activeProject 
  } = useDistrictCollector();

  // Dynamic badges
  const pendingInwardsCount = formIInwards.filter(f => f.status === 'INQUIRY_IN_PROGRESS').length;
  const pendingObjectionsCount = objections.filter(o => o.status === 'SCHEDULED_FOR_HEARING').length;
  const pendingClaimsCount = claims.filter(c => c.scrutinyStatus === 'BANK_NOC_REQUIRED_BEFORE_DISBURSEMENT').length;

  const menuItems = [
    {
      id: 'executive-dashboard',
      number: '1',
      title: 'Executive Dashboard & Parcel Matrix',
      subtitle: 'District KPIs, SLA Watchdog & Cadastral Sync',
      icon: BarChart3
    },
    {
      id: 'form-i-inward',
      number: '2',
      title: 'Form-I Inward & Field Inquiry Hub',
      subtitle: 'Preliminary Revenue Check & Sec 4 Recommendation',
      icon: Inbox,
      badge: pendingInwardsCount > 0 ? `${pendingInwardsCount}` : null,
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'rbac-delegation',
      number: '3',
      title: 'RBAC Sub-Delegation Manager',
      subtitle: 'Section 3(g) Powers: SDM, CALA & Tahsildar DSC',
      icon: UserPlus
    },
    {
      id: 'sec12-survey',
      number: '4',
      title: 'Section 12 & 13 Survey & Damage Desk',
      subtitle: '7-Day Entry Notice, Soundings & Spot Tender',
      icon: Compass
    },
    {
      id: 'sec15-objections',
      number: '5',
      title: 'Section 15 Objections Hearing Engine',
      subtitle: '60-Day Gateway, Quasi-Judicial Bench & RoR Freeze',
      icon: Scale,
      badge: pendingObjectionsCount > 0 ? `${pendingObjectionsCount}` : null,
      badgeColor: 'bg-rose-500'
    },
    {
      id: 'rnr-scheme-review',
      number: '6',
      title: 'R&R Draft Scheme Review Desk',
      subtitle: 'Sec 16/17 DLRRC Bench, Gram Sabha & 2nd Schedule',
      icon: Users
    },
    {
      id: 'sec21-claims-notice',
      number: '7',
      title: 'Section 21 Public Claims & Sec 22 Desk',
      subtitle: '30-60 Day Claims Window & Statements of Interest',
      icon: Megaphone,
      badge: pendingClaimsCount > 0 ? `${pendingClaimsCount}` : null,
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'sec23-award-engine',
      number: '8',
      title: 'Section 23–30 Award Engine',
      subtitle: 'Market Value, 100% Solatium & Sec 25 12-Mo Limit',
      icon: Award
    },
    {
      id: 'sec38-possession-disbursement',
      number: '9',
      title: 'Sec 37 Notice & Sec 38 Possession Desk',
      subtitle: 'DBT Escrow Credit, Sec 77 Deposit & HOTO Panchnama',
      icon: CheckCircle2
    },
    {
      id: 'cadastral-mutation-audit',
      number: '10',
      title: 'Cadastral GIS, Mutation & Audit Vault',
      subtitle: 'Form VI Mutation, ULPIN Bhu-Aadhaar & Hash Logs',
      icon: Map
    }
  ];

  return (
    <aside className="w-64 bg-[#142642] text-slate-300 border-r border-slate-700/80 flex flex-col shrink-0 select-none">
      {/* Sidebar Top Header */}
      <div className="p-3 border-b border-slate-800 bg-[#0D1829] flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#C5A059]" />
          <span>STATUTORY MENUS (EXACTLY 10)</span>
        </div>
        <span className="text-[9px] font-mono bg-slate-800 px-1.5 py-0.5 text-slate-400">
          SEC 3(g) CALA
        </span>
      </div>

      {/* Menus List */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenuId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMenuId(item.id)}
              className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 transition-all cursor-pointer border-l-3 ${
                isActive
                  ? 'bg-slate-800/90 border-[#C5A059] text-white shadow-xs'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              {/* Menu Number */}
              <span
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5 ${
                  isActive ? 'bg-[#C5A059] text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {item.number}
              </span>

              {/* Icon & Titles */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-white' : 'text-slate-200'
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      className={`ml-1.5 text-[9px] font-black text-slate-950 px-1 py-0.2 shrink-0 ${
                        item.badgeColor || 'bg-[#C5A059]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5 leading-tight">
                  {item.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Collector Footnote Ribbon */}
      <div className="p-3 bg-[#0D1829] border-t border-slate-800 text-[10px] text-slate-400 font-sans">
        <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
          <span>STATUTORY TIMELINE STATUS</span>
          <span className="text-emerald-400 font-mono">100% AUDITED</span>
        </div>
        <div className="text-[9px] text-slate-400 leading-normal">
          All orders, hearings, awards &amp; mutations are digitally counter-signed under Section 3(g) RFCTLARR Act.
        </div>
      </div>
    </aside>
  );
}
