import React, { useState } from 'react';
import { 
  Compass, 
  Clock, 
  Send, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  AlertTriangle, 
  Building, 
  Users, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import StatutoryTimerBadge from '../components/common/StatutoryTimerBadge.jsx';

export default function SiaSurveyLaunchHubPage() {
  const {
    siaRecords,
    projects,
    jurisdiction,
    handleIssueSiaStart,
    onSwitchWorkspace,
    activeRole
  } = useAppropriateGovernment();

  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [selectedProjId, setSelectedProjId] = useState(projects[0]?.id || '');
  const [siaAgency, setSiaAgency] = useState('Punjab State Institute of Public Administration (PSIPA)');
  const [surveyStartDate, setSurveyStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [collectorName, setCollectorName] = useState('Dr. Preeti Yadav, IAS (DC Patiala)');

  const isCentral = jurisdiction === 'CENTRAL';

  const handleLaunchSia = async (e) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === selectedProjId);
    await handleIssueSiaStart({
      projectId: selectedProjId,
      projectName: proj?.name || 'National Highway Project',
      siaAgency,
      surveyStartDate,
      collectorName
    });
    setIsLaunchModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral ? 'Central SIA & Survey Launch Hub (Section 4(1))' : 'State SIA & Baseline Survey Launch Hub'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 3
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory Social Impact Assessment initiation under Section 4(1); 6-month statutory completion SLA &amp; SIA agency mandate
          </p>
        </div>

        {/* Launch Button & Workspace Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
            className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Open SIA &amp; IEG Workspace</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setIsLaunchModalOpen(true)}
            className="px-3 py-1.5 rounded bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Issue Section 4(1) SIA Notification</span>
          </button>
        </div>
      </div>

      {/* Statutory Guidance Box */}
      <div className="p-3 bg-blue-50/60 rounded border border-blue-200 text-xs space-y-1">
        <div className="font-bold text-[#1B365D] flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-blue-700" />
          <span>Section 4(2) Statutory 6-Month Completion Mandate:</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          The Social Impact Assessment study shall be completed within a period of <strong>six months</strong> from the date of its commencement. 
          Upon submission, the report is appraised by the independent Multi-Disciplinary Expert Group under Section 7 within <strong>two months</strong>.
        </p>
      </div>

      {/* Active SIA Launch Records Table */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
              Active Section 4(1) SIA Survey Operations
            </h3>
            <p className="text-xs text-slate-500">
              Assigned accredited SIA agencies, District Collector coordination &amp; 6-month SLA clock
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">
            {siaRecords.length} Active Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Launch ID</th>
                <th className="py-2.5 px-3">Project Name &amp; Code</th>
                <th className="py-2.5 px-3">Accredited SIA Agency</th>
                <th className="py-2.5 px-3">District Collector / CALA</th>
                <th className="py-2.5 px-3 text-center">Commencement</th>
                <th className="py-2.5 px-3 text-center">6-Month SLA</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Statutory Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {siaRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {rec.id}
                  </td>
                  <td className="py-2.5 px-3 max-w-xs">
                    <div className="font-bold text-[#1B365D] truncate">{rec.projectName}</div>
                    <div className="text-[10px] font-mono text-slate-500">{rec.projectId}</div>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    {rec.siaAgency}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {rec.collectorName}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                    {rec.surveyStartDate}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <StatutoryTimerBadge
                      daysRemaining={rec.daysRemaining}
                      daysElapsed={180 - rec.daysRemaining}
                      totalWindowDays={180}
                      compact={true}
                    />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {rec.siaStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
                        className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#142642] text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect in SIA Workspace</span>
                        <ExternalLink className="w-3 h-3 text-[#C5A059]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Issue Section 4(1) SIA Notification */}
      {isLaunchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-300 max-w-xl w-full p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                Issue Section 4(1) SIA Start Notification
              </div>
              <button
                onClick={() => setIsLaunchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleLaunchSia} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block pb-1">
                  Select Validated Statutory Project:
                </label>
                <select
                  value={selectedProjId}
                  onChange={e => setSelectedProjId(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white font-medium outline-none focus:border-[#1B365D]"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.id} — {p.name} ({p.executingAgency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block pb-1">
                  Accredited Social Impact Assessment Agency:
                </label>
                <input
                  type="text"
                  value={siaAgency}
                  onChange={e => setSiaAgency(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
                  placeholder="e.g. Tata Institute of Social Sciences / PSIPA"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">
                    Commencement Date:
                  </label>
                  <input
                    type="date"
                    value={surveyStartDate}
                    onChange={e => setSurveyStartDate(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">
                    Assigned District Collector / CALA:
                  </label>
                  <input
                    type="text"
                    value={collectorName}
                    onChange={e => setCollectorName(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Statutory Automated Broadcast Notice:
                </div>
                <p>
                  Issuing this notification automatically triggers statutory webhooks to:
                  (1) SIA &amp; IEG Workspace, (2) District Collector CALA Portal, (3) Requiring Body Escrow Desk, and (4) Citizen Public Gazette.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsLaunchModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold cursor-pointer"
                >
                  Publish &amp; Broadcast Section 4(1)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
