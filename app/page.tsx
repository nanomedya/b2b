"use client";
import React from "react";

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import HomeGuest from "./components/Items/HomeGuest";
import { useAuth } from "@/context/AuthContext";
import HomeAuth from "./components/Items/HomeAuth";
import PageLoader from "./components/Items/PageLoader";


export default function Home(): JSX.Element {
  const { loading, token } = useAuth();

  if (loading) {
    return <PageLoader />
  }


  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] dark:bg-gray-700">
        <div className="relative w-full h-full">
            {token ? (
              <HomeAuth />
            ) : (
              <HomeGuest />
            )}
          </div>
      </div>


    </GuestLayout>
  );
}
