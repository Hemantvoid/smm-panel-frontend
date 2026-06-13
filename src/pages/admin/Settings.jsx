import { useEffect, useState } from "react";
import api from "../../axios";

export default function Settings() {

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      panelName: "",
      logoUrl: "",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      themeStyle: "midnight",
    });

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings = async () => {

    try {

      const res =
        await api.get(
          "/admin/settings"
        );

      setForm(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  const saveSettings = async () => {

    try {

      await api.put(
        "/admin/settings",
        form
      );

      alert(
        "Settings saved successfully"
      );

    } catch (err) {

      console.error(err);

      alert(
        "Failed to save settings"
      );
    }
  };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Panel Settings
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4">

        <div>

          <label>
            Panel Name
          </label>

          <input
            value={form.panelName || ""}
            onChange={(e) =>
              setForm({
                ...form,
                panelName:
                  e.target.value,
              })
            }
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
            "
          />

        </div>

        <div>

          <label>
            Logo URL
          </label>

          <input
            value={form.logoUrl || ""}
            onChange={(e) =>
              setForm({
                ...form,
                logoUrl:
                  e.target.value,
              })
            }
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
            "
          />

        </div>

        <div>

          <label>
            Primary Color
          </label>

          <input
            type="color"
            value={
              form.primaryColor
            }
            onChange={(e) =>
              setForm({
                ...form,
                primaryColor:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

          <label>
            Secondary Color
          </label>

          <input
            type="color"
            value={
              form.secondaryColor
            }
            onChange={(e) =>
              setForm({
                ...form,
                secondaryColor:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

  <label className="text-sm text-slate-300">
    Dashboard Style
  </label>

  <select
    value={form.themeStyle}
    onChange={(e) =>
      setForm({
        ...form,
        themeStyle:
          e.target.value,
      })
    }
    className="
      w-full
      mt-2
      p-3
      rounded-xl
      bg-slate-800
      border
      border-slate-700
      text-white
      outline-none
    "
  >

    <option value="midnight">
      Midnight
    </option>

    <option value="purple">
      Purple Luxury
    </option>

    <option value="neon">
      Neon Cyberpunk
    </option>

    <option value="ocean">
      Ocean Blue
    </option>

    <option value="matrix">
      Matrix Hacker
    </option>

  </select>

</div>
<div
  className="
    rounded-2xl
    border
    border-slate-700
    overflow-hidden
    mt-6
  "
>

  <div
    className={`
      h-32
      flex
      items-center
      justify-center
      text-2xl
      font-bold
      text-white

      ${
        form.themeStyle === "midnight"
          ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950"

        : form.themeStyle === "purple"
          ? "bg-gradient-to-r from-violet-900 via-purple-700 to-fuchsia-800"

        : form.themeStyle === "neon"
          ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700"

        : form.themeStyle === "ocean"
          ? "bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-800"

        : "bg-gradient-to-r from-green-700 via-emerald-600 to-lime-700"
      }
    `}
  >

    {form.panelName ||
      "SMM Panel"}

  </div>

</div>

        <button
          onClick={
            saveSettings
          }
          className="
  px-6
  py-3
  rounded-2xl
  bg-gradient-to-r
  from-indigo-600
  to-purple-600
  text-white
  font-semibold
  hover:scale-105
  transition
"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}