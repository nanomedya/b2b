"use client"

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import {
  Table, TableHeader, TableBody, TableColumn, TableRow, TableCell
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Pagination } from "@heroui/pagination";
import { Heart } from 'react-feather';
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/app/components/Items/PageLoader";
import { useEffect, useState } from "react";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import StoriesBox from "@/app/components/Items/StoriesBox";
import { FavoriteProps } from "@/types";

const Favorites = () => {
  const { user, loading, token } = useAuth();

  const [data, setFavorites] = useState<FavoriteProps[]>([
    { id: 1, title: "Zoe Vantilatör Hortumu 1", date: "01.01.2025 14:50" },
    { id: 2, title: "Zoe Vantilatör Hortumu 2", date: "01.01.2025 14:50" },
    { id: 3, title: "Zoe Vantilatör Hortumu 3", date: "01.01.2025 14:50" },
    { id: 4, title: "Zoe Vantilatör Hortumu 4", date: "01.01.2025 14:50" },
    { id: 5, title: "Zoe Vantilatör Hortumu 5", date: "01.01.2025 14:50" },
    { id: 6, title: "Zoe Vantilatör Hortumu 6", date: "01.01.2025 14:50" },
  ]);

  const [recentOrders, setRecentOrders] = useState<FavoriteProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    query: "",
    sort_column: "id",
    sort_direction: "desc",
    page: 1,
    limit: 3
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          // Sayfalama için veri dilimle
          const startIndex = (formData.page - 1) * formData.limit;
          const endIndex = startIndex + formData.limit;
          const paginatedData = data.slice(startIndex, endIndex);
          setRecentOrders(paginatedData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();
  }, [token, formData, data]); // data eklendi ki güncelleme sonrası yeniden işlesin

  const removeFromFavorites = (id: number) => {
    const updated = data.filter((item) => item.id !== id);
    setFavorites(updated);
  };

  const handlePagination = (page: number) => {
    setFormData((prev) => ({ ...prev, page }));
  };

  if (loading || isLoading) return <PageLoader />;

  return (
    <GuestLayout>
      <NavbarWrapper />

      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
        <div className="relative w-full h-full my-10">
          <div className="mx-auto container">
            <MyBreadCrumbs items={[{ title: "Favoriler" }]} />
            <div className="mt-4"><StoriesBox /></div>

            <Card className="w-full mx-auto mt-5">
              <CardHeader className="text-lg font-semibold flex items-center gap-2">
                <Heart size={20} /> Favori Ürünler
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHeader>
                    <TableColumn>Ürün Adı</TableColumn>
                    <TableColumn>Tarih</TableColumn>
                    <TableColumn>İşlem</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onPress={() => removeFromFavorites(item.id)}>Favoriden Kaldır</Button>
                            <Button size="sm" color="warning">Sepete Ekle</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between items-center mt-4">
                  <Pagination
                    total={Math.ceil(data.length / formData.limit)}
                    initialPage={formData.page}
                    color="warning"
                    page={formData.page}
                    onChange={handlePagination}
                  />
                  <div className="flex items-center dark:text-white">
                    <span className="mr-2">Kayıt Sayısı:</span>
                    <select
                      className="border rounded p-2 dark:border-slate-700"
                      value={formData.limit}
                      onChange={(e) => setFormData((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>

              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Favorites;
