import React from 'react';
import { ChevronDown } from 'lucide-react';
import { MenuItem } from './types';
import PillarDropdown from './PillarDropdown';

interface DesktopMenuProps {
  menuItems: MenuItem[];
  activeDropdown: string | null;
  onDropdownToggle: (dropdown: string) => void;
  onNavigation: (path: string) => void;
}

const DesktopMenu = ({ menuItems, activeDropdown, onDropdownToggle, onNavigation }: DesktopMenuProps) => {
  const [localActiveDropdown, setLocalActiveDropdown] = React.useState<string | null>(null);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  const handleAuthRedirect = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  const handleDropdownItemClick = (itemOnClick?: () => void) => {
    if (itemOnClick) {
      itemOnClick();
    }
    setLocalActiveDropdown(null);
  };

  const toggleDropdown = (key: string) => {
    setLocalActiveDropdown(localActiveDropdown === key ? null : key);
  };

  React.useEffect(() => {
    if (!localActiveDropdown) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setLocalActiveDropdown(null);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [localActiveDropdown]);

  const mobileMenuItems = menuItems.filter(item => item.key === 'sobre' || item.key === 'pilares');

  return (
    <div className="flex items-center gap-4">
      {/* Minimal mobile buttons */}
      <div className="flex lg:hidden items-center gap-3">
        <img
          src="/lovable-uploads/18286dba-299d-452d-b21d-2860965d5785.png"
          alt="Melhor Saúde"
          className="h-7 w-auto drop-shadow-sm"
          loading="lazy"
        />
        {mobileMenuItems.map((item) =>
          item.key === 'pilares' ? (
            <PillarDropdown key={item.key} />
          ) : (
            <button
              key={item.key}
              onClick={() => handleMenuItemClick(item)}
              className="text-sm font-medium px-3 py-2 rounded-lg bg-white/40 backdrop-blur hover:bg-white/60 transition-colors"
            >
              {item.title}
            </button>
          )
        )}
      </div>

      {/* Full desktop navigation */}
      <div className="hidden lg:flex items-center gap-6 overflow-visible">
        {menuItems.map((item) => (
          <div key={item.key} className="relative dropdown-container">
            {item.key === 'pilares' ? (
              <PillarDropdown />
            ) : item.hasDropdown && item.items ? (
              <div className="relative overflow-visible">
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.key)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-navy-blue hover:text-bright-royal transition-colors duration-200"
                  aria-expanded={localActiveDropdown === item.key}
                  aria-haspopup="true"
                >
                  <span>{item.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${localActiveDropdown === item.key ? 'rotate-180' : ''}`} />
                </button>

                {localActiveDropdown === item.key && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-visible"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-2">
                      {item.items.map((dropdownItem, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDropdownItemClick(dropdownItem.onClick)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 border-none bg-transparent"
                        >
                          {dropdownItem.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !item.hasDropdown ? (
              <button
                onClick={() => handleMenuItemClick(item)}
                className="text-navy-blue hover:text-bright-royal transition-colors duration-200 font-medium h-10 px-4 rounded-lg hover:bg-white/20 flex items-center justify-center"
              >
                {item.title}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopMenu;