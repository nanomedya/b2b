"use client";
import { useAcceptCookies } from "@/lib/hooks/useAcceptCookies";
import React from "react";

import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    Yükleniyor...
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const FeatureBar = dynamic(() => import("@/app/components/Items/FeatureBar"), {
  ...dynamicProps,
});

const CookieBanner = () => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <FeatureBar
      title="Bu site deneyiminizi iyileştirmek için çerezler kullanır. Tıklayarak Gizlilik Politikamızı kabul etmiş olursunuz."
      hide={acceptedCookies}
      action={
        <Button
          className="mx-5 bg-white"
          variant="bordered"
          onClick={() => onAcceptCookies()}
        >
          Çerezleri kabul et
        </Button>
      }
    />
  );
};

export default CookieBanner;
