"use client";
import React from "react";

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";


export default function ServerErrorPage(): JSX.Element {

  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4]">
        <div className="relative w-full h-full">
          <div className="min-h-screen flex flex-col gap-10 justify-center items-center">
          <div className="bg-white p-10 rounded-md">
            <h1>500 - Internal Server Error</h1>
            <p>Üzgünüz, tarafımızda bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
          </div>
          </div>
        </div>
      </div>


    </GuestLayout>
  );
}
