


import React, { useEffect, useState } from "react";
import DailyExchange from "./DailyExchange";
import { Currencies } from "@/types";
import { useMyAlert } from "@/context/MyAlertContext";
import { useAuth } from "@/context/AuthContext";
import { currencies } from "@/api/services/homeServices";

export default function DailyExchangeBox(): JSX.Element {

  const { token } = useAuth(); 
  const { showAlert } = useMyAlert(); // Global alert fonksiyonunu al
  const [data, setData] = useState<Currencies[]>([]); // Doğru tip
  const [isLoading, setIsLoading] = useState<boolean>(true); // Doğru tip

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await currencies(token);
        setData(response);
        setIsLoading(false);
      } catch (error: any) {
        showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    };

    fetchData();
  }, []);

 
    return (

        <>
            <DailyExchange isLoading={isLoading} items={data} />
        </>


    )
}
