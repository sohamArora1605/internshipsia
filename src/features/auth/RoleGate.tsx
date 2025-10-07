import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores/useUser';
import type { Role } from '../../core/models';

interface RoleGateProps {
  allow?: Role[];
  student?: React.ReactNode;
  faculty?: React.ReactNode;
  industry?: React.ReactNode;
  admin?: React.ReactNode;
  children?: React.ReactNode;
}

export function RoleGate({ allow, student, faculty, industry, admin, children }: RoleGateProps) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific role components are provided, render based on user role
  if (student || faculty || industry || admin) {
    switch (user.role) {
      case 'student':
        return student ? <>{student}</> : <Navigate to="/login" replace />;
      case 'faculty':
        return faculty ? <>{faculty}</> : <Navigate to="/login" replace />;
      case 'industry':
        return industry ? <>{industry}</> : <Navigate to="/login" replace />;
      case 'admin':
        return admin ? <>{admin}</> : <Navigate to="/login" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // If allow array is provided, check if user role is allowed
  if (allow && !allow.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}