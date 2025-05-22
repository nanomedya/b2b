import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { NavbarItem } from "@nextui-org/react";
import { channels } from "@/api/services/navbarService";
import { Channel } from "@/types";
import { useMyAlert } from "@/context/MyAlertContext"; // useMyAlert'i import et
import Link from "next/link";
 
export default function Channels(): JSX.Element {
  const { showAlert } = useMyAlert(); // Global alert fonksiyonunu al
  const [data, setData] = useState<Channel[]>([]); // Doğru tip

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await channels();
        const filteredData = response.filter(
          (item: Channel) => item.isLocalMarket !== true
        ); // isLocalMarket false olanları filtrele
        setData(filteredData); // Filtrelenmiş veriyi state'e ata
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            if (err.path) {
              showAlert("Doğrulama Hatası", err.message);
            }
          });
        } else {
          showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      }
    };

    fetchSliderData();
  }, []);

  return (
    <>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <NavbarItem key={`item ${item.id}`}>
              <Link href="/" className="text-yellow-600">
                {item.title}
              </Link>
            </NavbarItem>
          );
        })}
    </>
  );
}
