import {
  useEffect
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import useAuthStore
from "../store/authStore";

export default function OAuthSuccess() {

  const navigate =
    useNavigate();

  const [params] =
    useSearchParams();

  const login =
    useAuthStore(
      (s) => s.login
    );

  useEffect(() => {

    const token =
      params.get("token");

    const role =
      params.get("role");

    if (token) {

      login(token, {
        username: "Google User",
        role,
      });

      if (
        role === "ROLE_ADMIN"
      ) {

        navigate("/admin");

      } else {

        navigate("/dashboard");
      }
    }

  }, []);

  return null;
}