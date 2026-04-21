import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ChangePasswordPage } from './pages/auth/ChangePasswordPage';

// Étudiant pages
import { EtudiantDashboard } from './pages/etudiant/Dashboard';
import { EtudiantPFE } from './pages/etudiant/PFE';
import { EtudiantTaches } from './pages/etudiant/Taches';
import { EtudiantMessagerie } from './pages/etudiant/Messagerie';
import { EtudiantReunions } from './pages/etudiant/Reunions';
import { EtudiantProfil } from './pages/etudiant/Profil';
import { EtudiantAssistantIA } from './pages/etudiant/AssistantIA';

// Encadrant pages
import { EncadrantDashboard } from './pages/encadrant/Dashboard';
import { EncadrantEtudiants } from './pages/encadrant/Etudiants';
import { EncadrantValidation } from './pages/encadrant/Validation';
import { EncadrantReunions } from './pages/encadrant/Reunions';
import { EncadrantMessagerie } from './pages/encadrant/Messagerie';
import { EncadrantProfil } from './pages/encadrant/Profil';
import { EncadrantEtudiantDetail } from './pages/encadrant/EtudiantDetail';

// Responsable pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminComptes } from './pages/admin/Comptes';
import { AdminAffectations } from './pages/admin/Affectations';
import { AdminSupervision } from './pages/admin/Supervision';
import { AdminProfil } from './pages/admin/Profil';

// Directeur pages
import { DirecteurDashboard } from './pages/directeur/Dashboard';
import { DirecteurProfil } from './pages/directeur/Profil';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Étudiant routes
      { path: 'etudiant/dashboard', element: <EtudiantDashboard /> },
      { path: 'etudiant/pfe', element: <EtudiantPFE /> },
      { path: 'etudiant/taches', element: <EtudiantTaches /> },
      { path: 'etudiant/assistant-ia', element: <EtudiantAssistantIA /> },
      { path: 'etudiant/messagerie', element: <EtudiantMessagerie /> },
      { path: 'etudiant/reunions', element: <EtudiantReunions /> },
      { path: 'etudiant/profil', element: <EtudiantProfil /> },

      // Encadrant routes
      { path: 'encadrant/dashboard', element: <EncadrantDashboard /> },
      { path: 'encadrant/etudiants', element: <EncadrantEtudiants /> },
      { path: 'encadrant/etudiants/:id', element: <EncadrantEtudiantDetail /> },
      { path: 'encadrant/validation', element: <EncadrantValidation /> },
      { path: 'encadrant/reunions', element: <EncadrantReunions /> },
      { path: 'encadrant/messagerie', element: <EncadrantMessagerie /> },
      { path: 'encadrant/profil', element: <EncadrantProfil /> },

      // Admin routes
      { path: 'admin/dashboard', element: <AdminDashboard /> },
      { path: 'admin/comptes', element: <AdminComptes /> },
      { path: 'admin/affectations', element: <AdminAffectations /> },
      { path: 'admin/supervision', element: <AdminSupervision /> },
      { path: 'admin/profil', element: <AdminProfil /> },

      // Directeur routes
      { path: 'directeur/dashboard', element: <DirecteurDashboard /> },
      { path: 'directeur/profil', element: <DirecteurProfil /> },

      // Default redirect
      { index: true, element: <EtudiantDashboard /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'change-password', element: <ChangePasswordPage /> },
    ],
  },
]);
