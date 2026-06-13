import { useState } from "react";
import { Link } from "react-router-dom";
import api from "./axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendOtp = async () => {

    try {

      setLoading(true);

      await api.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(
  "OTP sent successfully"
);

navigate(
  "/reset-password",
  {
    state: {
      email
    }
  }
);

    } catch (err) {

     toast.error(
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
          mb-2
        ">
          Forgot Password
        </h1>

        <p className="
          text-slate-400
          mb-6
        ">
          Enter your email to receive OTP
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
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
            mb-4
          "
        />

        <button
          onClick={sendOtp}
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            py-3
            rounded-2xl
            text-white
            font-semibold
          "
        >

          {loading
            ? "Sending..."
            : "Send OTP"}

        </button>

        <div className="
          text-center
          mt-5
        ">

          <Link
            to="/login"
            className="
              text-indigo-400
            "
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}