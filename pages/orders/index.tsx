"use client";
import React, { useCallback, useEffect, useState } from "react";


import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import { useAuth } from "@/context/AuthContext";

import { useMyAlert } from "@/context/MyAlertContext";
import PageLoader from "@/app/components/Items/PageLoader";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Button, ButtonGroup} from "@heroui/button";
import {Input} from "@heroui/input";
import {Pagination, PaginationItem, PaginationCursor} from "@heroui/pagination";
import Link from "next/link";
import { OrdersProps } from "../../types";
import moment from "moment";
import "moment/locale/tr"; 
import { orders } from "@/api/services/homeServices";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import { Search } from "react-feather";
import StoriesBox from "@/app/components/Items/StoriesBox";



const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Bir önceki zamanlayıcıyı temizle
    };
  }, [value, delay]);

  return debouncedValue;
};


export default function Orders(): JSX.Element {


  const { loading, token } = useAuth();
  const { showAlert } = useMyAlert();
  const [recentOrders, setData] = useState<OrdersProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState(1);
  const [searchquery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchquery, 500);



  const [formData, setFormData] = useState({
    query: "",
    sort_column: "id",
    sort_direction: "desc",
    page: 1,
    limit: 10
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await orders(token, formData);
          const { data, pagination } = response;
          setData(data);
          setTotalPage(Math.ceil(pagination.total / pagination.per_page));
          setIsLoading(false);
        }
      } catch (error: any) {
        showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    };

    fetchData();
  }, [token, formData]); // formData değiştiğinde yeniden çalıştır



  // Debounce edilen arama sorgusunu izleyerek formData'yı güncelliyoruz
  useEffect(() => {  
    if (debouncedSearchQuery) {
      setFormData((prev) => ({ ...prev, query: debouncedSearchQuery }));
    }
  }, [debouncedSearchQuery]);

  const handlePagination = (page: number) => {
    setFormData((prev) => ({ ...prev, page })); // Sayfa değişimlerini yönet
  };




  if (isLoading) {
    return <PageLoader />
  }


  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] dark:bg-slate-900">
        <div className="relative w-full h-full">

          <div className="mx-auto my-5 container">


            <MyBreadCrumbs items={[{ title: 'Siparişler' }]} />


            <div className="mt-4"><StoriesBox /></div>



            <div className="w-full mx-auto relative my-5 bg-white dark:bg-slate-800 p-3 rounded-xl shadow">

              <div className="form_wrapper relative dark:text-white">



                <Input
                  classNames={{
                    base: "max-w-full h-14 mb-5",
                    mainWrapper: "h-full",
                    input: "text-lg",
                    inputWrapper: "h-full font-semibold text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  size="lg"
                  placeholder="Ara..."
                  value={searchquery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="text-3xl text-default-400 pointer-events-none flex-shrink-0" />}
                  type="text"
                />


                <Table
                  aria-label="En Son Siparişler Tablosu"
                >
                  <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Müşteri</TableColumn>
                    <TableColumn>Şehir</TableColumn>
                    <TableColumn>Tutar</TableColumn>
                    <TableColumn>Tarih</TableColumn>
                    <TableColumn>Detay</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.order_no}>
                        <TableCell>{order.order_no}</TableCell>
                        <TableCell>{order.customer_name + ' ' + order.customer_surname}</TableCell>
                        <TableCell>{order.order_city}</TableCell>
                        <TableCell>{order.order_price}</TableCell>
                        <TableCell>{moment(order.order_date).fromNow()}</TableCell>
                        <TableCell>
                          <Link href={`/orders/${order.id}`} passHref>
                            <Button color="warning" size="sm">
                              Sipariş Detayı
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>




                <div className="flex justify-between items-center mt-4">
                  <Pagination
                    total={totalPage > 1 ? totalPage : 1}
                    initialPage={formData.page}
                    color="warning"
                    page={formData.page}
                    onChange={(newPage) => handlePagination(newPage)}
                  />
                  <div className="flex items-center dark:text-white">
                    <span className="mr-2">Kayıt Sayısı:</span>
                    <select
                      className="border rounded p-2 dark:border-slate-700"
                      value={formData.limit}
                      onChange={(e) => setFormData((prev) => ({ ...prev, limit: Number(e.target.value) }))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
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