import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile } from '../types';
import { CURRENT_USER } from '../data/mockEmails';

interface UserContextType {
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'anhk_webmail_user';
const USER_UPDATE_EVENT = 'anhk_user_profile_updated';

function getStoredUser(): UserProfile {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Cleanse legacy fallback names
      const isLegacy =
        parsed.name &&
        (parsed.name.toLowerCase().includes('alex') ||
         parsed.name.includes('ألكس') ||
         parsed.name.includes('فانس') ||
         parsed.email?.toLowerCase().includes('alex') ||
         parsed.email?.toLowerCase().includes('vance'));

      if (isLegacy) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(CURRENT_USER));
        return CURRENT_USER;
      }
      return { ...CURRENT_USER, ...parsed };
    }
  } catch (e) {
    console.error('Error reading user from localStorage:', e);
  }
  return CURRENT_USER;
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(getStoredUser);

  // Update user profile and immediately broadcast to all listeners & localStorage
  const updateUser = useCallback((updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const nextUser = { ...prev, ...updated };
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
        window.dispatchEvent(new CustomEvent(USER_UPDATE_EVENT, { detail: nextUser }));
      } catch (e) {
        console.error('Error saving user to localStorage:', e);
      }
      return nextUser;
    });
  }, []);

  const resetUser = useCallback(() => {
    setUser(CURRENT_USER);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(CURRENT_USER));
    window.dispatchEvent(new CustomEvent(USER_UPDATE_EVENT, { detail: CURRENT_USER }));
  }, []);

  // Sync across tabs and custom events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === USER_STORAGE_KEY && e.newValue) {
        try {
          const newUser = JSON.parse(e.newValue);
          setUser(newUser);
        } catch {
          // ignore
        }
      }
    };

    const handleCustomBroadcast = (e: Event) => {
      const customEvt = e as CustomEvent<UserProfile>;
      if (customEvt.detail) {
        setUser(customEvt.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(USER_UPDATE_EVENT, handleCustomBroadcast);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(USER_UPDATE_EVENT, handleCustomBroadcast);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
