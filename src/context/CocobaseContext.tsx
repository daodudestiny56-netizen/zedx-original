import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cocobase } from 'cocobase';
import { cocobaseConfig, CONFIG } from '../config';
import { User } from '../types';

interface CocobaseContextType {
  db: Cocobase | null;
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const CocobaseContext = createContext<CocobaseContextType>({
  db: null,
  user: null,
  loading: true,
  logout: () => {},
  refreshUser: async () => {},
});

export const CocobaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<Cocobase | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const cocobaseInstance = new Cocobase(cocobaseConfig);
        setDb(cocobaseInstance);

        // Optional: Initialize auth if token exists - Non-blocking to prevent boot hang
        cocobaseInstance.auth.initAuth().then(() => {
          const currentUser = cocobaseInstance.auth.getUser();
          if (currentUser) {
            setUser({
              name: (currentUser as any).name || currentUser.email.split('@')[0],
              email: currentUser.email,
            });
          }
        }).catch(err => console.warn("Auth sync deferred:", err));

        // Check local storage for session as immediate fallback
        const savedSession = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        if (savedSession) {
           setUser(JSON.parse(savedSession));
        }
      } catch (error) {
        console.error("Cocobase System Fault:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const logout = () => {
    if (db) {
      db.auth.logout();
    }
    setUser(null);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
  };

  const refreshUser = async () => {
    if (db && db.auth.isAuthenticated()) {
      const refreshed = await db.auth.getCurrentUser();
      setUser({
        name: (refreshed as any).name || refreshed.email.split('@')[0],
        email: refreshed.email,
      });
    }
  };

  return (
    <CocobaseContext.Provider value={{ db, user, loading, logout, refreshUser }}>
      {children}
    </CocobaseContext.Provider>
  );
};

export const useCocobase = () => useContext(CocobaseContext);
