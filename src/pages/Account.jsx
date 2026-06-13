import {
  User,
  Mail,
  Wallet,
  Shield,
  KeyRound,
  Calendar,
} from "lucide-react";

import { useEffect, useState } from "react";

import api from "../axios";

export default function Account() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    loadProfile();

  }, []);
  const [currentPassword, setCurrentPassword] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

const [loading, setLoading] =
  useState(false);
  const changePassword = async () => {

  try {

    setLoading(true);

    const res =
      await api.post(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

    alert(res.data);

    setCurrentPassword("");
    setNewPassword("");

  } catch (err) {

    alert(
      err?.response?.data ||
      "Failed to change password"
    );

  } finally {

    setLoading(false);
  }
};

  const loadProfile = async () => {

    try {

      const res =
        await api.get(
          "/auth/me"
        );

      setUser(res.data);

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div className="
      p-6
      lg:p-10
      text-white
    ">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="
          text-5xl
          font-black
          mb-3
        ">
          My Account
        </h1>

        <p className="
          text-slate-400
          text-lg
        ">
          Manage your profile,
          security and account
          settings
        </p>

      </div>

      {/* PROFILE CARD */}
      <div className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        mb-8
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          gap-8
        ">

          {/* AVATAR */}
          <div className="
            w-32
            h-32
            rounded-3xl
            bg-gradient-to-br
            from-indigo-500
            to-purple-600
            flex
            items-center
            justify-center
            text-5xl
            font-black
            shadow-2xl
          ">

            {user?.username
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          {/* INFO */}
          <div className="flex-1">

            <h2 className="
              text-4xl
              font-black
              mb-3
            ">
              {user?.username}
            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-5
            ">

              <InfoCard
                icon={Mail}
                label="Email"
                value={
                  user?.email
                }
              />

              <InfoCard
                icon={Wallet}
                label="Wallet Balance"
                value={`₹${user?.balance}`}
              />

              <InfoCard
                icon={Shield}
                label="Role"
                value={
                  user?.role
                }
              />

              <InfoCard
                icon={Calendar}
                label="Status"
                value="Active"
              />

            </div>

          </div>

        </div>

      </div>

      {/* SECURITY */}
      <div className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
      ">

        <div className="
          flex
          items-center
          gap-4
          mb-8
        ">

          <div className="
            w-16
            h-16
            rounded-2xl
            bg-gradient-to-br
            from-pink-500
            to-rose-500
            flex
            items-center
            justify-center
          ">

            <KeyRound size={30} />

          </div>

          <div>

            <h2 className="
              text-3xl
              font-black
            ">
              Security
            </h2>

            <p className="
              text-slate-400
            ">
              Manage password and
              authentication
            </p>

          </div>

        </div>

        <div className="
  space-y-5
">

  <input
    type="password"
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) =>
      setCurrentPassword(
        e.target.value
      )
    }
    className="
      w-full
      p-4
      rounded-2xl
      bg-black/20
      border
      border-white/10
      outline-none
    "
  />

  <input
    type="password"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(
        e.target.value
      )
    }
    className="
      w-full
      p-4
      rounded-2xl
      bg-black/20
      border
      border-white/10
      outline-none
    "
  />

  <button
    onClick={changePassword}
    disabled={loading}
    className="
      w-full
      rounded-2xl
      bg-indigo-600
      hover:bg-indigo-500
      transition
      py-4
      font-bold
    "
  >

    {loading
      ? "Updating..."
      : "Change Password"}

  </button>

</div>  
      </div>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="
      rounded-2xl
      border border-white/10
      bg-black/20
      p-5
      flex
      items-center
      gap-4
    ">

      <div className="
        w-12
        h-12
        rounded-xl
        bg-white/10
        flex
        items-center
        justify-center
      ">

        <Icon size={22} />

      </div>

      <div>

        <p className="
          text-slate-400
          text-sm
        ">
          {label}
        </p>

        <h3 className="
          text-lg
          font-bold
        ">
          {value || "N/A"}
        </h3>

      </div>

    </div>
  );
}