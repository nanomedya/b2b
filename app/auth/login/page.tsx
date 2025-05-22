"use client";
import React, { useState } from "react";
import AuthCard from "@/app/components/Items/AuthCard";
import Logo from "@/app/components/Items/Logo";

import LoginBox from "@/app/components/Items/LoginBox";

export default function Login(): JSX.Element {
  return (

      <AuthCard logo={<Logo className="h-10" />}>
        <LoginBox title="" />
      </AuthCard>
    
  );
}
