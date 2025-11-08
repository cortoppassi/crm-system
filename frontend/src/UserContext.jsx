import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para acessar facilmente
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro do UserProvider');
  return context;
}
