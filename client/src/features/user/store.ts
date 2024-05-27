import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  userId?: string | undefined;
  profileId?: string | undefined;
  sessionId?: string | undefined;
  isLogin: boolean;
  setUserId: (userId: string | undefined) => void;
  setProfileId: (profileId: string | undefined) => void;
  setSesssionId: (sessionId: string | undefined) => void;
};

export const useUser = create(
  persist<User>(
    (set, get) => ({
      isLogin: Boolean(get().userId && get().sessionId),
      setUserId: (userId) => set({ userId }),
      setProfileId: (profileId) => set({ profileId }),
      setSesssionId: (sessionId) => set({ sessionId }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
