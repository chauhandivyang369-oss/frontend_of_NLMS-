import React, { useState } from 'react';
import { WorkspaceProvider } from './contexts/WorkspaceContext.jsx';
import LandingPage from './components/public/LandingPage.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import SignUpPage from './components/auth/SignUpPage.jsx';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage.jsx';
import RequisitioningBodyLayout from './layouts/RequisitioningBodyLayout.jsx';
import PolicyMakerLayout from './layouts/PolicyMakerLayout.jsx';
import SiaIegLayout from './layouts/SiaIegLayout.jsx';
import RRAuthorityWorkspace from './workspaces/rr-authority/RRAuthorityWorkspace.jsx';
import LarrAuthorityWorkspace from './workspaces/larr-authority/LarrAuthorityWorkspace.jsx';
import AppropriateGovernmentWorkspace from './workspaces/appropriate-government/AppropriateGovernmentWorkspace.jsx';
import DistrictCollectorWorkspace from './workspaces/district-collector/DistrictCollectorWorkspace.jsx';
import CitizenWorkspace from './workspaces/citizen/CitizenWorkspace.jsx';

export default function App() {
  // Can be 'landing', 'login', 'signup', 'forgot-password', 'district-collector', 'citizen', 'appropriate-government', 'central-appropriate-gov', 'state-appropriate-gov', 'larr-authority', 'rr-authority', 'sia-ieg', 'policy-maker', 'requiring-body'
  const [currentWorkspace, setCurrentWorkspace] = useState('landing');
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [activeUserSession, setActiveUserSession] = useState(null);

  // 1. DEDICATED FULL LOGIN PAGE (Section 3)
  if (currentWorkspace === 'login') {
    return (
      <LoginPage
        initialEmail={prefilledEmail}
        onLoginSuccess={(targetWorkspaceKey, userProfile) => {
          setActiveUserSession(userProfile);
          setCurrentWorkspace(targetWorkspaceKey);
        }}
        onSwitchToSignUp={() => setCurrentWorkspace('signup')}
        onOpenForgotPassword={() => setCurrentWorkspace('forgot-password')}
        onBackToHome={() => setCurrentWorkspace('landing')}
      />
    );
  }

  // 2. DEDICATED FULL SIGN-UP PAGE (Section 5)
  if (currentWorkspace === 'signup') {
    return (
      <SignUpPage
        onSwitchToLogin={() => setCurrentWorkspace('login')}
        onRegistrationSuccess={(registeredEmail) => {
          setPrefilledEmail(registeredEmail);
          setCurrentWorkspace('login');
        }}
        onBackToHome={() => setCurrentWorkspace('landing')}
      />
    );
  }

  // 3. DEDICATED FULL FORGOT PASSWORD PAGE (Section 4)
  if (currentWorkspace === 'forgot-password') {
    return (
      <ForgotPasswordPage
        onBackToLogin={() => setCurrentWorkspace('login')}
        onResetSuccess={(recoveredEmail) => {
          setPrefilledEmail(recoveredEmail);
          setCurrentWorkspace('login');
        }}
        onBackToHome={() => setCurrentWorkspace('landing')}
      />
    );
  }

  // 4. PUBLIC LANDING PAGE
  if (currentWorkspace === 'landing') {
    return (
      <LandingPage
        onLaunchWorkspace={(ws) => setCurrentWorkspace(ws)}
        onOpenLogin={() => setCurrentWorkspace('login')}
        onOpenSignUp={() => setCurrentWorkspace('signup')}
      />
    );
  }

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

