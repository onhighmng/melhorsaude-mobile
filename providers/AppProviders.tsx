import React from 'react';
// DISABLED: import from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { SpecialistProvider } from '@/contexts/SpecialistContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { MoodProvider } from '@/contexts/MoodContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { SkipLink } from '@/components/ui/accessibility';

import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { PerformanceMonitor } from '@/components/ui/performance-monitor';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <TooltipProvider>
            <BrowserRouter>
                <AuthProvider>
                    <LanguageProvider>
                        <CompanyProvider>
                            <SpecialistProvider>
                                <AdminProvider>
                                    <ErrorBoundary>
                                        <SkipLink />
                                        <Toaster />
                                        <Sonner />
                                        <MoodProvider>
                                            {children}
                                        </MoodProvider>

                                        <PWAInstallPrompt />
                                        <PerformanceMonitor />
                                    </ErrorBoundary>
                                </AdminProvider>
                            </SpecialistProvider>
                        </CompanyProvider>
                    </LanguageProvider>
                </AuthProvider>
            </BrowserRouter>
        </TooltipProvider>
    );
};
