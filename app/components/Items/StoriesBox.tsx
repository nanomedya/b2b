
import React, { useEffect, useState } from "react";
import Stories, { StoriesSkeleton } from "./Stories";
import { useAuth } from "@/context/AuthContext";
import { useMyAlert } from "@/context/MyAlertContext";
import { stories } from "@/api/services/homeServices";
import { StoriesProps } from "@/types";
import { Card, CardBody } from "@nextui-org/react";
 

export default function StoriesBox(): JSX.Element {


  const { token, setLogout } = useAuth();
  const { showAlert } = useMyAlert();
  const [data, setData] = useState<StoriesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await stories(token);
        
        if(response.error){
          setLogout();
        }else{
          setData(response);
        }
        
        setIsLoading(false);
      } catch (error: any) {
        showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    };

    fetchData();
  }, []);



  return (

    <Card shadow="sm" className="w-full">
      <CardBody className="gap-6">
        {isLoading ? (
          <StoriesSkeleton />
        ) : (
          <Stories images={data} />
        )}
      </CardBody>
    </Card>


  )
}
