// pages/_app.tsx
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { MyAlertProvider } from "@/context/MyAlertContext";
import { AuthProvider } from "@/context/AuthContext";
import { NextUIProvider, Switch } from "@nextui-org/react";
import "@/app/globals.css"; // veya @/app/globals.css dosyanın yerine göre

import { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = (newMode: boolean) => {
    setIsDarkMode(newMode);
    window.localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <MyAlertProvider>
          <NextUIProvider>
            <Component {...pageProps} />

            <div className="fixed bottom-20 left-4 z-50">
              <div className="flex items-center space-x-4">
                <Switch
                  isSelected={isDarkMode}
                  endContent={<Moon />}
                  size="lg"
                  startContent={<Sun />}
                  onValueChange={toggleDarkMode}
                />
              </div>
            </div>
          </NextUIProvider>
        </MyAlertProvider>
      </AuthProvider>
    </Provider>
  );
}
