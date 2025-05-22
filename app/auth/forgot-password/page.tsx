"use client";
import React from "react";

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";

import {Button, ButtonGroup} from "@heroui/button";
import {Input} from "@heroui/input";
import {Divider} from "@heroui/divider";

import Link from "next/link";
 


export default function ForgotPassword(): JSX.Element {

  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4]">
        <div className="relative w-full h-full">


          <div className="w-full h-[700px] flex flex-col gap-10 flex-wrap justify-center items-center">
            <h1 className="text-xl md:text-3xl text-black font-bold text-center">Şifremi Unuttum</h1>
            <div className="bg-white min-w-[340px] p-3 rounded-lg shadow-md">
              <form>
                <Input
                  isClearable
                  type="text"
                  label="Email Adresiniz"
                  variant="bordered"
                  placeholder="Email adresinizi girin"
                  onClear={() => console.log("input cleared")}
                />

                <div className="flex items-center justify-center mt-4">
                  <Button className="bg-black text-white" type="submit">
                    Şifre Sıfırlama Bağlantısı Gönder
                  </Button>
                </div>

                <Divider className="my-5 bg-gray-100" />
                <div className="flex items-center justify-center mt-4">
                  <Link
                    href="/"
                    className="text-decoration-none text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
                  >
                    Şifremi hatırladım!
                  </Link>
                </div>
              </form>

            </div>
          </div>




        </div>
      </div>


    </GuestLayout>
  );
}



