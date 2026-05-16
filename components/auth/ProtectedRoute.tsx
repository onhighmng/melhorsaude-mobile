import { ReactNode, useEffect, useState } from 'react';
// DISABLED: import from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { loadingAnimationConfig } from '@/components/LoadingAnimationConfig';
import type { UserRole } from '@/types/database.types';

interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * Required user role to access this route.
   * - 'user': Regular employee users
   * - 'company_admin': Company HR/admin users
   * - 'specialist': Healthcare specialists
   * - 'admin': Platform administrators
   */
  requiredRole?: UserRole | UserRole[];
  /**
   * If true, only authenticated users need to access (no specific role required)
   */
  requireAuth?: boolean;
}

/**
 * ProtectedRoute Component
 *
 * Wraps routes that require authentication and/or specific roles.
 * Prevents unauthorized access to dashboards and sensitive pages.
 *
 * @example
 * // Require authentication only
 * <ProtectedRoute requireAuth>
 *   <UserDashboard />
 * </ProtectedRoute>
 *
 * @example
 * // Require specific role
 * <ProtectedRoute requiredRole="admin">
 *   <AdminDashboard />
 * </ProtectedRoute>
 *
 * @example
 * // Allow multiple roles
 * <ProtectedRoute requiredRole={['company_admin', 'admin']}>
 *   <CompanyManagement />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  requiredRole,
  requireAuth = true
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give auth context time to load
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading while checking authentication
  if (loading || isChecking) {
    return (
      <LoadingAnimation
        variant="fullscreen"
        message="Verificando permissões..."
        submessage="Aguarde um momento"
        mascotSrc={loadingAnimationConfig.mascot}
        wordmarkSrc={loadingAnimationConfig.wordmark}
        primaryColor={loadingAnimationConfig.primaryColor}
        textColor={loadingAnimationConfig.textColor}
        showProgress={true}
      />
    );
  }

  // Check if user is authenticated
  if (requireAuth && !user) {
    // Redirect to login, save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if specific role is required — skip if profile not yet loaded or role is null
  if (requiredRole && profile && profile.primary_role) {
    const userRole = profile.primary_role;
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on their actual role
      const redirectPath = getRoleBasedRedirect(userRole);
      return <Navigate to={redirectPath} replace />;
    }
  }

  // User is authenticated and has the required role
  return <>{children}</>;
}

/**
 * Helper function to redirect users to their appropriate dashboard
 */
function getRoleBasedRedirect(role: UserRole): string {
  const roleRedirects: Record<UserRole, string> = {
    user: '/user/dashboard',
    company_admin: '/company/dashboard',
    specialist: '/specialist/dashboard',
    admin: '/admin/dashboard'
  };

  return roleRedirects[role] || '/';
}
