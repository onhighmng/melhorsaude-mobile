"use client";

import React, { useState } from 'react';
// DISABLED: import from 'motion/react';
// DISABLED: import from 'react-router-dom';
const imgMelhorSaudeTransparentClean1 = "/landing-assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
const imgMelhorSaudeTransparentLogo1 = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";

interface NavbarProps {
  onPillarClick?: (index: number) => void;
  onAboutClick?: () => void;
}

export function Navbar({ onPillarClick, onAboutClick }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerNavigate = useNavigate();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white shadow-sm overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%',
        backgroundColor: 'white'
      }}
    >
      <div className="w-full bg-white overflow-hidden">
        <div className="relative h-[90px] w-full max-w-[1440px] mx-auto p-[0px] overflow-hidden">
          {/* Default State - New Figma Design - Always visible */}
          <div className="absolute bg-white left-0 top-0 w-full h-[90px] overflow-hidden">
            <div className="absolute h-[71.362px] left-[28px] top-[19px] w-full max-w-[1400px] overflow-hidden">{/* Center - Navigation Links */}
              <div className="absolute content-stretch hidden lg:flex gap-[32px] items-center left-[calc(50%+20.6px)] top-[15px] translate-x-[-50%]">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[20.04px] relative shrink-0 text-[#4278ec] text-[18px] tracking-[-0.18px] whitespace-pre hover:opacity-70 transition-opacity"
                >
                  Início
                </a>

                <div className="relative shrink-0 size-[7.4px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 7.4">
                    <circle cx="3.7" cy="3.7" fill="#050505" r="3.7" />
                  </svg>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onAboutClick) onAboutClick();
                  }}
                  className="capitalize flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#667085] text-[18px] whitespace-nowrap hover:text-[#4278ec] transition-colors"
                >
                  <p className="leading-[1.2] whitespace-pre">Sobre Nós</p>
                </a>

                <div className="relative shrink-0 size-[7.4px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 7.4">
                    <circle cx="3.7" cy="3.7" fill="#050505" r="3.7" />
                  </svg>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onPillarClick) onPillarClick(0);
                  }}
                  className="capitalize flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#667085] text-[18px] whitespace-nowrap hover:text-[#4278ec] transition-colors"
                >
                  <p className="leading-[1.2] whitespace-pre">Pilares</p>
                </a>

                <div className="relative shrink-0 size-[7.4px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 7.4">
                    <circle cx="3.7" cy="3.7" fill="#050505" r="3.7" />
                  </svg>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="capitalize flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#667085] text-[18px] whitespace-nowrap hover:text-[#4278ec] transition-colors"
                >
                  <p className="leading-[1.2] whitespace-pre">Como Funciona</p>
                </a>
              </div>

              {/* Right - Buttons */}
              <div className="absolute content-stretch hidden lg:flex gap-[16px] items-center right-[28px] top-[13px]">
                {/* Registar Button */}
                <div className="content-stretch flex h-[40px] items-start relative rounded-[52.103px] shrink-0 w-[125px]">
                  <button
                    onClick={() => routerNavigate('/register')}
                    className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[71.141px] hover:bg-gray-50 transition-all"
                  >
                    <div aria-hidden="true" className="absolute border-[#050505] border-[1.002px] border-solid inset-0 pointer-events-none rounded-[71.141px]" />
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex gap-[10.02px] items-center justify-center px-[20.04px] py-[12.024px] relative size-full">
                        <p className="flex-[1_0_0] font-['Sora:SemiBold',sans-serif] font-semibold leading-[26.052px] min-h-px min-w-px relative text-[#050505] text-[16.032px] text-center whitespace-pre-wrap">Registar</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Separator Line */}
                <div className="flex h-[13.026px] items-center justify-center relative shrink-0 w-0">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-0 relative w-[13.026px]">
                      <div className="absolute inset-[-0.5px_-3.85%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0278 1.00199">
                          <path d="M0.500994 0.500994H13.5268" stroke="#050505" strokeLinecap="round" strokeWidth="1.00199" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Entrar Button */}
                <div className="content-stretch flex h-[40px] items-start relative rounded-[52px] shrink-0 w-[110px]">
                  <button
                    onClick={() => routerNavigate('/login')}
                    className="bg-[#4278ec] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[71.141px] hover:opacity-90 transition-opacity"
                  >
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex gap-[10.02px] items-center justify-center px-[20.04px] py-[12.024px] relative size-full">
                        <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[26.052px] min-h-px min-w-px relative text-[16.032px] text-center text-white whitespace-pre-wrap">Entrar</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Left - Logo Section */}
              <div className="absolute content-stretch flex gap-[12px] items-center left-0 top-0">
                {/* Logo Icon */}
                <div className="h-[71.362px] relative shrink-0 w-[69.875px]">
                  <img alt="Melhor Saúde Icon" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentLogo1} />
                </div>

                {/* Separator Line */}
                <div className="flex h-[13.026px] items-center justify-center relative shrink-0 w-0">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-0 relative w-[13.026px]">
                      <div className="absolute inset-[-0.5px_-3.85%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0278 1.00199">
                          <path d="M0.500994 0.500994H13.5268" stroke="#050505" strokeLinecap="round" strokeWidth="1.00199" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Logo */}
                <div className="h-[21px] relative shrink-0 w-[226px]">
                  <img alt="Melhor Saúde" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMelhorSaudeTransparentClean1} />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden absolute right-6 top-6 text-black mx-[0px] my-[20px] z-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Moved outside container */}
      
        {mobileMenuOpen && (
          <div




            className="lg:hidden fixed top-[90px] right-4 w-[280px] bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100 z-[9998] overflow-hidden"
          >
            <div className="flex flex-col py-3 gap-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold px-5 py-3 text-[#4278ec] text-[16px] hover:bg-blue-50 transition-colors rounded-lg mx-2"
              >
                Início
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onAboutClick) onAboutClick();
                  setMobileMenuOpen(false);
                }}
                className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium px-5 py-3 text-[#667085] text-[16px] hover:bg-gray-50 hover:text-[#4278ec] transition-colors rounded-lg mx-2"
              >
                Sobre Nós
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onPillarClick) onPillarClick(0);
                  setMobileMenuOpen(false);
                }}
                className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium px-5 py-3 text-[#667085] text-[16px] hover:bg-gray-50 hover:text-[#4278ec] transition-colors rounded-lg mx-2"
              >
                Pilares
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
                className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium px-5 py-3 text-[#667085] text-[16px] hover:bg-gray-50 hover:text-[#4278ec] transition-colors rounded-lg mx-2"
              >
                Como Funciona
              </a>

              <div className="border-t border-gray-100 mt-1 pt-3 px-2 pb-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    routerNavigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-5 border border-[#050505] rounded-full font-['Sora:SemiBold',sans-serif] font-semibold text-[#050505] text-[14px] hover:bg-gray-50 transition-all"
                >
                  Registar
                </button>

                <button
                  onClick={() => {
                    routerNavigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-5 bg-[#4278ec] rounded-full font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-white text-[14px] hover:opacity-90 transition-opacity"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      
    </header>
  );
}