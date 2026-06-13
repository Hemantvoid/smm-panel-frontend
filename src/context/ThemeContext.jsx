import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../axios";

const ThemeContext =
  createContext();

export function ThemeProvider({
  children,
}) {

  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings = async () => {

    try {

      const res =
        await api.get(
          "/admin/settings/public"
        );

      setSettings(
        res.data
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // THEMES
  // =========================

  const themes = {

    midnight: {
      background:
        "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827]",
    },

    purple: {
      background:
        "bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950",
    },

    ocean: {
      background:
        "bg-gradient-to-br from-sky-950 via-cyan-900 to-blue-950",
    },

    matrix: {
      background:
        "bg-gradient-to-br from-black via-green-950 to-emerald-950",
    },

    neon: {
      background:
        "bg-gradient-to-br from-black via-cyan-950 to-purple-950",
    },

  };

  const activeTheme =
    themes[
      settings?.themeStyle
    ] || themes.midnight;

  return (

    <ThemeContext.Provider
      value={{

        settings,

        loading,

        theme:
          activeTheme,

        reloadTheme:
          loadSettings,

      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export const useTheme =
  () => useContext(ThemeContext);