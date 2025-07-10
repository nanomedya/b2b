"use client";
import React from "react";

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import MyProducts from "@/app/components/Elements/MyProducts";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";

export default function Search(): JSX.Element {

  

  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] dark:bg-slate-900">
        <div className="relative w-full h-full">

          <div className="mx-auto my-5 container">

          <MyBreadCrumbs items={[{title: 'Ürünler'}]} />

            <div className="w-full mx-auto relative my-5 bg-white dark:bg-slate-800 p-3 rounded-xl shadow">

                <div className="form_wrapper relative">

                  <MyProducts  />


              </div>

            </div>
          </div>

        </div>
      </div>


    </GuestLayout>
  );
}
