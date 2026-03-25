import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  type: UserType | null;
  user: VendorLoginResponse | null;
  updateType: (value: UserType | null) => void;
  updateUser: (value: VendorLoginResponse | null) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      type: null,
      updateType: (value: UserType | null) => set(() => ({ type: value })),
      updateUser: (value: VendorLoginResponse | null) => set(() => ({ user: value })),
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)