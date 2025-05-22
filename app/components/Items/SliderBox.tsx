import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMyAlert } from "@/context/MyAlertContext";
import { campaigns } from "@/api/services/homeServices";
import Slider, { SliderSkeleton } from "./Slider";
import { SliderProps } from "@/types";

export default function SliderBox(): JSX.Element {



  const { token } = useAuth(); 
  const { showAlert } = useMyAlert();
  const [data, setData] = useState<SliderProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await campaigns(token);
          setData(response);
          setIsLoading(false);
        } catch (error: any) {
          showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      };
  
      fetchData();
    }, []);



  return (

    <div className="flex flex-wrap w-full relative p-3">
      <div className="mb-4 flex flex-wrap justify-between items-center w-full border-b border-gray-200 pb-3">
        <span className="text-xl text-gray-800 dark:text-white font-bold inline-block">Kampanyalar</span>
      </div>
      <div className="w-full relative bg-white rounded-xl shadow">
        <div className="relative p-3">

        {isLoading ? (
          <SliderSkeleton />
        ):(
          <Slider images={data} />
        )}
          
        </div>
      </div>
    </div>



  )
}
