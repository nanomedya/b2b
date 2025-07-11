"use client";
import React, { useEffect, useState } from "react";
import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import { useAuth } from "@/context/AuthContext";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";

import {Image} from "@heroui/image";
import {Tooltip} from "@heroui/tooltip";
import {Checkbox} from "@heroui/checkbox";
import {Chip} from "@heroui/chip";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Button, ButtonGroup} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import AddBasket from "@/app/components/Items/AddBasket";

import ChooseBasket from "@/app/components/Items/ChooseBasket";
import MyStorage from "@/app/components/Elements/MyStorage";
import StoriesBox from "@/app/components/Items/StoriesBox";
import PageLoader from "@/app/components/Items/PageLoader";

export default function Basket(): JSX.Element {

  const { token, loading, currentBasketId } = useAuth();
  const basketState = useSelector((state: RootState) => state.basket);

  const [basketItems, setBasketItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [cargoPrice, setCargoPrice] = useState<number>(25);

  const depoData = [
    {
      title: "Ankara Depo",
      brut: "6,608.36",
      iskonto: "-247.04",
      toplam: "6,361.32",
      kdv: "1,272.26",
      genelToplam: "7,633.58",
      sevkiyatOptions: [
        { value: "sirket-araci", label: "Şirket Aracı" },
        { value: "kargo", label: "Kargo" },
      ],
      sevkiyatNote: null,
    },
    {
      title: "İstanbul Depo",
      brut: "10,716.34",
      iskonto: "-1,042.35",
      toplam: "9,673.99",
      kdv: "1,934.80",
      genelToplam: "11,608.79",
      sevkiyatOptions: [
        { value: "ist-kargo", label: "İst.Kargo" },
      ],
      sevkiyatNote: "Kargo peşin ödeme fatura tutarı 3500₺'dir.",
    },
  ];


  useEffect(() => {
    setBasketItems(basketState.items);
    setSelectedItems(basketState.items.map((item: any) => item.product_id));
  }, [basketState]);

  // const handleRemove = (productId: number) => {
  //   if (token && currentBasketId) {
  //     dispatch(removeFromBasketAsync({ token, productId, currentBasketId }))
  //       .unwrap()
  //       .then(() => dispatch(fetchCurrentBasket({ token, currentBasketId })))
  //       .catch((error: any) => showAlert("Oppss..!", error.message));
  //   }
  // };

  const toggleSelectAll = () => {
    if (selectedItems.length === basketItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(basketItems.map((item) => item.product_id));
    }
  };

  const selectedTotalPrice = basketItems
    .filter((item) => selectedItems.includes(item.product_id))
    .reduce((total, item) => total + Number(item.product.price), 0);

  if (loading) {
    return <PageLoader />
  }


  return (
    <GuestLayout>
      <NavbarWrapper />
      <div className="w-full py-3 mx-auto bg-[#ffefd4] dark:bg-slate-900">
        <div className="mx-auto my-5 container px-2">
          <MyBreadCrumbs items={[{ title: "Sepetim" }]} />


          <div className="mt-4"><StoriesBox /></div>

          <div className="w-full flex flex-wrap gap-3 mt-4">
            <div className="form_wrapper flex-1">
              <div className="bg-white dark:bg-slate-800 px-3 py-6 rounded-xl shadow">
                {currentBasketId ? (
                  <div>
                    <div className="font-semibold text-xl mb-3 flex justify-between">
                      <span>Sepetiniz</span>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" color="primary" onClick={toggleSelectAll}>
                          {selectedItems.length === basketItems.length ? "Tümünü Kaldır" : "Tümünü Seç"}
                        </Button>
                        <ChooseBasket />
                      </div>
                    </div>

                    {basketItems.length > 0 && (
                      <Table
                        isStriped
                        aria-label="Sepetinizdeki Ürünler"
                        className="w-full text-sm"
                      >
                        <TableHeader>
                          <TableColumn>.</TableColumn>
                          <TableColumn>Ekleyen</TableColumn>
                          <TableColumn>Stok Kodu</TableColumn>
                          <TableColumn>Ürün Adı</TableColumn>
                          <TableColumn>Marka</TableColumn>
                          <TableColumn>KDV</TableColumn>
                          <TableColumn>Liste Fiyatı</TableColumn>
                          <TableColumn>{"KDV'li Liste Fiyatı"}</TableColumn>
                          <TableColumn>İskonto</TableColumn>
                          <TableColumn>Net Fiyat</TableColumn>
                          <TableColumn>Tutar</TableColumn>
                          <TableColumn>{"KDV'li Tutar"}</TableColumn>
                          <TableColumn>Miktar</TableColumn>
                    
                          <TableColumn>Bakiye</TableColumn>
                          <TableColumn>İşlem</TableColumn>
                          <TableColumn>Tedarik</TableColumn>
                          <TableColumn>Merkez</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {basketItems.map((item) => (
                            <TableRow key={item.product_id}>
                              <TableCell>
                                <Checkbox
                                  color="warning"
                                  size="lg"
                                  isSelected={selectedItems.includes(item.product_id)}
                                  onChange={() =>
                                    setSelectedItems((prev) =>
                                      prev.includes(item.product_id)
                                        ? prev.filter((id) => id !== item.product_id)
                                        : [...prev, item.product_id]
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>{item.product.supplier}</TableCell>
                              <TableCell>{item.product.stock_no}</TableCell>
                              <TableCell>
                                <Tooltip content={<Image width={130} height={130} src={item.product.image} />}>
                                  <Image width={50} height={50} src={item.product.image} radius="sm" alt="" />
                                </Tooltip>
                                {item.product.title}
                              </TableCell>
                              <TableCell>{item.product.brand}</TableCell>
                              <TableCell>% {item.product.kdv}</TableCell>
                              <TableCell>{item.product.listPrice ?? item.product.price}</TableCell>
                              <TableCell>{item.product.listPriceWithKdv ?? item.product.price}</TableCell>
                              <TableCell>% {item.product.discount}</TableCell>
                              <TableCell>{item.product.price}</TableCell>
                              <TableCell>{item.product.total ?? item.product.price}</TableCell>
                              <TableCell>{item.product.totalWithKdv ?? item.product.price * item.product.vat}</TableCell>
                              <TableCell>{item.product.price}</TableCell>
                              
                     
                              <TableCell>{item.product?.balance}</TableCell>
                              <TableCell>
                                {item.product.stock > 1 ? (
                                  <Chip variant="dot" color="success">Var</Chip>
                                ) : (
                                  <Chip variant="dot" color="danger">Yok</Chip>
                                )}
                              </TableCell>
                              <TableCell>
                                {item.product.stock_quantity > 1 ? (
                                  <Chip variant="dot" color="success">Var</Chip>
                                ) : (
                                  <Chip variant="dot" color="danger">Yok</Chip>
                                )}
                              </TableCell>
                              <TableCell>
                                <AddBasket issingle={false} product={item.product} />
                              </TableCell>
                              
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}

                  </div>
                ) : (
                  <h3 className="font-bold mb-3 text-gray-600">Sepet Seçimi Yap</h3>
                )}
              </div>
            </div>
            <div className="form_wrapper w-full grid grid-cols-3 lg:grid-cols-4 gap-3">
              {depoData.map((depo, index) => (
                <MyStorage key={index}  {...depo} isActive={selectedTotalPrice < cargoPrice} />
              ))}

              <Card shadow='none' className="rounded-2xl mb-3 bg-warning-100">
                <CardHeader className="bg-white py-2 px-4 rounded-t-2xl">
                  <h3 className="text-lg font-semibold text-gray-700">Sepet Özeti</h3>
                </CardHeader>
                <CardBody className="p-4 space-y-3">
                  <div className="py-2 border-b">
                    <p>Toplam Ürün</p>
                    <p className="font-semibold">{selectedItems.length}</p>
                  </div>
                  <div className="py-2 border-b">
                    <p>Ara Toplam</p>
                    <p className="font-semibold">{selectedTotalPrice.toFixed(2)}</p>
                  </div>
                  <div className="py-2 border-b">
                    <p>KDV (%20)</p>
                    <p className="font-semibold">{(selectedTotalPrice * 0.2).toFixed(2)}</p>
                  </div>
                  <div className="py-2 border-b">
                    <p>Kargo Ücreti</p>
                    <p className="font-semibold">{cargoPrice.toFixed(2)}</p>
                  </div>
                  <div className="py-4 border-t font-bold text-lg">
                    <p>Toplam</p>
                    <p>{(selectedTotalPrice + cargoPrice).toFixed(2)}</p>
                  </div>
                  {selectedTotalPrice < cargoPrice && (
                    <p className="text-sm text-red-500 text-center mt-2 font-semibold">Siparişi tamamlamak için sepetinize en az 1 ürün eklemelisiniz</p>
                  )}
                </CardBody>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
