import axios from "axios";

import useAuthStore
  from "./store/authStore";

const api = axios.create({

  baseURL:
    "http://localhost:8080",

});

// =====================================
// REQUEST INTERCEPTOR
// =====================================
api.interceptors.request.use(

  (config) => {

    const token =
      useAuthStore
        .getState()
        .token;

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// =====================================
// RESPONSE INTERCEPTOR
// =====================================
api.interceptors.response.use(

  (response) => response,

  (error) => {

    // TOKEN EXPIRED
    if (
      error.response?.status === 401
    ) {

      const logout =
        useAuthStore
          .getState()
          .logout;

      logout();

      window.location.href =
        "/login";
    }

    return Promise.reject(error);
  }
);

export default api;