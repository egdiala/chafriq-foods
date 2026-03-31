import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserLocation {
  latitude: number;
  longitude: number;
  timestamp?: number; // useful for freshness later
}

interface UserState {
  type: UserType | null;
  user: VendorProfileResponse | CustomerProfileResponse | null;

  location: UserLocation | null;

  updateType: (value: UserType | null) => void;
  updateUser: (value: VendorProfileResponse | CustomerProfileResponse | null) => void;

  setLocation: (value: UserLocation | null) => void;
  clearLocation: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      type: null,
      location: null,

      updateType: (value: UserType | null) => set(() => ({ type: value })),
      updateUser: (value: VendorProfileResponse | CustomerProfileResponse | null) => set(() => ({ user: value })),

      setLocation: (value) =>
        set({
          location: value
            ? { ...value, timestamp: Date.now() }
            : null,
        }),

      clearLocation: () => set({ location: null }),
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)