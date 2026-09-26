import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Landmark, 
  MapPin, 
  Briefcase, 
  Users, 
  Scale, 
  Settings, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Compass,
  FileText
} from 'lucide-react';

export default function RbacRoleDirectorySection({
  onLaunchWorkspace
}) {
  const [activeGroup, setActiveGroup] = useState('central'); // central, state, district, requiring-body, citizen, tribunal, admin

  const roleGroups = [
    {
      id: 'central',
      name: 'Role Group 1: Central',
      authority: 'Central Appropriate Government',
      level: 'National Level Oversight & Policy',
      actSection: 'Section 48, Section 49, National Corridors',
      icon: Landmark,
      color: 'border-blue-600 bg-blue-50/50',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'National monitoring, policy formulation, multi-state linear infrastructure sanction, and central fiscal oversight under RFCTLARR Act 2013.',
      targetWorkspace: 'central-appropriate-gov',
      designations: [
        {
          id: 1,
          name: 'NMC Member',
          fullTitle: 'National Monitoring Committee Member',
          mandate: 'Reviews implementation of R&R schemes across Central ministries (Sec 48).',
          powers: 'Statutory Review of R&R Schemes, Multi-State Infrastructure Oversight',
          workspaceKey: 'central-appropriate-gov'
        },
        {
          id: 2,
          name: 'Nodal Officer',
          fullTitle: 'Central Nodal Officer (Land Resources)',
          mandate: 'Coordinates inter-ministerial notifications, Section 11 & 19 Gazette approvals.',
          powers: 'Gazette Scrutiny, In-Principle Project Sanctions, SLA Escalations',
          workspaceKey: 'central-appropriate-gov'
        },
        {
          id: 3,
          name: 'Finance Director',
          fullTitle: 'Director of Project & Escrow Finance',
          mandate: 'Oversees 100% Escrow deposit commitments by Central Requisitioning Bodies.',
          powers: 'Treasury Verification, PFMS DBT Authorizations, Contingency Sanctions',
          workspaceKey: 'policy-maker'
        }
      ]
    },
    {
      id: 'state',
      name: 'Role Group 2: State',
      authority: 'State Appropriate Government',
      level: 'State Level Statutory Supervision & R&R',
      actSection: 'Section 43, 44, 45, 51 & State Rules',
      icon: Building2,
      color: 'border-emerald-600 bg-emerald-50/50',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'State statutory notifications, Independent Expert Group (IEG) evaluation, R&R Commissioner scheme sanctions, and revenue records harmonization.',
      targetWorkspace: 'state-appropriate-gov',
      designations: [
        {
          id: 4,
          name: 'Principal Secretary / Revenue',
          fullTitle: 'Principal Secretary (Revenue & Disaster Management)',
          mandate: 'Statutory head for Section 11 Preliminary and Section 19 Declarations in the State Gazette.',
          powers: 'Statutory Gazette Issue, District Collector Delegation, Section 10 Food Security Exceptions',
          workspaceKey: 'state-appropriate-gov'
        },
        {
          id: 5,
          name: 'R&R Commissioner',
          fullTitle: 'Commissioner of Rehabilitation & Resettlement',
          mandate: 'Statutory authority under Section 44 for sanctioning R&R schemes and post-acquisition social audits.',
          powers: 'Section 45 Scheme Sanctions, Amenity Milestone Sign-off, Passbook Validation',
          workspaceKey: 'rr-authority'
        },
        {
          id: 6,
          name: 'IEG Reviewer / Expert Group Member',
          fullTitle: 'Independent Expert Group Member (SIA)',
          mandate: 'Evaluates Social Impact Assessment (SIA) study reports and makes statutory recommendations under Section 7.',
          powers: 'Section 7 Independent Appraisal, Public Purpose Evaluation, Consent Verification',
          workspaceKey: 'sia-ieg'
        }
      ]
    },
    {
      id: 'district',
      name: 'Role Group 3: District',
      authority: 'District Collectorate & CALA',
      level: 'Ground Level Land Acquisition Execution',
      actSection: 'Sections 11, 15, 19, 21, 23, 26-30, 31, 38',
      icon: MapPin,
      color: 'border-amber-600 bg-amber-50/50',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Field execution of acquisition: Section 15 hearing dockets, award inquiry under Section 23, 100% Solatium computation, and physical possession taking under Section 38.',
      targetWorkspace: 'district-collector',
      designations: [
        {
          id: 7,
          name: 'District Collector',
          fullTitle: 'District Magistrate & Collector',
          mandate: 'Statutory apex authority in the district under RFCTLARR Act 2013.',
          powers: 'Statutory Award Sealing, Summary Possession (Sec 38), Urgency Clause (Sec 40)',
          workspaceKey: 'district-collector'
        },
        {
          id: 8,
          name: 'Special Land Acquisition Officer (SLAO)',
          fullTitle: 'Special Land Acquisition Officer (SLAO)',
          mandate: 'Conducts Section 21 inquiries, inspects cadastral records, and compiles Form-11 compensation drafts.',
          powers: 'Section 21 Inquiries, Field Verification, Circle Rate Factor Multiplication',
          workspaceKey: 'district-collector'
        },
        {
          id: 9,
          name: 'CALA',
          fullTitle: 'Competent Authority Land Acquisition',
          mandate: 'Statutory designated officer under specialized Acts (NHAI Act, Railways Amendment Act, Metro Railways).',
          powers: 'Adjudication of Linear Corridors, Direct Benefit Transfer Sign-off',
          workspaceKey: 'district-collector'
        },
        {
          id: 10,
          name: 'R&R Administrator',
          fullTitle: 'Administrator for Rehabilitation & Resettlement',
          mandate: 'Statutory field officer under Section 43 responsible for baseline census and drafting R&R schemes.',
          powers: 'Drafting R&R Scheme (Sec 43), Resettlement Colony Allotment, Subsistence Distribution',
          workspaceKey: 'rr-authority'
        },
        {
          id: 11,
          name: 'SIA Study Officer / SIA Lead',
          fullTitle: 'Social Impact Assessment Study Officer',
          mandate: 'Conducts mandatory baseline census and public hearings under Section 4 & 5.',
          powers: 'Household Census Collection, Public Hearing Minute Sealing, SIMP Preparation',
          workspaceKey: 'sia-ieg'
        },
        {
          id: 12,
          name: 'Revenue Surveyor',
          fullTitle: 'Chief Cadastral Revenue Surveyor',
          mandate: 'Performs electronic total station (ETS) and drone surveys, generates ULPIN polygons.',
          powers: 'Cadastral Boundary Mapping, ULPIN Assignment, Spatial Intersect Calculation',
          workspaceKey: 'district-collector'
        }
      ]
    },
    {
      id: 'requiring-body',
      name: 'Role Group 4: Requiring Body',
      authority: 'Infrastructure Agency / Project Authority',
      level: 'Project Sponsor & Finance',
      actSection: 'Section 3(zb), Form-1 Requisition, Escrow',
      icon: Briefcase,
      color: 'border-purple-600 bg-purple-50/50',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'Project initiation: Form-I requisition filing, GIS corridor alignment upload, 100% Escrow deposit maintenance, and physical possession takeover.',
      targetWorkspace: 'requiring-body',
      designations: [
        {
          id: 13,
          name: 'CPM / Project Director',
          fullTitle: 'Chief Project Manager / Project Director',
          mandate: 'Heads project implementation unit (NHAI, DFCCIL, NHSRCL, NTPC, State PWD).',
          powers: 'Form-I Submission, Cadastral Alignment Finalization, Possession Acceptance',
          workspaceKey: 'requiring-body'
        },
        {
          id: 14,
          name: 'Project Finance Officer',
          fullTitle: 'Project Finance & Escrow Officer',
          mandate: 'Manages multi-crore Escrow funds deposited with District Collectorate for compensation & R&R.',
          powers: 'Escrow Ledger Management, PFMS Batch Approvals, Cost Escalation Tracking',
          workspaceKey: 'requiring-body'
        }
      ]
    },
    {
      id: 'citizen',
      name: 'Role Group 5: Citizen',
      authority: 'Affected Families & Landholders',
      level: 'Public Transparency & Redressal',
      actSection: 'Sections 15, 21, 31, 38 & Second Schedule',
      icon: Users,
      color: 'border-teal-600 bg-teal-50/50',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      description: 'Complete transparency for landowners: file objections within 60 days of Section 11, track compensation breakdown, and view R&R passbook entitlements.',
      targetWorkspace: 'citizen',
      designations: [
        {
          id: 15,
          name: 'Recorded Landowner / Khatedar',
          fullTitle: 'Recorded Titleholder / Landowner (Khatedar)',
          mandate: 'Entitled to Section 26-30 fair compensation (Market Value + 100% Solatium + 12% Interest).',
          powers: 'File Section 15 Objections, Claim DBT Compensation, Review Cadastral Area',
          workspaceKey: 'citizen'
        },
        {
          id: 16,
          name: 'Agricultural Tenant / Affected Person',
          fullTitle: 'Agricultural Tenant / Livelihood Affected Person',
          mandate: 'Entitled to Second Schedule Rehabilitation & Resettlement benefits regardless of land ownership.',
          powers: 'Claim Subsistence Grant, Housing Grant, Artisanal Resettlement Assistance',
          workspaceKey: 'citizen'
        }
      ]
    },
    {
      id: 'tribunal',
      name: 'Role Group 6: Tribunal',
      authority: 'LARR Authority (Judicial Tribunal)',
      level: 'Statutory Judicial Redressal',
      actSection: 'Sections 51 to 74 (LARR Authority)',
      icon: Scale,
      color: 'border-rose-600 bg-rose-50/50',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'Quasi-judicial authority established under Section 51 by State High Court Chief Justice concurrence for adjudicating compensation disputes and references.',
      targetWorkspace: 'larr-authority',
      designations: [
        {
          id: 17,
          name: 'Presiding Officer / Judicial Officer',
          fullTitle: 'Presiding Officer (District Judge Rank)',
          mandate: 'Adjudicates Section 64 reference dockets on compensation enhancement and title disputes.',
          powers: 'Issue Enhancement Decrees (Sec 69), 9% to 15% Penal Interest Orders, RRC Issue',
          workspaceKey: 'larr-authority'
        },
        {
          id: 18,
          name: 'Tribunal Registrar / Docket Clerk',
          fullTitle: 'Registrar & Docket Clerk',
          mandate: 'Maintains daily Cause List, verifies Section 64 reference filings, issues digital summons.',
          powers: 'Daily Cause List Publication, Case Docket Scrutiny, Summons & Notices',
          workspaceKey: 'larr-authority'
        }
      ]
    },
    {
      id: 'admin',
      name: 'Role Group 7: Administration',
      authority: 'Platform Administration & Security',
      level: 'Platform Governance & Audit',
      actSection: 'DILRMP, NIC & CERT-In Compliance',
      icon: Settings,
      color: 'border-slate-700 bg-slate-50',
      badgeColor: 'bg-slate-200 text-slate-900 border-slate-400',
      description: 'System Administration, RBAC Access Control Hub, DSC Key Vault management, and immutable audit logging across all 18 designations.',
      targetWorkspace: 'central-appropriate-gov',
      designations: [
        {
          id: 19,
          name: 'System Administrator / Platform Manager',
          fullTitle: 'National Platform Administrator',
          mandate: 'Configures statutory role matrices, provisions workspace credentials, and monitors API security.',
          powers: 'RBAC Access Control Hub, Credential Dispatch, CERT-In Audit Log Vault',
          workspaceKey: 'central-appropriate-gov'
        }
      ]
    }
  ];

  const currentGroupData = roleGroups.find(g => g.id === activeGroup) || roleGroups[0];

  return (
    <section id="rbac-directory" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B365D]/10 text-[#1B365D] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Centralized RBAC Architecture • 7 Role Groups &amp; 18 Specific Designations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] font-serif mt-2">
            Statutory Role Directory &amp; Workspace Gateway
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Under the RFCTLARR Act 2013, land acquisition workflows are strictly segregated across 7 jurisdictional role groups. Click any group to inspect its statutory mandate and access its live workspace.
          </p>
        </div>

        {/* 7 Role Groups Tabs (Responsive Horizontal Scroll / Grid) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-thin">
          {roleGroups.map((group) => {
            const Icon = group.icon;
            const isSelected = activeGroup === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-sans text-xs whitespace-nowrap transition-all cursor-pointer border-t-2 ${
                  isSelected
                    ? 'bg-[#1B365D] text-white border-t-[#C5A059] shadow-md font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-t-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C5A059]' : 'text-slate-500'}`} />
                <span>{group.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Role Group Detailed Panel */}
        <div className="mt-6 bg-[#FAF8F5] border-2 border-[#1B365D]/20 rounded-xl p-6 shadow-sm">
          
          {/* Group Header Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-300">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${currentGroupData.badgeColor}`}>
                  {currentGroupData.authority}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-semibold text-slate-700">{currentGroupData.level}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1B365D] font-serif mt-1">
                {currentGroupData.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                {currentGroupData.description}
              </p>
              <div className="text-xs text-[#C5A059] font-semibold mt-1">
                Legal Basis: {currentGroupData.actSection}
              </div>
            </div>

            {/* Launch Group Workspace Button */}
            <div className="shrink-0">
              <button
                onClick={() => onLaunchWorkspace(currentGroupData.targetWorkspace)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md hover:shadow-lg transition-all border border-[#C5A059]"
              >
                <span>Launch {currentGroupData.authority} Workspace</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>

          {/* Designations Grid under this Role Group */}
          <div className="mt-6">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Official Designations ({currentGroupData.designations.length} Active in System):
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentGroupData.designations.map((desig) => (
                <div 
                  key={desig.id} 
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#1B365D] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-[#1B365D] border border-slate-300">
                        #{desig.id}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active Role
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1B365D] mt-2 font-serif">
                      {desig.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {desig.fullTitle}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {desig.mandate}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="font-semibold text-slate-700">Statutory Powers:</span>
                      <div className="text-slate-600 mt-0.5 text-[10px]">
                        {desig.powers}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onLaunchWorkspace(desig.workspaceKey)}
                      className="text-xs font-bold text-[#1B365D] hover:text-[#C5A059] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Auth Level {desig.id <= 6 ? 'A' : desig.id <= 12 ? 'B' : 'C'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
