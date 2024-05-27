import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  userId?: string | undefined;
  profileId?: string | undefined;
  sessionId?: string | undefined;
  isLogin: boolean;
  hasProfile: boolean;
  setUserId: (userId: string | undefined) => void;
  setProfileId: (profileId: string | undefined) => void;
  setSessionId: (sessionId: string | undefined) => void;
};

export const useUser = create(
  persist<User>(
    (set, get) => ({
      isLogin: Boolean(get().userId && get().sessionId),
      hasProfile: Boolean(get().profileId),
      setUserId: (userId) => set({ userId }),
      setProfileId: (profileId) => set({ profileId }),
      setSessionId: (sessionId) => set({ sessionId }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
