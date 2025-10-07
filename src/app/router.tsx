import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { Login } from '../features/auth/Login';
import { Signup } from '../features/auth/Signup';
import { RoleGate } from '../features/auth/RoleGate';

// Student pages
import { StudentDashboard } from '../features/student/Dashboard';
import { InternshipBrowser } from '../features/student/InternshipBrowser';
import { Applications } from '../features/student/Applications';
import { Logbook } from '../features/student/Logbook';
import { Reports } from '../features/student/Reports';
import { Certificates } from '../features/student/Certificates';
import { Profile } from '../features/student/Profile';
import { ProfileSetup } from '../features/student/ProfileSetup';
import { LearningCenter } from '../features/student/LearningCenter';
import { HabitTracker } from '../features/student/HabitTracker';
import { StudyPods } from '../features/student/StudyPods';
import { Notes } from '../features/student/Notes';

// Faculty pages
import { FacultyDashboard } from '../features/faculty/Dashboard';
import { Mentees } from '../features/faculty/Mentees';
import { Approvals } from '../features/faculty/Approvals';
import { CreditPanel } from '../features/faculty/CreditPanel';

// Industry pages
import { IndustryDashboard } from '../features/industry/Dashboard';
import { Postings } from '../features/industry/Postings';
import { Applicants } from '../features/industry/Applicants';

// Admin pages
import { AdminDashboard } from '../features/admin/Dashboard';
import { Colleges } from '../features/admin/Colleges';
import { Companies } from '../features/admin/Companies';
import { Directory } from '../features/admin/Directory';
import { Settings } from '../features/admin/Settings';
import { Verification } from '../features/admin/Verification';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/profile-setup',
    element: <ProfileSetup />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <RoleGate
            student={<StudentDashboard />}
            faculty={<FacultyDashboard />}
            industry={<IndustryDashboard />}
            admin={<AdminDashboard />}
          />
        ),
      },
      // Student routes
      {
        path: 's',
        element: <RoleGate allow={['student']} />,
        children: [
          { path: 'browse', element: <InternshipBrowser /> },
          { path: 'applications', element: <Applications /> },
          { path: 'logbook', element: <Logbook /> },
          { path: 'reports', element: <Reports /> },
          { path: 'certificates', element: <Certificates /> },
          { path: 'learning', element: <LearningCenter /> },
          { path: 'habits', element: <HabitTracker /> },
          { path: 'pods', element: <StudyPods /> },
          { path: 'notes', element: <Notes /> },

        ],
      },
      // Faculty routes
      {
        path: 'f',
        element: <RoleGate allow={['faculty']} />,
        children: [
          { path: 'mentees', element: <Mentees /> },
          { path: 'approvals', element: <Approvals /> },
          { path: 'credits', element: <CreditPanel /> },
        ],
      },
      // Industry routes
      {
        path: 'i',
        element: <RoleGate allow={['industry']} />,
        children: [
          { path: 'postings', element: <Postings /> },
          { path: 'applicants', element: <Applicants /> },
        ],
      },
      // Admin routes
      {
        path: 'a',
        element: <RoleGate allow={['admin']} />,
        children: [
          { path: 'colleges', element: <Colleges /> },
          { path: 'companies', element: <Companies /> },
          { path: 'directory', element: <Directory /> },
          { path: 'verification', element: <Verification /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
]);