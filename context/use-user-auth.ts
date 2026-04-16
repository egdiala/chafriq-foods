import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserAuthState {
  email: string;
  otp_code: string;

  updateEmail: (value: string) => void;
  updateOtpCode: (value: string) => void;

  clearAll: () => void;
}

export const useUserAuth = create<UserAuthState>()(
  persist(
    (set, get) => ({
      email: "",
      otp_code: "",

      updateEmail: (value: string) => set(() => ({ email: value })),
      updateOtpCode: (value: string) => set(() => ({ otp_code: value })),

      clearAll: () => set({ email: "", otp_code: "" }),
    }),
    {
      name: 'user-auth', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)