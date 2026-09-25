import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Home, 
  Coins, 
  Building,
  Check
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';

export default function RnRReviewObjectionsPage() {
  const {
    selectedProject,
    onSwitchWorkspace,
    jurisdiction
  } = useAppropriateGovernment();

  const [recordedSatisfaction, setRecordedSatisfaction] = useState(true);

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              Section 15 Objections Review &amp; R&amp;R Statutory Approval Portal
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Collector hearing recommendations under Section 15(2); R&amp;R Commissioner Scheme review &amp; Appropriate Government recorded satisfaction
          </p>
        </div>

        {/* Workspace Deep Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSwitchWorkspace && onSwitchWorkspace('rr-authority')}
            className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Open R&amp;R Authority Workspace</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Appropriate Government Recorded Satisfaction Banner */}
      <div className="p-4 bg-emerald-50 rounded border border-emerald-300 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-200 text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <div className="font-bold text-emerald-950 text-sm">
              Appropriate Government Statutory Satisfaction Recorded
            </div>
            <p className="text-emerald-800 text-[11px] mt-0.5">
              Having examined Collector&apos;s recommendations under Section 15(2) and R&amp;R Commissioner approved scheme under Section 18, satisfaction is recorded for issuing Section 19 declaration.
            </p>
          </div>
        </div>

        <button
          onClick={() => setRecordedSatisfaction(!recordedSatisfaction)}
          className={`px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
            recordedSatisfaction
              ? 'bg-emerald-700 text-white hover:bg-emerald-800'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{recordedSatisfaction ? 'Satisfaction Affirmed' : 'Mark Satisfaction'}</span>
        </button>
      </div>

      {/* Two-Column Grid: Left (Section 15 Objections) & Right (R&R Scheme Summary) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Section 15 Objections Summary */}
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Section 15 Objections &amp; Collector Hearings
              </h3>
              <p className="text-xs text-slate-500">
                Public hearing findings and Collector recommendations submitted to Government
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              3 Objections Filed
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Objection 1 */}
            <div className="p-3 rounded border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">S. Gurmeet Singh &amp; 3 Others</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  RESOLVED WITH REALIGNMENT
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                ULPIN: <span className="font-mono">19U28746219801</span> • Khasra 142/1, Sultanpur Khurd
              </div>
              <div className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200">
                <strong>Ground:</strong> Alignment bisecting multi-crop tubewell &amp; ancestral orchard.
                <br />
                <strong>Collector Finding:</strong> NHAI agreed to shift alignment by 14 meters west; objection satisfactorily settled.
              </div>
            </div>

            {/* Objection 2 */}
            <div className="p-3 rounded border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Payal Gram Panchayat Body</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                  REJECTED WITH REASONS
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                Common Grazing Land (Shamlat Deh) • 1.45 Hectares
              </div>
              <div className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200">
                <strong>Ground:</strong> Loss of communal cattle grazing pasture.
                <br />
                <strong>Collector Finding:</strong> Equivalent alternative land of 1.60 Ha allotted in adjoining survey 150/1; rejected with recorded reasons.
              </div>
            </div>
          </div>
        </div>

        {/* Right: R&R Scheme Summary */}
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                R&amp;R Commissioner Approved Scheme (Sec 18)
              </h3>
              <p className="text-xs text-slate-500">
                Formulated by Administrator (Sec 43) and approved by Commissioner (Sec 44)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              APPROVED &amp; GAZETTED
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Affected Families</div>
                <div className="text-xl font-bold font-mono text-slate-900">142 Families</div>
                <div className="text-[10px] text-slate-500">38 Displaced • 104 Affected</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Resettlement Colony</div>
                <div className="text-xl font-bold font-mono text-emerald-800">5.40 Ha Site</div>
                <div className="text-[10px] text-slate-500">Village Payal Kalan</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Second Schedule Entitlements Package:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-1">
                <li>Constructed Pucca House (50 sq. mtrs) for each displaced rural family.</li>
                <li>One-time Resettlement Allowance of ₹50,000 per family.</li>
                <li>Subsistence grant of ₹3,000 per month for 12 months.</li>
                <li>Mandatory SC/ST Development Plan (Sec 41 &amp; 42) vetted with 20% additional land.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
