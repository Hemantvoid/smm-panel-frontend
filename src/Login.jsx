import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "./axios";

import useAuthStore from "./store/authStore";

import toast from "react-hot-toast";

export default function Login() {

  const navigate = useNavigate();

  const loginStore =
    useAuthStore((s) => s.login);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // ===============================
  // LOGIN
  // ===============================
  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login",
        form
      );

      // STORE AUTH
      loginStore(
        res.data.token,
        {
          username: form.username,
          role: res.data.role,
        }
      );

      toast.success("Login successful");

      // REDIRECT
      if (res.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {

      console.error(err);

     toast.error(
  err?.response?.data?.message ||
  "Something went wrong"
);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/20">
            S
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Login to your SMM panel
          </p>

        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* USERNAME */}
          <div>

            <label className="text-sm text-slate-300 mb-2 block">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm text-slate-300 mb-2 block">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
            />
            <div className="text-right">

  <a
    href="/forgot-password"
    className="
      text-sm
      text-indigo-400
      hover:text-indigo-300
    "
  >
    Forgot Password?
  </a>

</div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 py-3 rounded-2xl font-semibold text-white transition disabled:opacity-50"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>
          <button

  onClick={() => {

    window.location.href =

      "https://localhost:8080/oauth2/authorization/google";

  }}

  className="
    w-full
    mt-4
    border border-white/10
    bg-white/5
    hover:bg-white/10
    py-3
    rounded-2xl
    font-semibold
    text-white
    transition
  "
>

  Continue with Google

</button>

        </div>

      </div>

    </div>
  );
}
