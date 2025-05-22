"use client";
import React, { useEffect, useState } from "react";


import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";

import { useRouter } from 'next/router';
import MyBreadCrumbs from "../../app/components/Items/MyBreadCrumbs";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";
import {Badge} from "@heroui/badge";
import {Chip} from "@heroui/chip";
import { Download, XCircle } from "react-feather";
import StoriesBox from "../../app/components/Items/StoriesBox";
import PageLoader from "../../app/components/Items/PageLoader";
import { useAuth } from "@/context/AuthContext";
import { useParams } from 'react-router-dom';
import { OrdersProps } from "@/types";
import { useMyAlert } from "@/context/MyAlertContext";
import { orderDetail } from "@/api/services/homeServices";
import { totalmem } from "os";



export default function OrderDetail(): JSX.Element {

    const { user, loading, token } = useAuth();
    const router = useRouter();
    const [recentOrders, setData] = useState({id:"",order_price:"",order_tax_price:"",order_status:"",order_date:""});
    const [products, setProducts] = useState([{id:"",orderproduct_title:"",orderproduct_sku:"",orderproduct_count:"",orderproduct_price:"",ankara:"",istanbul:""}]);
    const { id } = router.query;
    const { showAlert } = useMyAlert();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
      const [formData, setFormData] = useState({
        query: "",
        sort_column: "id",
        sort_direction: "desc",
      });
    
    
    
     useEffect(() => {
  const fetchData = async () => {
    try {
      if (token && id) { // id kontrolü eklendi
        const response = await orderDetail(token, formData, id);
        const { data, order_products, order_invoice, order_delivery } = response;
        setData(data);
        setProducts(order_products);
        setIsLoading(false);
      }
    } catch (error: any) {
      showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  fetchData();
}, [token, id, formData]); // id'yi dependency array'e de ekledik
  
       console.log(recentOrders);
         console.log(products);

  const sampleOrder = {
    OrderNo: "ORD-20240123",
    date: "23 Ocak 2024",
    status: "Hazırlanıyor",
    paymentMethod: "Kredi Kartı",
    items: [
      {
        productId: 1,
        productName: "Endüstriyel Motor Yağı",
        brand: "Mobil",
        quantity: 5,
        unitPrice: 200,
        totalPrice: 1000,
        stock: { ankara: true, istanbul: false }
      },
      {
        productId: 2,
        productName: "Hidrolik Filtre",
        brand: "Bosch",
        quantity: 3,
        unitPrice: 350,
        totalPrice: 1050,
        stock: { ankara: false, istanbul: true }
      }
    ],
    subTotal: 2050, 
    kdvRate: 18,
    tax: 369,
    total: 2419
  };

  if (loading) {
    return <PageLoader />
}


  return (
    <GuestLayout>
      <NavbarWrapper />
      
      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] dark:bg-slate-900">
        <div className="relative w-full h-full">

          <div className="mx-auto my-5 container">


            <MyBreadCrumbs items={[{ href: '/basket', title: 'Sepetim' }, { title: 'Sipariş Detay' }]} />

            <div className="mt-4"><StoriesBox /></div>

            <div className="bg-white dark:bg-slate-800 px-3 py-6 rounded-xl shadow w-full mt-5">
              <div className="mb-4">
            
                <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">Sipariş Detay</h2>
              </div>

              <div className="flex flex-wrap flex-col items-center justify-center">

                <Card className="mb-6 w-full max-w-xl">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Sipariş Detayları</h2>
                  </CardHeader>
                  <CardBody>
                    <p><strong>Sipariş No:</strong> {recentOrders.id}</p>
                    <p><strong>Sipariş Tarihi:</strong> {recentOrders.order_date}</p>
                    <div>
                      <strong>Durum:</strong>
                      <Badge color={recentOrders.order_status === "Hazırlanıyor" ? "warning" : "success"} className="ml-2">
                        {recentOrders.order_status}
                      </Badge>
                    </div>
                    <p><strong>Ödeme Yöntemi:</strong> {sampleOrder.paymentMethod}</p>
                  </CardBody>
                </Card>

                <Card className=" w-full max-w-xl">
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Sipariş Edilen Ürünler</h2>
                  </CardHeader>
                  <CardBody>
                    <Table aria-label="Sipariş Ürünleri">
                      <TableHeader>
                        <TableColumn>Ürün Adı</TableColumn>
                        <TableColumn>Stok Kodu</TableColumn>
                        <TableColumn>Adet</TableColumn>
                        <TableColumn>Birim Fiyat</TableColumn>
                        <TableColumn>Toplam</TableColumn>
                        <TableColumn>Depo</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {products.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.orderproduct_title}</TableCell>
                            <TableCell>{item.orderproduct_sku}</TableCell>
                            <TableCell>{item.orderproduct_count}</TableCell>
                            <TableCell>₺ {item.orderproduct_price}</TableCell>
                            <TableCell>₺ {Number(item.orderproduct_count) * Number(item.orderproduct_price)}</TableCell>
                            <TableCell>
                              {item.ankara && <Chip variant="dot" color="success">Ankara</Chip>}
                              {item.istanbul && <Chip variant="dot" color="primary">İstanbul</Chip>}
                              {!item.ankara && !item.istanbul && (
                                <Chip variant="dot" color="danger">Stok Yok</Chip>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>

                <Card className="mt-6 w-full max-w-xl">
                  <CardBody>
                    <div className="flex justify-between">
                      <span><strong>Ara Toplam:</strong></span>
                      <span>₺ {Number(recentOrders.order_price) - Number(recentOrders.order_tax_price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>KDV:</strong></span>
                      <span>₺ {recentOrders.order_tax_price}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Genel Toplam:</span>
                      <span>₺ {recentOrders.order_price}</span>
                    </div>
                  </CardBody>

                  <CardFooter className="flex justify-between mt-6">
                    <Button color="danger" startContent={<XCircle />} isDisabled={sampleOrder.status !== "Hazırlanıyor"}>
                      Siparişi İptal Et
                    </Button>
                    <Button color="primary" startContent={<Download />}>
                      Faturayı İndir
                    </Button>
                  </CardFooter>
                </Card>

              </div>


            </div>
          </div>

        </div>
      </div>



    </GuestLayout>
  );
}
