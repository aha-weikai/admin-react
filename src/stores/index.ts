import { LoginRes } from "@/pages/login/model";
import { create } from "zustand";

export const userStore = create(set => ({
  token: {
    accessToken: "",
    refreshToken: "",
  },

  setToken: () => set((state: { token: LoginRes }) => ({ token: state.token })),
}));
