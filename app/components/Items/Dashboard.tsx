import React, { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import Link from "next/link";
import { useMyAlert } from "@/context/MyAlertContext";
import { useAuth } from "@/context/AuthContext";
import { OrdersProps } from "@/types";
import moment from "moment";
import "moment/locale/tr";
import { orders } from "@/api/services/homeServices";

const Dashboard = () => {

    const { token } = useAuth(); 
    const { showAlert } = useMyAlert();
    const [recentOrders, setData] = useState<OrdersProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
 

    
      const [formData, setFormData] = useState({
        query: "",
        sort_column: "id",
        sort_direction: "desc",
        page: 1,
        limit: 5
      });
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await orders(token, formData);
            const { data, pagination } = response;
            setData(data);
            setIsLoading(false);
          } catch (error: any) {
            showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
          }
        };
    
        fetchData();
      }, []);



    const mostOrderedProducts = [
        { id: 1, product: "Telefon", orders: 23 },
        { id: 2, product: "Laptop", orders: 15 },
        { id: 3, product: "Tablet", orders: 12 },
        { id: 4, product: "Monitör", orders: 10 },
        { id: 5, product: "Kamera", orders: 8 },
    ];

 

    return (
        <div className="px-4">

            {/* Tables */}
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders Table */}
                <Card shadow="none">
                    <CardHeader>
                        <span className="text-xl text-gray-800 dark:text-white font-bold inline-block">En Son Siparişler</span>
                    </CardHeader>
                    <CardBody>
                        <Table
                            aria-label="En Son Siparişler Tablosu"
                        >
                            <TableHeader>
                                <TableColumn>No</TableColumn>
                                <TableColumn>Müşteri</TableColumn>
                                <TableColumn>Şehir</TableColumn>
                                <TableColumn>Tutar</TableColumn>
                                <TableColumn>Tarih</TableColumn>
                                <TableColumn>Kargom</TableColumn>
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
                                            <Link className="text-blue-600" href="/">Kargom nerede?</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                {/* Most Ordered Products Table */}
                <Card shadow="none">
                    <CardHeader>
                        <span className="text-xl text-gray-800 dark:text-white font-bold inline-block">En Çok Sipariş Verilenler</span>
                    </CardHeader>
                    <CardBody>
                        <Table
                            aria-label="En Çok Siparişler Tablosu"
                        >
                            <TableHeader>
                                <TableColumn>Ürün</TableColumn>
                                <TableColumn>Sipariş Adedi</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {mostOrderedProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.product}</TableCell>
                                        <TableCell>{product.orders}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
