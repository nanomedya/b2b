"use client";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {Logo2} from "./Logo";
import { Facebook, Instagram, Linkedin, Moon, Sun, Twitter, Youtube } from "react-feather";
import Link from "next/link";
import CookieBanner from "./CookieBanner"; 

export default function Footer(): JSX.Element {
 

  const menu1 = [
    {
      title: "Hakkımızda",
    },
    {
      title: "Kariyer",
    },
    {
      title: "Pinteg",
    },
    {
      title: "Hesabım",
    },
    {
      title: "Kargom Nerede?",
    },
  ];
  const menu2 = [
    {
      title: "Gizlilik Sözleşmesi",
    },
    {
      title: "Sevkiyat Politikası",
    },
    {
      title: "Kullanım Şartları",
    },
    {
      title: "Tüketici Yasası",
    },
    {
      title: "İade Koşulları",
    }
  ];
  const menu3 = [
    {
      title: "Sıkça Sorulan Sorular",
    },
    {
      title: "Kişisel Verilerin Korunması",
    },
    {
      title: "Gizlilik Politikası",
    },
    {
      title: "Kullanım Koşulları",
    },
    {
      title: "Çerez Politikası",
    },
    {
      title: "İşlem Rehberi",
    },
  ];

  

  return (
    <div className="bg-black/80 w-full relative py-6 app_footer">
      <div className="container mx-auto">

    


        <Card shadow="none" radius="none" className="bg-transparent">
          <CardHeader className="flex gap-3">
            <Logo2 className="max-w-[130px]" />
          </CardHeader>
          <Divider />
          <CardBody className="justify-between flex-row flex flex-wrap gap-10 lg:gap-0  items-stretch py-10">
           

            <div className="relative box_items flex flex-row flex-wrap px-5 gap-4 justify-center items-start">
              <div className="box_content">
                <h4 className="font-semibold text-white w-full mb-4">
                  {"PintegB2B'i keşfet"}
                </h4>
                <div className="box_items_content flex flex-col flex-wrap gap-4">
                  {menu1.map((item: any) => (
                    <Link
                      key={item.title}
                      href="/page"
                      className="footer_link text-gray-300 font-sans"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
           

            <div className="relative box_items flex flex-row flex-wrap px-5 gap-4 justify-center items-start">
              <div className="box_content">
                <h4 className="font-semibold text-white w-full mb-4">
                  PintegB2B Yasal
                </h4>
                <div className="box_items_content flex flex-col flex-wrap gap-4">
                  {menu2.map((item: any) => (
                    <Link
                      key={item.title}
                      href="/page"
                      className="footer_link text-gray-300 font-sans"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative box_items flex flex-row flex-wrap px-5 gap-4 justify-center items-start">
              <div className="box_content">
                <h4 className="font-semibold text-white w-full mb-4">
                  Yardıma mı İhtiyacın var?
                </h4>
                <div className="box_items_content flex flex-col flex-wrap gap-4">
                  {menu3.map((item: any) => (
                    <Link
                      key={item.title}
                      href="/page"
                      className="footer_link text-gray-300 font-sans"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative box_items flex flex-col flex-wrap px-5 gap-10 justify-start items-start">
              <div className="box_content">
                <h4 className="font-semibold text-white w-full mb-4">
                  Bizi Takip Edin
                </h4>
                <div className="box_items_content flex flex-row flex-wrap gap-4">
                  <Link
                    href="#"
                    className="footer_social_link text-white rounded-full size-10 flex justify-center items-center  bg-[#1877F2]"
                  >
                    <Facebook />
                  </Link>
                  <Link
                    href="#"
                    className="footer_social_link text-white rounded-full size-10 flex justify-center items-center  bg-[#E4405F]"
                  >
                    <Instagram />
                  </Link>
                  <Link
                    href="#"
                    className="footer_social_link text-white rounded-full size-10 flex justify-center items-center  bg-[#1DA1F2]"
                  >
                    <Twitter />
                  </Link>
                  <Link
                    href="#"
                    className="footer_social_link text-white rounded-full size-10 flex justify-center items-center  bg-[#0A66C2]"
                  >
                    <Linkedin />
                  </Link>
                </div>
              </div>
              <div className="box_content">
                <h4 className="font-semibold text-white w-full mb-4">
                  Ödeme Yöntemleri
                </h4>
                <div className="box_items_content flex flex-row flex-wrap gap-4">
                  <Link
                    href="#"
                    className="rounded-md px-4 flex flex-wrap justify-center items-center shadow bg-white"
                  >
                    <img src="/static/pay1.png" alt="" className="object-contain size-10" />
                  </Link> 
                  <Link
                    href="#"
                    className="rounded-md px-4 flex flex-wrap justify-center items-center shadow bg-white"
                  >
                    <img src="/static/pay2.png" alt="" className="object-contain size-10" />
                  </Link> 
                </div>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="justify-center lg:justify-between">
            <div className="hidden lg:flex gap-10 items-center text-gray-300">
              <Link className="footer_link text-sm font-sans" href="#">
                Geliştiriciler için
              </Link>
              <Link className="footer_link text-sm font-sans" href="#">
                Hakkında
              </Link>
              <Link className="footer_link text-sm font-sans" href="#">
                Yardım & İletişim
              </Link>
            </div>
            <div className="text-sm text-gray-300 font-sans">
              © 2024 PintegB2B Tüm hakları saklıdır.
            </div>
          </CardFooter>
        </Card>
      </div>
      <CookieBanner />
    </div>
  );
}
