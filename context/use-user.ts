import { create } from "zustand";

type UserType = "vendor" | "customer";

interface UserState {
  type: UserType | null;
  user: VendorLoginResponse | null;
  updateType: (value: UserType | null) => void;
  updateUser: (value: VendorLoginResponse | null) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  type: null,
  updateType: (value: UserType | null) => set(() => ({ type: value })),
  updateUser: (value: VendorLoginResponse | null) => set(() => ({ user: value })),
}));
