import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  profileId?: number | undefined;
  sessionId?: number | undefined;
  isLogin: () => boolean;
  hasProfile: () => boolean;
  setProfileId: (profileId: number | undefined) => void;
  setSessionId: (sessionId: number | undefined) => void;
};

export const useUser = create(
  persist<User>(
    (set, get) => ({
      isLogin: () => Boolean(get().sessionId),
      hasProfile: () => Boolean(get().profileId),
      setProfileId: (profileId) => set({ profileId }),
      setSessionId: (sessionId) => set({ sessionId }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
