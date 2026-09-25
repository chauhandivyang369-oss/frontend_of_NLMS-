import React, { useState } from 'react';
import { WorkspaceProvider } from './contexts/WorkspaceContext.jsx';
import RequisitioningBodyLayout from './layouts/RequisitioningBodyLayout.jsx';
import PolicyMakerLayout from './layouts/PolicyMakerLayout.jsx';
import SiaIegLayout from './layouts/SiaIegLayout.jsx';
import RRAuthorityWorkspace from './workspaces/rr-authority/RRAuthorityWorkspace.jsx';
import LarrAuthorityWorkspace from './workspaces/larr-authority/LarrAuthorityWorkspace.jsx';
import AppropriateGovernmentWorkspace from './workspaces/appropriate-government/AppropriateGovernmentWorkspace.jsx';
import DistrictCollectorWorkspace from './workspaces/district-collector/DistrictCollectorWorkspace.jsx';
import CitizenWorkspace from './workspaces/citizen/CitizenWorkspace.jsx';

export default function App() {
  // Can be 'district-collector', 'citizen', 'appropriate-government', 'central-appropriate-gov', 'state-appropriate-gov', 'larr-authority', 'rr-authority', 'sia-ieg', 'policy-maker', 'requiring-body'
  const [currentWorkspace, setCurrentWorkspace] = useState('district-collector');

  if (currentWorkspace === 'citizen' || currentWorkspace === 'citizen-transparency') {
    return (
      <CitizenWorkspace
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)}
      />
    );
  }

  if (currentWorkspace === 'district-collector') {
    return (
      <DistrictCollectorWorkspace
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)}
      />
    );
  }

  if (currentWorkspace === 'central-appropriate-gov' || currentWorkspace === 'appropriate-government') {
    return (
      <AppropriateGovernmentWorkspace
        initialJurisdiction="CENTRAL"
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)}
      />
    );
  }

  if (currentWorkspace === 'state-appropriate-gov') {
    return (
      <AppropriateGovernmentWorkspace
        initialJurisdiction="STATE"
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)}
      />
    );
  }

  if (currentWorkspace === 'larr-authority') {
    return (
      <LarrAuthorityWorkspace 
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)} 
      />
    );
  }

  if (currentWorkspace === 'rr-authority') {
    return (
      <RRAuthorityWorkspace 
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)} 
      />
    );
  }

  if (currentWorkspace === 'sia-ieg') {
    return (
      <SiaIegLayout 
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)} 
      />
    );
  }

  if (currentWorkspace === 'policy-maker') {
    return (
      <PolicyMakerLayout 
        onSwitchToRequiringBody={() => setCurrentWorkspace('requiring-body')} 
        onSwitchToSiaIeg={() => setCurrentWorkspace('sia-ieg')}
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)}
      />
    );
  }

  return (
    <WorkspaceProvider>
      <RequisitioningBodyLayout 
        onSwitchToPolicyMaker={() => setCurrentWorkspace('policy-maker')} 
        onSwitchToSiaIeg={() => setCurrentWorkspace('sia-ieg')}
        onSwitchWorkspace={(ws) => setCurrentWorkspace(ws)}
      />
    </WorkspaceProvider>
  );
}

