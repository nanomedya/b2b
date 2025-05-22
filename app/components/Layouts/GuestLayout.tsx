import React from "react";
import Footer from "../Items/Footer";

type GuestLayoutProps = {
  children: React.ReactNode;
};

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="font-sans text-gray-900 antialiased min-h-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default GuestLayout;
