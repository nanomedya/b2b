


import React, { useEffect, useState } from "react";
import News, { NewsSkeleton } from "./News";
import { useAuth } from "@/context/AuthContext";
import { useMyAlert } from "@/context/MyAlertContext";
import { NewsProps } from "@/types";
import { news } from "@/api/services/homeServices";

export default function NewsBox(): JSX.Element {


    const { token } = useAuth();
    const { showAlert } = useMyAlert();
    const [data, setData] = useState<NewsProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await news(token);
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
            {isLoading ? (
                <NewsSkeleton />
            ) : (
                <News items={data} />
            )}

        </>

    )
}
