import { create } from "zustand";

const useAuthStore = create((set) => ({

  // =====================================
  // STATE
  // =====================================
  token:
    localStorage.getItem("token") || null,

  role:
    localStorage.getItem("role") || null,

  balance: 0,

  isAuthenticated:
    !!localStorage.getItem("token"),

  // =====================================
  // LOGIN
  // =====================================
  login: (
    token,
    user
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "role",
      user.role
    );

    set({

      token,

      role: user.role,

      isAuthenticated: true,

    });
  },

  // =====================================
  // BALANCE
  // =====================================
  setBalance: (
    balance
  ) => {

    set({
      balance,
    });
  },

  // =====================================
  // LOGOUT
  // =====================================
  logout: () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    set({

      token: null,

      role: null,

      balance: 0,

      isAuthenticated: false,

    });
  },

}));

export default useAuthStore;