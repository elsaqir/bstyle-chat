import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface RtlContextProps {
  isRtl: boolean;
  toggleDirection: () => void;
}

const RtlContext = createContext<RtlContextProps>({
  isRtl: true,
  toggleDirection: () => {}
});

export const useRtl = () => useContext(RtlContext);

interface RtlProviderProps {
  children: ReactNode;
  defaultDirection?: boolean;
}

export function RtlProvider({
  children,
  defaultDirection = true
}: RtlProviderProps) {
  const [isRtl, setIsRtl] = useState(defaultDirection);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
  }, [isRtl]);

  const toggleDirection = () => {
    setIsRtl(prev => !prev);
  };

  return (
    <RtlContext.Provider value={{ isRtl, toggleDirection }}>
      {children}
    </RtlContext.Provider>
  );
}