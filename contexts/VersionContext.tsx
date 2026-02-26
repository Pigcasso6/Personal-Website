import React, { createContext, useContext, useState, ReactNode } from 'react';

type HomeVersion = 'v1' | 'v2';

interface VersionContextType {
  version: HomeVersion;
  toggleVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const VersionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [version, setVersion] = useState<HomeVersion>('v1');

  const toggleVersion = () => {
    setVersion((prev) => (prev === 'v1' ? 'v2' : 'v1'));
  };

  return (
    <VersionContext.Provider value={{ version, toggleVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};
