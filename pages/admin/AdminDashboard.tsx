import { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { DashboardContent } from '@/components/admin/DashboardContent';
import { UsersManagement } from '@/components/admin/UsersManagement';
import { Sessions } from '@/components/admin/Sessions';
import { Resources } from '@/components/admin/Resources';

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardContent onNavigate={(page) => setActiveSection(page)} />;
            case 'users':
                return <UsersManagement />;
            case 'sessions':
                return <Sessions />;
            case 'resources':
                return <Resources />;
            default:
                return <DashboardContent onNavigate={(page) => setActiveSection(page)} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                currentPage={activeSection as 'dashboard' | 'users' | 'sessions' | 'resources'}
                onPageChange={(page) => setActiveSection(page)}
            />
            <main className="flex-1 lg:pl-20 hover:lg:pl-60 transition-all duration-300">
                <div className="pt-0">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
