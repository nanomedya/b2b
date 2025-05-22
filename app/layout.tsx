// app/layout.tsx
"use client";
import { NextUIProvider, Switch } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/app/globals.css";
import { MyAlertProvider } from "@/context/MyAlertContext";
import { AuthProvider } from "@/context/AuthContext";

import { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";

type LayoutProps = {
  children: React.ReactNode;
};



export default function RootLayout({ children }: LayoutProps) {


  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sayfa yüklendiğinde tema tercihini kontrol et
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
      } else {
        // Kullanıcının sistem tercihini kontrol et
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(systemPrefersDark);
      }
    }
  }, []);


  // Tema değişikliği
  const toggleDarkMode = (newMode: boolean) => {
    setIsDarkMode((prev) => newMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("theme", newMode ? "dark" : "light");
    }
  };



  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
      </head>
      <body className="antialiased">
        <Provider store={store}>
          <AuthProvider>
            <MyAlertProvider>
              <NextUIProvider>
                {children}
              </NextUIProvider>


              <div className="fixed bottom-20 left-4 z-50">
                <div className="flex items-center space-x-4">
                  <Switch
                    isSelected={isDarkMode}
                    endContent={<Moon />}
                    size="lg"
                    startContent={<Sun />}
                    onValueChange={(value) => toggleDarkMode(value)}>
                  </Switch>
                </div>
              </div>

            </MyAlertProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
