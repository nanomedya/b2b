import React, { ReactNode } from "react";
import Logo from "./Logo";
import { Spinner } from "@nextui-org/react";

const PageLoader: React.FC<any> = () => (
  <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-slate-800">
    <div className="w-full sm:max-w-md px-6 py-10 bg-white dark:bg-slate-700 shadow-md overflow-hidden sm:rounded-lg">
      <div className="flex flex-wrap flex-col items-center justify-center gap-6">
        <Logo className="h-10" />
        <Spinner label="Yükleniyor..." color="warning" />
      </div>
    </div>
  </div>
);

export default PageLoader;
