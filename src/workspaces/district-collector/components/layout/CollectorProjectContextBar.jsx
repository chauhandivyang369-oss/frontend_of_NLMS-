import React from 'react';
import { 
  Briefcase, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Coins, 
  ChevronDown 
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../../services/compensationCalculator.js';

export default function CollectorProjectContextBar() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    activeProject,
    openProjectDrawer
  } = useDistrictCollector();

  if (!activeProject) return null;

  // Sec 25 Countdown styling
  const isCritical = activeProject.daysRemainingSec25 < 60;
  const isWarning = activeProject.daysRemainingSec25 >= 60 && activeProject.daysRemainingSec25 < 150;

  return (
    <div className="bg-[#0F1E33] text-white border-b border-slate-700/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
      {/* Left: Project Selector & Basic Details */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ACTIVE CORRIDOR:
          </span>
          <select
            value={selectedProjectId || ''}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-[#142642] text-white border border-slate-600 px-2 py-1 font-semibold text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Requisitioning Body Tag */}
        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 border border-slate-700 text-[11px] font-mono">
          {activeProject.requiringBody}
        </span>

        {/* Statutory Stage */}
        <div className="flex items-center gap-1.5 bg-blue-950/80 text-blue-300 px-2 py-0.5 border border-blue-800/60 font-semibold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>{activeProject.currentStageLabel}</span>
        </div>
      </div>

      {/* Right: Section 25 Lapsing Clock & Acquisition Stats */}
      <div className="flex items-center gap-4">
        {/* Section 25 Award Countdown Watchdog */}
        <div
          title="Section 25 RFCTLARR Act: Award must be made within 12 months from Sec 19 Declaration, else proceedings lapse!"
          className={`flex items-center gap-2 px-2.5 py-1 border text-xs font-mono font-bold ${
            isCritical
              ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
              : isWarning
              ? 'bg-amber-950/80 text-amber-300 border-amber-600'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>SEC 25 AWARD DEADLINE:</span>
          <span className="underline decoration-wavy">
            {activeProject.daysRemainingSec25 > 0 ? `${activeProject.daysRemainingSec25} DAYS REMAINING` : 'AWARD PASSED / OK'}
          </span>
        </div>

        {/* Acquisition Ha Progress */}
        <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-2 py-1 border border-slate-700">
          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Area:</span>
          <span className="font-bold text-white font-mono">
            {activeProject.acquiredAreaHa} / {activeProject.totalAreaHa} Ha
          </span>
        </div>

        {/* Khatedars Count */}
        <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-2 py-1 border border-slate-700">
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span>Khatedars:</span>
          <span className="font-bold text-white font-mono">{activeProject.totalKhatedars}</span>
        </div>

        {/* Escrow Disbursed */}
        <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-2 py-1 border border-slate-700">
          <Coins className="w-3.5 h-3.5 text-emerald-400" />
          <span>Disbursed:</span>
          <span className="font-bold text-emerald-300 font-mono">
            ₹{activeProject.disbursedCrores} Cr / ₹{activeProject.escrowDepositedCrores} Cr
          </span>
        </div>

        {/* Drawer button */}
        <button
          onClick={() => openProjectDrawer(activeProject.id)}
          className="text-[#C5A059] hover:text-[#e4be6c] underline font-semibold cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
}
