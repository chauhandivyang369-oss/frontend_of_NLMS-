import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  CheckCircle2, 
  Copy, 
  Send, 
  ExternalLink, 
  Building, 
  Lock, 
  Check, 
  UserPlus, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';

export default function RbacAccessControlHubPage() {
  const {
    rbacAssignments,
    handleProvisionRbac,
    jurisdiction,
    projects
  } = useAppropriateGovernment();

  const [activeCategoryTab, setActiveCategoryTab] = useState('COMMITTEE'); // 'COMMITTEE' | 'SIA_IEG' | 'RNR_AUTHORITY' | 'LARR_AUTHORITY'
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [officialName, setOfficialName] = useState('');
  const [officialDept, setOfficialDept] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [gazetteOrderNo, setGazetteOrderNo] = useState('');
  const [assignedRole, setAssignedRole] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const isCentral = jurisdiction === 'CENTRAL';

  // Menu Access Matrix state: maps menu key to 'NOT_ACCESS' | 'VIEW'
  const [menuMatrix, setMenuMatrix] = useState({
    menu1: 'VIEW',
    menu2: 'VIEW',
    menu3: 'NOT_ACCESS',
    menu4: 'VIEW',
    menu5: 'NOT_ACCESS',
    menu6: 'NOT_ACCESS',
    menu7: 'VIEW',
    menu8: 'NOT_ACCESS',
    menu9: 'NOT_ACCESS',
    menu10: 'NOT_ACCESS'
  });

  const getMenuLabelsForCategory = () => {
    if (activeCategoryTab === 'COMMITTEE') {
      return [
        { key: 'menu1', label: 'Executive Dashboard & Lapsing Radar' },
        { key: 'menu2', label: 'Statutory Project Dossier' },
        { key: 'menu3', label: 'SIA Appraisal Review' },
        { key: 'menu4', label: 'R&R Scheme Oversight' },
        { key: 'menu5', label: 'Financial Escrow & DBT Ledger' },
        { key: 'menu6', label: 'Committee Minutes & Deliberations' },
        { key: 'menu7', label: 'Statutory Gazettes & Orders' }
      ];
    }
    if (activeCategoryTab === 'SIA_IEG') {
      return [
        { key: 'menu1', label: 'SIA Study Inception & Agency Hub' },
        { key: 'menu2', label: 'Baseline Census & Affected Families' },
        { key: 'menu3', label: 'Social Impact Management Plan (SIMP)' },
        { key: 'menu4', label: 'Public Hearing Minutes & Gram Sabha' },
        { key: 'menu5', label: 'Sec 7 Multi-Disciplinary Expert Group' },
        { key: 'menu6', label: 'IEG Evaluation & Recommendation Gate' }
      ];
    }
    if (activeCategoryTab === 'RNR_AUTHORITY') {
      return [
        { key: 'menu1', label: '1. Administrator Dashboard' },
        { key: 'menu2', label: '2. Baseline Survey & PAF Census' },
        { key: 'menu3', label: '3. Draft R&R Scheme Builder' },
        { key: 'menu4', label: '4. Public Hearing & Gram Sabha' },
        { key: 'menu5', label: '5. Resettlement Area Infrastructure' },
        { key: 'menu6', label: '6. SC/ST Special Component Plan' },
        { key: 'menu7', label: '7. Commissioner Submission Gate' },
        { key: 'menu8', label: '8. Commissioner Review & Sanction' },
        { key: 'menu9', label: '9. Approved Scheme Gazette & Vault' },
        { key: 'menu10', label: '10. Appellate & Grievance Bench' }
      ];
    }
    // LARR Authority Judicial Tribunal
    return [
      { key: 'menu1', label: '1. Presiding Officer Judicial Bench' },
      { key: 'menu2', label: '2. Reference Inward Docket (Sec 64 & 76)' },
      { key: 'menu3', label: '3. Cause List & Hearing Calendar' },
      { key: 'menu4', label: '4. Case Proceedings & Evidence Record' },
      { key: 'menu5', label: '5. Compensation Determination Ledger' },
      { key: 'menu6', label: '6. Resettlement Entitlement Dispute Bench' },
      { key: 'menu7', label: '7. Final Award Drafting & Decree Gate' },
      { key: 'menu8', label: '8. Decreed Award Vault & Gazette Sync' },
      { key: 'menu9', label: '9. High Court Appeals Registry (Sec 74)' },
      { key: 'menu10', label: '10. Judicial Audit & Compliance Monitor' }
    ];
  };

  const handleMenuRadioChange = (key, value) => {
    setMenuMatrix(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = (id, link) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateProvisioning = async (e) => {
    e.preventDefault();
    await handleProvisionRbac({
      category: activeCategoryTab,
      committeeType: activeCategoryTab === 'COMMITTEE' ? (isCentral ? 'NMC' : 'SMC') : null,
      role: assignedRole || `${activeCategoryTab} Designated Officer`,
      memberName: officialName,
      department: officialDept,
      designation: assignedRole,
      email: officialEmail,
      gazetteOrderNo: gazetteOrderNo || `GOI-ORD-${Date.now().toString().slice(-4)}`,
      projectId: selectedProjectId,
      menuAccess: menuMatrix
    });

    setOfficialName('');
    setOfficialDept('');
    setOfficialEmail('');
    setGazetteOrderNo('');
  };

  const currentList = rbacAssignments.filter(
    r => r.category === activeCategoryTab && r.jurisdictionType === jurisdiction
  );

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              RBAC Access Control Hub &amp; Downstream Workspace Provisioning
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 7
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Apex Appropriate Government provisioning of downstream roles: NMC, SMC, SIA Agency, IEG Expert Group, R&amp;R Authority &amp; LARR Tribunal
          </p>
        </div>
      </div>

      {/* 4 Category Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveCategoryTab('COMMITTEE')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
            activeCategoryTab === 'COMMITTEE'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. {isCentral ? 'National Monitoring Committee (NMC)' : 'State Monitoring Committee (SMC)'}
        </button>

        <button
          onClick={() => setActiveCategoryTab('SIA_IEG')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
            activeCategoryTab === 'SIA_IEG'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. SIA Agency &amp; IEG 7-Member Expert Group
        </button>

        <button
          onClick={() => setActiveCategoryTab('RNR_AUTHORITY')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
            activeCategoryTab === 'RNR_AUTHORITY'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. R&amp;R Authority (Administrator &amp; Commissioner)
        </button>

        <button
          onClick={() => setActiveCategoryTab('LARR_AUTHORITY')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
            activeCategoryTab === 'LARR_AUTHORITY'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          4. LARR Authority Judicial Tribunal
        </button>
      </div>

      {/* Two-Column Provisioning Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Provisioning Form with Strict Radio Matrix (1 Col) */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3 text-xs">
          <div className="border-b pb-2">
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Provision Downstream Credentials
            </h3>
            <p className="text-[11px] text-slate-500">
              Statutory delegation of powers per RFCTLARR Act Rules
            </p>
          </div>

          <form onSubmit={handleCreateProvisioning} className="space-y-3">
            <div>
              <label className="font-semibold text-slate-700 block pb-1">Statutory Project:</label>
              <select
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white font-medium outline-none"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.id} — {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block pb-1">Officer / Official Name:</label>
              <input
                type="text"
                value={officialName}
                onChange={e => setOfficialName(e.target.value)}
                placeholder="e.g. Dr. Harpreet Kaur, IAS"
                className="w-full p-2 rounded border border-slate-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block pb-1">Department / Organization:</label>
              <input
                type="text"
                value={officialDept}
                onChange={e => setOfficialDept(e.target.value)}
                placeholder="e.g. Department of Land Resources / SIA Agency"
                className="w-full p-2 rounded border border-slate-300 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Official Email:</label>
                <input
                  type="email"
                  value={officialEmail}
                  onChange={e => setOfficialEmail(e.target.value)}
                  placeholder="officer@nic.in"
                  className="w-full p-2 rounded border border-slate-300 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Gazette Order No:</label>
                <input
                  type="text"
                  value={gazetteOrderNo}
                  onChange={e => setGazetteOrderNo(e.target.value)}
                  placeholder="S.O. 102/2025"
                  className="w-full p-2 rounded border border-slate-300 outline-none"
                />
              </div>
            </div>

            {/* Menu-by-Menu Strict Radio Controls */}
            <div className="pt-2 border-t">
              <label className="font-bold text-slate-800 uppercase tracking-wide block pb-1.5 text-[11px]">
                Statutory Menu Access Controls:
              </label>
              <div className="bg-slate-50 p-2 rounded border border-slate-200 divide-y divide-slate-200 max-h-48 overflow-y-auto">
                {getMenuLabelsForCategory().map(menu => {
                  const currentVal = menuMatrix[menu.key] || 'NOT_ACCESS';
                  return (
                    <div key={menu.key} className="py-1.5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-800 font-medium pr-2 truncate" title={menu.label}>
                        {menu.label}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`radio-${menu.key}`}
                            value="NOT_ACCESS"
                            checked={currentVal === 'NOT_ACCESS'}
                            onChange={() => handleMenuRadioChange(menu.key, 'NOT_ACCESS')}
                            className="accent-rose-600"
                          />
                          <span className={`text-[10px] font-semibold ${currentVal === 'NOT_ACCESS' ? 'text-rose-700 font-bold' : 'text-slate-500'}`}>
                            [ Not Access ]
                          </span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`radio-${menu.key}`}
                            value="VIEW"
                            checked={currentVal === 'VIEW'}
                            onChange={() => handleMenuRadioChange(menu.key, 'VIEW')}
                            className="accent-emerald-600"
                          />
                          <span className={`text-[10px] font-semibold ${currentVal === 'VIEW' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                            [ View ]
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Key className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Issue Credentials &amp; Provision Workspace</span>
            </button>
          </form>
        </div>

        {/* Right: Active Provisioned Assignments Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Active Provisioned Workspaces &amp; Credential Links ({currentList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Authorized officers receive one-click authenticated workspace access links with non-repudiable audit seals
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Assignment ID</th>
                  <th className="py-2.5 px-3">Officer / Official</th>
                  <th className="py-2.5 px-3">Role &amp; Department</th>
                  <th className="py-2.5 px-3">Order No.</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Access Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {currentList.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {item.id}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-[#1B365D]">{item.memberName}</div>
                      <div className="text-[10px] text-slate-500">{item.email}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{item.role}</div>
                      <div className="text-[10px] text-slate-500">{item.department}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                      {item.gazetteOrderNo}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        PROVISIONED
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleCopy(item.id, item.credentialLoginPlaceholder)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied Link</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-500" />
                            <span>Copy Login Link</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
