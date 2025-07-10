"use client";
import React from "react";

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import MyTable from "@/app/components/Elements/MyProducts";

export default function Search(): JSX.Element {

  

  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4]">
        <div className="relative w-full h-full">

          <div className="mx-auto container">
            <div className="w-full mx-auto relative my-10 bg-white p-3 rounded-xl shadow">

                <div className="form_wrapper relative">

                  <MyTable  />;


              </div>

            </div>
          </div>

        </div>
      </div>


    </GuestLayout>
  );
}
