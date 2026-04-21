import { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'Étudiant' | 'Encadrant' | 'Responsable' | 'Directeur';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Étudiant');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setRole('Étudiant');
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
        notificationCount,
        setNotificationCount,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}
