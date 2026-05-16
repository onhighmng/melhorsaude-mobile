"use client";

import React from 'react';
// DISABLED: import from 'react-router-dom';
import desktopLogo from '@/assets/melhor-saude-logo.png';
import mobileLogo from '@/assets/mobile-navbar-logo.png';

const AnimatedNavLink = ({ href, children, onClick, isOverWhite }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; isOverWhite?: boolean }) => {
  const defaultTextColor = isOverWhite ? 'text-[#3973E1]' : 'text-white';
  const hoverTextColor = isOverWhite ? 'text-[#3973E1]' : 'text-white';
  // Using font-inter and font-semibold directly
  const textSizeClass = 'text-base font-inter font-semibold';

  return (
    <a href={href} onClick={onClick} className={`group relative block overflow-hidden h-6 ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
        <span className={`block h-6 leading-6 ${defaultTextColor}`}>{children}</span>
        <span className={`block h-6 leading-6 ${hoverTextColor} ${isOverWhite ? 'drop-shadow-[0_0_8px_rgba(57,115,225,0.6)]' : 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`}>{children}</span>
      </div>
    </a>
  );
};

// Pillars data for dropdown
const pillarsData = [
  { id: 0, title: "Saúde Mental" },
  { id: 1, title: "Bem-estar Físico" },
  { id: 2, title: "Assistência Financeira" },
  { id: 3, title: "Assistência Jurídica" },
];

interface NavbarProps {
  onPillarClick?: (index: number) => void;
  onAboutClick?: () => void;
}

export function Navbar({ onPillarClick, onAboutClick }: NavbarProps = {}) {
  const navigate = useNavigate();

  // Defines the content to navigate to login/register for now as requested
  const logoElement = (
    <img
      src={desktopLogo}
      alt="Melhor Saúde Logo"
      className="h-10 w-auto object-contain"
    />
  );

  const loginButtonElement = (
    <button
      onClick={() => navigate('/login')}
      className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-blue-400/30 bg-blue-900/20 text-[rgb(57,115,225)] rounded-full hover:border-blue-300/50 hover:text-white hover:bg-blue-800/30 transition-colors duration-200 w-full sm:w-auto bg-[rgb(255,255,255)]"
    >
      Entrar
    </button>
  );

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full
                    hidden sm:block
                    bg-blue-400
                    opacity-40 filter blur-lg pointer-events-none
                    transition-all duration-300 ease-out
                    group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
      <button
        onClick={() => navigate('/register')}
        className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-br from-[#3973E1] to-[#285ec4] rounded-full hover:from-[#285ec4] hover:to-[#1e4a9a] transition-all duration-200 w-full sm:w-auto"
      >
        Registar
      </button>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                      flex flex-col items-center
                      pl-6 pr-6 py-3 backdrop-blur-xl
                      rounded-full
                      border border-white/20 bg-white/10
                      w-[calc(100%-2rem)] sm:w-auto
                      transition-[border-radius] duration-0 ease-in-out shadow-lg shadow-black/5`}>

      <div className="flex items-center justify-between w-full gap-x-8 sm:gap-x-12">
        {/* Desktop Logo */}
        <div className="hidden lg:block">
          {logoElement}
        </div>

        <nav className="hidden lg:flex items-center gap-8 mx-auto">
          {/* Sobre Nós */}
          <AnimatedNavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onAboutClick) onAboutClick();
            }}
            isOverWhite={false}
          >
            Sobre Nós
          </AnimatedNavLink>

          {/* 4 Pilares Dropdown */}
          <div className="relative group h-full flex items-center justify-center">
            <div className="flex items-center gap-1 cursor-pointer transition-all py-4 text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              <span className="text-base font-inter font-semibold">4 Pilares</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-180">
                <path d="M1 1L5 5L9 1" />
              </svg>
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-[260px] hidden group-hover:block">
              <div className="bg-white rounded-[16px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 flex flex-col gap-1 mt-2">
                {pillarsData.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="px-4 py-3 hover:bg-gray-50 rounded-[12px] cursor-pointer group/item flex items-center gap-3 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onPillarClick) onPillarClick(pillar.id);
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3973E1] opacity-40 group-hover/item:opacity-100 transition-opacity" />
                    <span className="text-[#444] group-hover/item:text-[#222] text-[15px] font-inter font-medium transition-colors">{pillar.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agendamento */}
          <AnimatedNavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            isOverWhite={false}
          >
            Agendamento
          </AnimatedNavLink>

          {/* Minha Saúde */}
          <AnimatedNavLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            isOverWhite={false}
          >
            Minha Saúde
          </AnimatedNavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-2 sm:gap-3">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        {/* Mobile View: Logo + Buttons */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <img
            src={mobileLogo}
            alt="Melhor Saúde"
            className="h-10 w-auto object-contain"
          />
          <div className="flex items-center gap-2">
            {loginButtonElement}
            {signupButtonElement}
          </div>
        </div>
      </div>


    </header>
  );
}
