"use client";
import React, { useEffect, useState } from "react";


import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";

import { useAuth } from "@/context/AuthContext";

import { useMyAlert } from "@/context/MyAlertContext";
import {Tabs, Tab} from "@heroui/tabs";
import {Button, ButtonGroup} from "@heroui/button";
import {Input} from "@heroui/input";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCurrentBasket, removeFromBasketAsync } from "@/redux/basketSlice";
import Link from "next/link";

export default function Basket(): JSX.Element {

  

  const { showAlert } = useMyAlert();
  const { token, currentBasketId, setCurrentBasketId, user } = useAuth();
  const basketState = useSelector((state: RootState) => state.basket); // Global store'dan veri alınır

  const dispatch = useDispatch<AppDispatch>(); // Type dispatch here



  const [totalItems, setTotalItems] = useState<any>(0); // Varsayılan sepet durumu
  const [totalPrice, setTotalPrice] = useState<any>(0); // Varsayılan sepet durumu
  const [cargoPrice, setCargoPrice] = useState<any>(25); // Varsayılan sepet durumu

  const cariyeBakiyeniz = 0;


  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: ''
  });


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCardInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleFocusChange = (e: any) => {
    setCardInfo(prevState => ({
      ...prevState,
      focus: e.target.name
    }));
  };



  useEffect(() => { 
    setTotalItems(basketState.totalItems);
    setTotalPrice(basketState.totalPrice);
  }, [basketState]);


 



  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] dark:bg-slate-900">
        <div className="relative w-full h-full">

          <div className="mx-auto my-5 container">


            <MyBreadCrumbs items={[{ href: '/basket', title: 'Sepetim' }, { title: 'Ödeme' }]} />

            <div className="w-full flex flex-wrap justify-center gap-3 mx-auto relative my-5">
              <div className="form_wrapper relative w-full md:w-6/12">
                <div className="bg-white dark:bg-slate-800 px-3 py-6 rounded-xl shadow w-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">Ödeme Yöntemi</h2>
                  </div>

                  <div className="flex flex-wrap flex-col items-center justify-center">
                  <Tabs aria-label="Ödeme Yöntemleri">
                    <Tab key="cari" title="Cari ile Öde">
                      <div className="text-center">
                        <p className="text-gray-700 dark:text-white">Cari Bakiyeniz</p>
                        <div className="font-bold text-5xl text-gray-800 dark:text-gray-100 mt-6">
                          {cariyeBakiyeniz.toFixed(2)} ₺
                        </div>
                      </div>
                    </Tab>
                    <Tab key="creditCard" title="Kredi Kartı">
                      <div className="flex flex-col flex-wrap justify-center">
                        {/* <Cards
                          number={cardInfo.number}
                          name={cardInfo.name}
                          expiry={cardInfo.expiry}
                          cvc={cardInfo.cvc}
                          focused={cardInfo.focus}
                        /> */}


                        <div className=" px-6 py-4 rounded-xl shadow w-full max-w-md mx-auto flex flex-wrap gap-3">
                          <Input
                            label="Kart Numarası"
                            name="number"
                            value={cardInfo.number}
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                            maxLength={16}
                            placeholder="•••• •••• •••• ••••"
                            required
                          />

                          {/* İsim */}
                          <Input
                            label="Ad Soyad"
                            name="name"
                            value={cardInfo.name}
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                            placeholder="Örnek Kişi"
                            maxLength={200}
                            required
                          />

                          {/* Son Kullanma Tarihi */}
                          <div className="flex space-x-4">
                            <Input
                              label="Son Kullanma Tarihi"
                              name="expiry"
                              value={cardInfo.expiry}
                              onChange={handleInputChange}
                              onFocus={handleFocusChange}
                              placeholder="MM/YY"
                              maxLength={4}
                              required
                            />
                            {/* CVC */}
                            <Input
                              label="CVC"
                              name="cvc"
                              value={cardInfo.cvc}
                              onChange={handleInputChange}
                              onFocus={handleFocusChange}
                              placeholder="CVC"
                              maxLength={3}
                              required
                            />
                          </div>

                       
                        </div>
                      </div>


                    </Tab>
                    <Tab key="bankTransfer" title="Havale">
                      <div className="text-center">
                        <p className="text-gray-700 dark:text-white">Havale yöntemi seçildi.</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">Banka hesabı bilgileri: [Banka Bilgileri]</p>
                      </div>
                    </Tab>
                  </Tabs>
 
                  </div>
                 
                </div>
              </div>

              <div className="form_wrapper relative w-full md:w-6/12">
                <div className="bg-white dark:bg-slate-800 px-3 py-6 rounded-xl shadow w-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">Sepet Özeti</h2>
                  </div>

                  {/* Ara Toplam */}
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <p className="text-gray-700 dark:text-white">Toplam Ürün</p>
                    <p className="font-semibold text-gray-800">{totalItems}</p>
                  </div>

                  {/* Ara Toplam */}
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <p className="text-gray-700 dark:text-white">Ara Toplam</p>
                    <p className="font-semibold text-gray-800">₺ {totalPrice.toFixed(2)}</p>
                  </div>

                  {/* KDV */}
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <p className="text-gray-700 dark:text-white">KDV (%20)</p>
                    <p className="font-semibold text-gray-800">₺ {(totalPrice * 0.20).toFixed(2)}</p>
                  </div>

                  {/* Kargo Ücreti */}
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <p className="text-gray-700 dark:text-white">Kargo Ücreti</p>
                    <p className="font-semibold text-gray-800 dark:text-white">₺ {cargoPrice.toFixed(2)}</p>
                  </div>

                  {/* Toplam Tutar */}
                  <div className="flex justify-between items-center py-4 border-t dark:border-gray-700 font-bold text-lg">
                    <p className="text-black dark:text-white">Toplam</p>
                    <p className="text-black dark:text-white">₺ {(totalPrice + cargoPrice).toFixed(2)}</p>
                  </div>

                  {/* İndirim Kodu Girişi */}
                  <div className="mt-4">
                    <Button
                      as={Link}
                      href="/order-detail"
                      color="warning"
                      fullWidth
                      className="text-lg text-white font-semibold mt-5"
                    >
                      Ödemeyi Tamamla
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </GuestLayout>
  );
}
