import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  type: UserType | null;
  user: VendorProfileResponse | null;
  updateType: (value: UserType | null) => void;
  updateUser: (value: VendorProfileResponse | null) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      type: null,
      updateType: (value: UserType | null) => set(() => ({ type: value })),
      updateUser: (value: VendorProfileResponse | null) => set(() => ({ user: value })),
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)