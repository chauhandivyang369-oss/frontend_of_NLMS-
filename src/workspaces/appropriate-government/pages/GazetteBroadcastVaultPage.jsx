import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  FileText, 
  Radio, 
  Layers, 
  QrCode,
  Clock
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import AuditTimeline from '../components/common/AuditTimeline.jsx';

export default function GazetteBroadcastVaultPage() {
  const {
    gazetteDocs,
    jurisdiction,
    setGazetteModalDoc,
    auditLogs
  } = useAppropriateGovernment();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [broadcastingId, setBroadcastingId] = useState(null);
  const [broadcastSuccess, setBroadcastSuccess] = useState({});

  const isCentral = jurisdiction === 'CENTRAL';

  const filteredDocs = gazetteDocs.filter(d => {
    const matchesSearch =
      d.notificationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.projectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'ALL' || d.section.includes(selectedSection);
    return matchesSearch && matchesSection;
  });

  const handleBroadcast = (docId) => {
    setBroadcastingId(docId);
    setTimeout(() => {
      setBroadcastingId(null);
      setBroadcastSuccess(prev => ({ ...prev, [docId]: true }));
    }, 1000);
  };

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral ? 'Central e-Gazette & Multi-Channel Broadcast Vault' : 'State e-Gazette & Multi-Channel Broadcast Vault'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 8
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory repository of published Extraordinary Gazettes; cryptographic SHA-256 seal, version control &amp; inter-workspace notification broadcasting
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search Gazette No, Project..."
              className="pl-8 pr-3 py-1.5 rounded border border-slate-300 bg-white text-xs outline-none focus:border-[#1B365D]"
            />
          </div>

          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">All Statutory Sections</option>
            <option value="Section 11">Section 11(1) Preliminary</option>
            <option value="Section 19">Section 19(1) Final Declaration</option>
            <option value="Section 4">Section 4(1) SIA Notification</option>
          </select>
        </div>
      </div>

      {/* Broadcast Dispatcher Status Banner */}
      <div className="p-3 bg-gradient-to-r from-blue-900 to-[#1B365D] text-white rounded shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-[#E6CA85] animate-pulse" />
          <div>
            <div className="font-bold tracking-wide text-sm">
              Statutory Real-Time Broadcast Gateway Active
            </div>
            <div className="text-[11px] text-slate-300">
              Published gazettes automatically dispatch statutory webhooks to Collector, Requiring Body, R&amp;R, SIA, LARR &amp; Citizen Portal
            </div>
          </div>
        </div>
        <div className="font-mono text-[11px] bg-white/10 px-2.5 py-1 rounded border border-white/20">
          Sync Status: <span className="text-emerald-400 font-bold">100% Synced</span>
        </div>
      </div>

      {/* Gazette Documents Master Table */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Gazette Notification No</th>
                <th className="py-2.5 px-3">Statutory Title &amp; Project</th>
                <th className="py-2.5 px-3">Section &amp; Type</th>
                <th className="py-2.5 px-3 text-center">Publication Date</th>
                <th className="py-2.5 px-3">Version &amp; Cryptographic Hash</th>
                <th className="py-2.5 px-3 text-center">DSC e-Sign</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredDocs.map(doc => {
                const isBroadcasted = broadcastSuccess[doc.id] || doc.broadcastDispatched;
                const isBroadcasting = broadcastingId === doc.id;

                return (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-mono font-bold text-slate-900">{doc.notificationNo}</div>
                      <div className="text-[10px] font-mono text-slate-500">{doc.id}</div>
                    </td>
                    <td className="py-2.5 px-3 max-w-sm">
                      <div className="font-bold text-[#1B365D]">{doc.title}</div>
                      <div className="text-[10px] font-mono text-slate-500">Project: {doc.projectCode}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {doc.section}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                      {doc.publicationDate}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 font-mono font-bold text-[10px] border border-blue-200">
                          {doc.version}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[120px]" title={doc.sha256Hash}>
                          {doc.sha256Hash.slice(0, 16)}...
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        DSC VERIFIED
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setGazetteModalDoc(doc)}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-amber-700" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => handleBroadcast(doc.id)}
                          disabled={isBroadcasting}
                          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                            isBroadcasted
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : 'bg-[#1B365D] hover:bg-[#142642] text-white'
                          }`}
                        >
                          <Send className="w-3 h-3" />
                          <span>
                            {isBroadcasting
                              ? 'Broadcasting...'
                              : isBroadcasted
                              ? 'Broadcasted'
                              : 'Broadcast'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Audit Trail Component */}
      <AuditTimeline logs={auditLogs} />
    </div>
  );
}
