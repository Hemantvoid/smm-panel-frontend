import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  User,
  Lock,
  Mail,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "./axios";

import useAuthStore from "./store/authStore";

import {
  useTheme
} from "./context/ThemeContext";

export default function Register() {

  const navigate =
    useNavigate();

  const loginStore =
    useAuthStore(
      (s) => s.login
    );

  const {
    settings,
    theme,
  } = useTheme();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      username: "",

      email: "",

      password: "",

      confirmPassword: "",

    });

  // =========================
  // REGISTER
  // =========================

  const handleRegister =
    async () => {

      try {

        // VALIDATION
        if (
          !form.username ||
          !form.email ||
          !form.password ||
          !form.confirmPassword
        ) {

          toast.error(
            "Please fill all fields"
          );

          return;
        }

        if (
          form.password.length < 6
        ) {
          toast.error(
            "Password must be at least 6 characters"
          );

          return;
        }

        if (
          form.password !==
          form.confirmPassword
        ) {

          toast.error(
            "Passwords do not match"
          );

          return;
        }

        setLoading(true);

        // REGISTER
        await api.post(
          "/auth/register",
          {

            username:
              form.username,

            email:
              form.email,

            password:
              form.password,

          }
        );

        // AUTO LOGIN
        const loginRes =
          await api.post(
            "/auth/login",
            {

              username:
                form.username,

              password:
                form.password,

            }
          );

        loginStore(
          loginRes.data.token,
          {

            username:
              form.username,

            role:
              loginRes.data.role,

          }
        );

        toast.success(
          "Account created successfully"
        );

        // REDIRECT
        if (
          loginRes.data.role ===
          "ROLE_ADMIN"
        ) {

          navigate("/admin");

        } else {

          navigate(
            "/dashboard"
          );
        }

      } catch (err) {

        console.error(err);

        toast.error(
          err?.response?.data ||
          "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      className={`
        min-h-screen
        ${theme.background}
        flex
        items-center
        justify-center
        p-6
      `}
    >

      {/* CARD */}
      <div
        className="
          w-full
          max-w-md
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        {/* HEADER */}
        <div className="
          text-center
          mb-8
        ">

          {/* LOGO */}
          <div className="
            flex
            justify-center
            mb-5
          ">

            {settings?.logoUrl ? (

              <img
                src={
                  settings.logoUrl
                }
                alt="logo"
                className="
                  w-20
                  h-20
                  rounded-3xl
                  object-cover
                  shadow-xl
                "
              />

            ) : (

              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                  text-white
                "
              >
                S
              </div>

            )}

          </div>

          {/* TITLE */}
          <h1 className="
            text-4xl
            font-black
            text-white
          ">

            Create Account

          </h1>

          <p className="
            text-slate-400
            mt-3
          ">

            Join{" "}

            {settings?.panelName ||
              "SMM Panel"}

          </p>

        </div>

        {/* FORM */}
        <div className="
          space-y-5
        ">

          {/* USERNAME */}
          <div>

            <label className="
              text-sm
              text-slate-300
              mb-2
              block
            ">

              Username

            </label>

            <div className="
              relative
            ">

              <User
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                placeholder="Enter username"
                value={
                  form.username
                }
                onChange={(e) =>
                  setForm({

                    ...form,

                    username:
                      e.target.value,

                  })
                }
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-slate-700
                  rounded-2xl
                  pl-11
                  pr-4
                  py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                  transition
                "
              />

            </div>

          </div>

          {/* EMAIL */}
          <div>

            <label className="
              text-sm
              text-slate-300
              mb-2
              block
            ">

              Email

            </label>

            <div className="
              relative
            ">

              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="email"
                placeholder="Enter email"
                value={
                  form.email
                }
                onChange={(e) =>
                  setForm({

                    ...form,

                    email:
                      e.target.value,

                  })
                }
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-slate-700
                  rounded-2xl
                  pl-11
                  pr-4
                  py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                  transition
                "
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="
              text-sm
              text-slate-300
              mb-2
              block
            ">

              Password

            </label>

            <div className="
              relative
            ">

              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="password"
                placeholder="Enter password"
                value={
                  form.password
                }
                onChange={(e) =>
                  setForm({

                    ...form,

                    password:
                      e.target.value,

                  })
                }
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-slate-700
                  rounded-2xl
                  pl-11
                  pr-4
                  py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                  transition
                "
              />

            </div>

          </div>

          {/* CONFIRM PASSWORD */}
          <div>

            <label className="
              text-sm
              text-slate-300
              mb-2
              block
            ">

              Confirm Password

            </label>

            <div className="
              relative
            ">

              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={
                  form.confirmPassword
                }
                onChange={(e) =>
                  setForm({

                    ...form,

                    confirmPassword:
                      e.target.value,

                  })
                }
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-slate-700
                  rounded-2xl
                  pl-11
                  pr-4
                  py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                  transition
                "
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={
              handleRegister
            }
            disabled={loading}
            className="
              w-full
              mt-2
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              hover:opacity-90
              py-3.5
              rounded-2xl
              font-semibold
              text-white
              transition
              disabled:opacity-50
              flex
              items-center
              justify-center
              gap-2
            "
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

            {!loading && (
              <ArrowRight
                size={18}
              />
            )}

          </button>

          {/* LOGIN */}
          <div className="
            text-center
            pt-3
          ">

            <button
              onClick={() =>
                navigate(
                  "/login"
                )
              }
              className="
                text-indigo-400
                hover:text-indigo-300
                transition
              "
            >

              Already have an account?
              Login

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}