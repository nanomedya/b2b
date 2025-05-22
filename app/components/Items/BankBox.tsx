


import React from "react";
import News from "./News";
import Banks from "./Banks";

export default function BankBox(): JSX.Element {

     

    const items = [
        {
          title: "Garanti",
        },
        {
          title: "Akbank",
        },
        {
          title: "Yapı Kredi",
        },
        {
          title: "Kuveyttürk",
        },
        {
          title: "Ziraat Bankası",
        },
        {
          title: "İş Bankası",
        },
      ]

  
    return (

        <>
        <span className="text-xl text-gray-800 dark:text-white font-bold inline-block mb-3">Banka Hesaplarımız</span>
        <Banks items={items} />
        </>


    )
}
