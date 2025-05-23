import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HomeAppsBanner() {
  return (
    <div
      className="wrapper-banner bg-[#ffd800] rounded-lg pt-10"
      style={{ backgroundImage: 'url("static/pattern.png")' }}
    >
      <div className="grid grid-cols-2 gap-10">
        <div
          className="part-grid p-8
        "
        >
          <h4 className="font-bold text-2xl text-black mb-3">
            {"AcilSepet'i indir!"}
          </h4>
          <p className="text-black font-normal text-lg mb-10">
            İstediğiniz ürünleri hemen kapınıza getirelim.
          </p>

          <div className="box_items_content flex flex-wrap gap-4">
            <Link href="#">
              <img src="/static/app_store.svg" width={160} alt="" />
            </Link>
            <Link href="#">
              <img src="/static/google_play.svg" width={160} alt="" />
            </Link>
          </div>
        </div>
        <div className="part-grid">
          <img src="static/cover.png" alt="acilsepet" />
        </div>
      </div>
    </div>
  );
}
