import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "./axios";
import toast from "react-hot-toast";


export default function ResetPassword() {

    const location =
  useLocation();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
  useState({
    email:
      location.state?.email || "",
    otp: "",
    newPassword: "",
  });

  const resetPassword =
    async () => {

      try {

        setLoading(true);

        await api.post(
          "/auth/reset-password",
          form
        );

        toast.success(
          "Password reset successful"
        );

        navigate("/login");

      } catch {

        toast.error(
  // eslint-disable-next-line no-undef
  err?.response?.data?.message ||
  "Something went wrong"
);

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="
      min-h-screen
      bg-[#020617]
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        w-full
        max-w-md
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-8
      ">

        <h1 className="
          text-3xl
          font-bold
          text-white
          mb-6
        ">
          Reset Password
        </h1>

        <div className="
          space-y-4
        ">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            className="
              w-full
              bg-slate-900
              border
              border-slate-700
              rounded-2xl
              px-4
              py-3
              text-white
            "
          />

          <input
            type="text"
            placeholder="OTP"
            value={form.otp}
            onChange={(e) =>
              setForm({
                ...form,
                otp:
                  e.target.value,
              })
            }
            className="
              w-full
              bg-slate-900
              border
              border-slate-700
              rounded-2xl
              px-4
              py-3
              text-white
            "
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({
                ...form,
                newPassword:
                  e.target.value,
              })
            }
            className="
              w-full
              bg-slate-900
              border
              border-slate-700
              rounded-2xl
              px-4
              py-3
              text-white
            "
          />

          <button
            onClick={
              resetPassword
            }
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              py-3
              rounded-2xl
              text-white
              font-semibold
            "
          >

            {loading
              ? "Resetting..."
              : "Reset Password"}

          </button>

        </div>

      </div>

    </div>
  );
}