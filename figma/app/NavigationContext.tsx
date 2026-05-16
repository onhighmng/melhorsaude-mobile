import React, { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  currentScreen: string;
  navigate: (screen: string, data?: any) => void;
  data: any;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [data, setData] = useState<any>(null);

  const navigate = (screen: string, newData?: any) => {
    setCurrentScreen(screen);
    if (newData !== undefined) {
      setData(newData);
    }
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, data }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
