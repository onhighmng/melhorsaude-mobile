import React, { useState } from 'react';
// DISABLED: import from 'react-router-dom';
import MobileMenu from './MobileMenu';
import DesktopMenu from './navigation/DesktopMenu';
import NavigationActions from './navigation/NavigationActions';
import { createMenuItems, createMobileMenuItems } from './navigation/menuData';
import { useAuth } from '@/contexts/AuthContext';
import mobileLogo from '@/assets/mobile-navbar-logo.png';
import desktopLogo from '@/assets/melhor-saude-logo.png';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setActiveDropdown(null);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSobreNosClick = () => {
    setActiveDropdown(null);
    // Scroll to about section
    const sobreNosSection = document.getElementById('sobre-nos');
    if (sobreNosSection) {
      sobreNosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePillarClick = (pillarIndex: number) => {
    setActiveDropdown(null);
    // Scroll to pillar section
    const pillarSection = document.getElementById('pillars');
    if (pillarSection) {
      pillarSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = createMenuItems(handleSobreNosClick, handlePillarClick, handleNavigation, !!user, handleLogoutClick);
  const mobileMenuItems = createMobileMenuItems(!!user, handleLogoutClick, handleSobreNosClick, handlePillarClick);

  return (
    <>
      <nav className="fixed top-2 left-0 right-0 z-50 w-full max-w-none">
        <div className="relative z-50 w-full max-w-[1500px] mx-auto px-2 sm:px-8 my-0 py-0">
          {/* Unified Glass Morphism Container */}
          <div className="flex items-center justify-between h-[60px] sm:h-[72px] px-2 sm:px-8 glass-effect rounded-xl shadow-custom-md hover:shadow-custom-lg transition-smooth">

            {/* Logo Section */}
            <button
              className="flex items-center cursor-pointer press-effect transition-smooth bg-transparent border-none p-0"
              onClick={handleLogoClick}
              type="button"
              aria-label="Voltar para a página inicial"
            >
              <img
                src={mobileLogo}
                alt="Melhor Saúde"
                className="h-8 w-auto md:hidden"
              />
              <img
                src={desktopLogo}
                alt="Melhor Saúde"
                className="hidden md:block h-10 w-auto"
              />
            </button>

            {/* Center Navigation */}
            <DesktopMenu
              menuItems={menuItems}
              activeDropdown={activeDropdown}
              onDropdownToggle={handleDropdownToggle}
              onNavigation={handleNavigation}
            />

            {/* Right Side Actions */}
            <NavigationActions
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
              onLogoutClick={handleLogoutClick}
              isAuthenticated={!!user}
              user={user ? { name: profile?.full_name || 'Utilizador', email: user.email || '' } : null}
            />
          </div>
        </div>

        {/* Click outside to close dropdowns */}
        {activeDropdown && (
          <button
            type="button"
            className="fixed inset-0 z-40 w-full h-full bg-transparent border-0 cursor-default"
            onClick={() => setActiveDropdown(null)}
            aria-label="Close dropdown"
            tabIndex={-1}
          />
        )}
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={mobileMenuItems}
      />
    </>
  );
};

export default Navigation;
