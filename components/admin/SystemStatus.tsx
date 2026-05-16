import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertCircle, CheckCircle2, Database, Server, Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAppVersion, isDevelopment } from '@/lib/envValidation';

/**
 * System Status Component
 *
 * Displays health and status information for:
 * - Supabase connection
 * - Database connectivity
 * - Error monitoring (Sentry)
 * - Application version
 * - Environment info
 */

interface HealthCheck {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  message: string;
  responseTime?: number;
  icon: React.ReactNode;
}

export default function SystemStatus() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  const checkSupabaseConnection = async (): Promise<HealthCheck> => {
    const startTime = Date.now();

    try {
      const { error } = await supabase.from('profiles').select('id').limit(1);
      const responseTime = Date.now() - startTime;

      if (error) {
        return {
          service: 'Supabase Database',
          status: 'down',
          message: `Connection failed: ${error.message}`,
          responseTime,
          icon: <Database className="w-5 h-5" />,
        };
      }

      return {
        service: 'Supabase Database',
        status: responseTime > 1000 ? 'degraded' : 'healthy',
        message:
          responseTime > 1000
            ? `Slow response (${responseTime}ms)`
            : `Connected (${responseTime}ms)`,
        responseTime,
        icon: <Database className="w-5 h-5" />,
      };
    } catch (err) {
      return {
        service: 'Supabase Database',
        status: 'down',
        message: 'Connection failed',
        icon: <Database className="w-5 h-5" />,
      };
    }
  };

  const checkSupabaseAuth = async (): Promise<HealthCheck> => {
    const startTime = Date.now();

    try {
      const { data, error } = await supabase.auth.getSession();
      const responseTime = Date.now() - startTime;

      if (error) {
        return {
          service: 'Supabase Auth',
          status: 'down',
          message: `Auth error: ${error.message}`,
          responseTime,
          icon: <Server className="w-5 h-5" />,
        };
      }

      return {
        service: 'Supabase Auth',
        status: 'healthy',
        message: data.session ? 'Session active' : 'Auth available',
        responseTime,
        icon: <Server className="w-5 h-5" />,
      };
    } catch (err) {
      return {
        service: 'Supabase Auth',
        status: 'down',
        message: 'Auth check failed',
        icon: <Server className="w-5 h-5" />,
      };
    }
  };

  const checkSentryStatus = (): HealthCheck => {
    const sentryDsn = process.env.VITE_SENTRY_DSN;

    if (!sentryDsn) {
      return {
        service: 'Sentry Error Monitoring',
        status: isDevelopment() ? 'degraded' : 'down',
        message: 'Not configured',
        icon: <Activity className="w-5 h-5" />,
      };
    }

    return {
      service: 'Sentry Error Monitoring',
      status: 'healthy',
      message: 'Configured and active',
      icon: <Activity className="w-5 h-5" />,
    };
  };

  const runHealthChecks = async () => {
    setLoading(true);

    const checks = await Promise.all([
      checkSupabaseConnection(),
      checkSupabaseAuth(),
      Promise.resolve(checkSentryStatus()),
    ]);

    setHealthChecks(checks);
    setLastCheck(new Date());
    setLoading(false);
  };

  useEffect(() => {
    runHealthChecks();

    // Auto-refresh every 30 seconds
    const interval = setInterval(runHealthChecks, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50';
      case 'down':
        return 'text-red-600 bg-red-50';
    }
  };

  const getStatusIcon = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'degraded':
      case 'down':
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const overallStatus =
    healthChecks.some((check) => check.status === 'down')
      ? 'down'
      : healthChecks.some((check) => check.status === 'degraded')
      ? 'degraded'
      : 'healthy';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1a1a1a]">System Status</h1>
          <p className="text-slate-grey mt-1">
            Monitor system health and connectivity
          </p>
        </div>

        <Badge variant={overallStatus === 'healthy' ? 'default' : 'destructive'}>
          {overallStatus === 'healthy'
            ? 'All Systems Operational'
            : overallStatus === 'degraded'
            ? 'Degraded Performance'
            : 'System Issues Detected'}
        </Badge>
      </div>

      {/* System Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Application metadata and environment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-grey">Version</p>
              <p className="text-lg font-semibold text-[#1a1a1a]">{getAppVersion()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-grey">Environment</p>
              <p className="text-lg font-semibold text-[#1a1a1a]">
                {isDevelopment() ? 'Development' : 'Production'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-grey">Last Check</p>
              <p className="text-lg font-semibold text-[#1a1a1a] flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {lastCheck.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && healthChecks.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ) : (
          healthChecks.map((check, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {check.icon}
                    <CardTitle className="text-base">{check.service}</CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(check.status)} border-0`}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(check.status)}
                      <span className="capitalize">{check.status}</span>
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-grey">{check.message}</p>
                {check.responseTime !== undefined && (
                  <p className="text-xs text-slate-grey mt-2">
                    Response time: {check.responseTime}ms
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={runHealthChecks}
          disabled={loading}
          className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>
    </div>
  );
}
