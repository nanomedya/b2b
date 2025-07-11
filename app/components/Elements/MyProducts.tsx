"use client"
import React, { useEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Button, ButtonGroup } from "@heroui/button";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Pagination, PaginationItem, PaginationCursor } from "@heroui/pagination";
import { Tooltip } from "@heroui/tooltip";
import { Tabs, Tab } from "@heroui/tabs";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Info, Eye, RefreshCw, Plus, Minus, Trash } from "react-feather";
import { TABLE_DATA } from "@/data/data";
import { ColumnsProps, RowsProps } from "@/types";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";

import { useDisclosure } from "@nextui-org/react";
import MyInfoTable from "./MyInfoTable";
import SearchBox from "../Items/Search";
import MyOptionsTable from "./MyOptionsTable";
import MyGenelInfoTable from "./MyGenelInfoTable";
import MyOemTable from "./MyOemTable";
import MyCarsTable from "./MyCarsTable";
import MyBrandsTable from "./MyBrandsTable";
import { productSearch } from "@/api/services/homeServices";
import { useAuth } from "@/context/AuthContext";
import AddBasket from "../Items/AddBasket";
import StoriesBox from "../Items/StoriesBox";



export default function MyProducts() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataRow, setData] = useState<RowsProps[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});

  const [isNewColumnOpen, setIsNewColumnOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const { token } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const [TableColumns, setTableColumns] = useState<any[]>([]);
  const [newColumnName, setNewColumnName] = useState<any>("");

const [selectedProduct, setSelectedProduct] = useState<RowsProps | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);



  const [formData, setFormData] = useState({
    query: "",
    brand: "",
    instock: "",
    sort_column: "title",
    sort_direction: "desc",
    page: 1,
    limit: 10
  });

  const [totalPage, setTotalPage] = useState(1);

  // {
  //   query: search,
  //   sort_column: sortDescriptor.column,
  //   sort_direction: sortDescriptor.direction === "ascending" ? "asc" : "desc",
  //   page,
  //   limit,
  // }



  // Miktar değişikliğini yöneten fonksiyon
  const handleQuantityChange = (productId: number, value: string) => {
    const newValue = parseInt(value, 10) || 1;

    const product = dataRow.find((product) => product.id === productId);

    if (!product) {
      setErrors((prev) => ({
        ...prev,
        [productId]: false,
      }));
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [productId]: newValue,
    }));

    setSelectedQuantities((prev: any) => ({
      ...prev,
      [productId]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [productId]: newValue > product.quantity,
    }));
  };


  useEffect(() => {

    setTableColumns(TABLE_DATA.columns)

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await productSearch(token, formData); // `productSearch` API isteği yapan fonksiyon
        if (response) {
          const { data, pagination } = response;
          if (data) {
            setData(data);
            setTotalPage(Math.ceil(pagination.total / pagination.per_page));
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };


    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const brand = params.get("brand");
    const instock = params.get("instock");

    if (token && query || brand || instock) {
      fetchData();
    }
  }, [token, formData, TABLE_DATA]); // FormData değişirse tetiklenir


  const handleSortChange = (descriptor: { column: string; direction: string }) => {
    setFormData((prev) => ({
      ...prev,
      sort_column: descriptor.column, // Artık key değerini alacak
      sort_direction: descriptor.direction === "ascending" ? "asc" : "desc",
    }));
  };

  const handleNewColumn = () => {
    // setTableColumns((prev) => [
    //   ...prev, 
    //   { name: newColumnName, key: newColumnName.toLowerCase(), sortable: false }
    // ]);

    setIsNewColumnOpen(false);
  };

  const handleSearch = (query: string, brand: string, instock: "1" | "0") => {
    setFormData((prev) => ({ ...prev, query, brand, instock }));

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("query");
    currentUrl.searchParams.delete("brand");
    currentUrl.searchParams.delete("instock");

    if (query) currentUrl.searchParams.set("query", query);
    if (brand) currentUrl.searchParams.set("brand", brand);
    if (instock === "1") currentUrl.searchParams.set("instock", "1");

    window.history.pushState({}, "", currentUrl.toString());
  };





  const handlePagination = (page: number) => {
    setFormData((prev) => ({ ...prev, page }));
  };

  const checkClass = (item: any) => {
    let setClass = ' dark:text-white';
    if (Number(item.quantity) == 0) {
      setClass += ' bg-red-200 dark:bg-red-800 dark:text-white';
    }
    if (Number(item.discount) > 0) {
      setClass += ' bg-green-200 dark:bg-green-700 dark:text-white ';
    }

    return setClass;
  }

  const onCloseNewColumnModal = () => {
    setIsNewColumnOpen(false)
  }


  return (
    <div className={`flex flex-wrap gap-3 px-4`}>

      <Modal isOpen={isNewColumnOpen} onOpenChange={onCloseNewColumnModal}>
        <ModalContent className="text-black dark:text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Yeni Sütun Oluştur</ModalHeader>
              <ModalBody>
                <Input placeholder="Sütun Adı Girin" onChange={(e) => setNewColumnName(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseNewColumnModal}>
                  Kapat
                </Button>
                <Button color="primary" onPress={handleNewColumn}>
                  Kaydet
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <StoriesBox />
      <Card shadow="sm" className="w-full">

        <CardBody className="gap-6">


          <div className=" mb-4">

            <SearchBox handleSearch={handleSearch} />
          </div>
          {dataRow.length > 0 && (
            <Table aria-label="Ürün Tablosu"
              onSortChange={handleSortChange as any}
              topContent={
                <div className="flex justify-end items-center">
                  <Button onClick={() => setIsNewColumnOpen(true)}>Yeni Sütun Ekle</Button>
                </div>
              }
              bottomContent={
                isLoading ? (
                  <div className="flex w-full h-full justify-center absolute top-0 left-0 right-0 bottom-0 bg-white/80 dark:bg-black/80">
                    {<Spinner color="warning" />}
                  </div>
                ) : null
              }>
              <TableHeader>
                {TableColumns.map((col: ColumnsProps, index: any) => (
                  <TableColumn key={col.key} allowsSorting={col.sortable}>{col.name}</TableColumn>
                ))}
              </TableHeader>
              <TableBody className="dark:text-white">

                {dataRow.map((product) => (
                  <TableRow
                    key={product.id}
                    className={checkClass(product)}
                    onDoubleClick={() => {
                      setSelectedProduct(product);
                      setIsPopupOpen(true);
                    }}
                  >

                    <TableCell>
                      <Tooltip
                        color="warning"
                        showArrow
                        className="bg-gray-900 text-white"
                        content={
                          <div className="p-2">
                            {product.image ? (
                                <Image
                                  width={30}
                                  height={30}
                                  src={product.image}
                                  fallbackSrc="https://via.placeholder.com/130x130"
                                  alt=""
                                />
                              ) : null}
                          </div>
                        }
                      >
                        <Image width={30} height={30} src={product.image} alt="" fallbackSrc="https://via.placeholder.com/130x130" />
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        color="warning"
                        showArrow
                        className="bg-gray-900  text-white"
                        content={
                          <div className="px-1 py-2 text-white">
                            <div className="text-small font-bold bg-[#ffefd4] p-2 rounded-md mb-2">{product.info.title}</div>
                            <div className="relative flex flex-col flex-wrap gap-2">
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold">Kodu:</span>
                                <span className="font-semibold">{product.info.code}</span>
                              </div>
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold">Satın alınan adet:</span>
                                <span className="font-semibold">{product.info.unit_of_purchased}</span>
                              </div>
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold">{"KDV&#39;siz adet fiyatı:"}</span>
                                <span className="font-semibold">{product.info.unit_price_excluding_vat} {product.info.currency}</span>
                              </div>
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold text-[#ffa200]">{"KDV&#39;li adet fiyatı:"}</span>
                                <span className="font-semibold">{product.info.unit_price_including_vat} {product.info.currency}</span>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <Button isIconOnly variant="flat">
                          <Info />
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button isIconOnly variant="flat" onPress={onOpen}>
                        <Eye />
                      </Button> 
                    </TableCell>
                    <TableCell>{product.city}</TableCell>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.manufacturer}</TableCell>
                    <TableCell>{product.oemNo}</TableCell>
                    {/*<TableCell>
                      <Chip color={product.izmir ? "success" : "danger"}>
                        {product.izmir ? "Var" : "Yok"}
                      </Chip>
                    </TableCell>*/}
                   

                    {/*<TableCell>
                      <Chip color={product.firstIndustry ? "success" : "danger"}>
                        {product.firstIndustry ? "Var" : "Yok"}
                      </Chip>
                    </TableCell>*/}

                    <TableCell>
                      {product.discount ? (
                        <Chip color="warning">
                          {product.discount}
                        </Chip>
                      ) : (
                        '-'
                      )}
                    </TableCell>

                    <TableCell>
                      {product.list_price}
                    </TableCell>

                    <TableCell>
                      {product.list_price_tl}
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        color="warning"
                        showArrow
                        className="bg-gray-900"
                        content={
                          <div className="px-1 py-2 text-white">
                            <div className="text-small font-bold bg-[#ffefd4] p-2 rounded-md mb-2">{product.priceExclVat.title}</div>
                            <div className="relative flex flex-col flex-wrap gap-2">
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold">Kodu:</span>
                                <span className="font-semibold">{product.priceExclVat.retail_price_vat_included}</span>
                              </div>
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold">Havale Fiyatı KDV Dahil:</span>
                                <span className="font-semibold">{product.priceExclVat.eft_price_vat_included}</span>
                              </div>
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold">K.K Tek Çekim KDV Dahil:</span>
                                <span className="font-semibold">{product.priceExclVat.kk_single_payment_vat_included} {product.info.currency}</span>
                              </div>
                              <div className="item_wrap text-tiny">
                                <span className="font-semibold text-[#ffa200]">K.K Taksitli KDV Dahil:</span>
                                <span className="font-semibold">{product.priceExclVat.kk_installments_payment_vat_included} {product.info.currency}</span>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        {product.priceExclVat.value}
                      </Tooltip>
                    </TableCell>

                    <TableCell>{product.priceInclVat}</TableCell>
                     <TableCell>
                      <Chip color={product.quantity > 1 ? "success" : "danger"}>
                        {product.quantity > 1 ? "Var" : "Yok"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip color={product.stock_quantity > 1 ? "success" : "danger"}>
                        {product.stock_quantity > 1 ? "Var" : "Yok"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          onClick={() => {
                            const current = quantities[product.id] || 1;
                            if (current > 1) {
                              handleQuantityChange(product.id, String(current - 1));
                            } else {
                              handleQuantityChange(product.id, "0"); // Veya sıfır değeri, senin mantığına göre
                            }
                          }}
                          radius="sm"
                          size="sm"
                          isIconOnly
                          className="bg-[#fff] dark:bg-slate-700 dark:text-white text-black rounded-l-lg rounded-r-none mr-2"
                        >
                          <Minus />
                        </Button>

                        <Input
                          value={String(quantities[product.id] || 1)}
                          isDisabled={!product.quantity}
                          isInvalid={errors[product.id] || false}
                          placeholder={`Stok: ${product.quantity}`}
                          min={1}
                       //   width={100}
                         // max={product.quantity}
                         // maxLength={3}
                        //  className="text-center"
                         // errorMessage={errors[product.id] ? "Stoktan olmayan bir değer girdiniz" : ""}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        />

                        <Button
                          onClick={() => {
                            const current = quantities[product.id] || 1;

                              handleQuantityChange(product.id, String(current + 1));
                           
                          }}
                          radius="sm"
                          size="sm"
                          isIconOnly
                          className="bg-[#fff] dark:bg-slate-700 dark:text-white text-black rounded-r-lg rounded-l-none  mr-2"
                        >
                          <Plus />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Tooltip content="Sepete Ekle" className="text-white" color="warning" showArrow>
                        <AddBasket issingle={true} product={product} myquantity={selectedQuantities[product.id] || 1} />
                      </Tooltip>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {dataRow.length > 0 && (
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
                  <option value={10}>10</option>
                  <option value={1000}>1000</option>
                  <option value={2500}>2500</option>
                  <option value={10000}>10000</option>
                </select>
              </div>
            </div>
          )}


          <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="text-gray-800">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Deneme Ürün</ModalHeader>
                  <ModalBody>


                    <div className="flex w-full flex-col">
                      <Tabs aria-label="Options">
                        <Tab key="tab1" title="Önceki Alımlar">
                          <MyInfoTable />
                        </Tab>
                        <Tab key="tab2" title="Alternatifler">
                          <MyOptionsTable />
                        </Tab>
                        <Tab key="tab4" title="Genel Bilgiler">
                          <MyGenelInfoTable />
                        </Tab>
                        <Tab key="tab5" title="OEM Kodları">
                          <MyOemTable />
                        </Tab>
                        <Tab key="tab6" title="Rakip Kodlar">
                          <MyOemTable />
                        </Tab>
                        <Tab key="tab7" title="Araç">
                          <MyCarsTable />
                        </Tab>
                        <Tab key="tab8" title="OEM">
                          <MyOemTable />
                        </Tab>
                        <Tab key="tab9" title="Rakip Kod">
                          <MyOemTable />
                        </Tab>
                        <Tab key="tab10" title="Markalar">
                          <MyBrandsTable />
                        </Tab>
                      </Tabs>
                    </div>


                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Kapat
                    </Button>
                    <Button color="warning" className="text-white" onPress={onClose}>
                      Sepete Ekle
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>


        </CardBody>
      </Card>

      {isPopupOpen && selectedProduct && (
  <Modal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
    <ModalContent className="bg-gradient-to-br from-gray-100 to-gray-300 text-black">
      <ModalHeader className="bg-yellow-300 text-center text-sm font-bold py-2 rounded-t">
        Sepet Ürün Düzeltme
      </ModalHeader>
      <ModalBody className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Görsel */}
          <div className="flex justify-center">
            <img
              src={selectedProduct.image || "https://via.placeholder.com/150"}
              alt={selectedProduct.name}
              className="w-[150px] h-[150px] border border-black"
            />
          </div>

          {/* Bilgi */}
          <div className="flex-1 space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Stok Kodu:</span>
              <span>{selectedProduct.barcode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">İskonto:</span>
              <span>--</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">KDV'siz Net Fiyat:</span>
              <span>{selectedProduct.priceExclVat?.value || selectedProduct.list_price} ₺</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#222]">KDV'li Net Fiyat:</span>
              <span>{selectedProduct.priceInclVat} ₺</span>
            </div>

            {/* Ürün adı */}
            <div className="mt-4 font-bold uppercase text-xs leading-5 tracking-wide">
              {selectedProduct.name}
            </div>

            {/* OEM Kodları */}
            {selectedProduct.oemNo && (
              <div className="mt-2 text-xs font-mono bg-white/70 p-2 rounded border max-h-[80px] overflow-y-auto">
                {selectedProduct.oemNo
                  .split(/[\s,;]+/)
                  .filter(Boolean)
                  .map((code, idx) => (
                    <div key={idx}>{code}</div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="flex items-center justify-between px-4 pb-4">
  {/* İptal Butonu */}
  <Button
    color="danger"
    className="bg-red-600 text-white"
    onClick={() => setIsPopupOpen(false)}
  >
    İptal
  </Button>

  {/* Miktar Girişi */}
  <div className="flex items-center justify-center">
                        <Button
                          onClick={() => {
                            const current = quantities[selectedProduct.id] || 1;
                            if (current > 1) {
                              handleQuantityChange(selectedProduct.id, String(current - 1));
                            } else {
                              handleQuantityChange(selectedProduct.id, "0"); // Veya sıfır değeri, senin mantığına göre
                            }
                          }}
                          radius="sm"
                          size="sm"
                          isIconOnly
                          className="bg-[#fff] dark:bg-slate-700 dark:text-white text-black rounded-l-lg rounded-r-none mr-2"
                        >
                          <Minus />
                        </Button>

                        <Input
                          value={String(quantities[selectedProduct.id] || 1)}
                          isDisabled={!selectedProduct.quantity}
                          isInvalid={errors[selectedProduct.id] || false}
                          placeholder={`Stok: ${selectedProduct.quantity}`}
                          min={1}
                       //   width={100}
                         // max={product.quantity}
                         // maxLength={3}
                        //  className="text-center"
                         // errorMessage={errors[product.id] ? "Stoktan olmayan bir değer girdiniz" : ""}
                          onChange={(e) => handleQuantityChange(selectedProduct.id, e.target.value)}
                        />

                        <Button
                          onClick={() => {
                            const current = quantities[selectedProduct.id] || 1;

                              handleQuantityChange(selectedProduct.id, String(current + 1));
                           
                          }}
                          radius="sm"
                          size="sm"
                          isIconOnly
                          className="bg-[#fff] dark:bg-slate-700 dark:text-white text-black rounded-r-lg rounded-l-none  mr-2"
                        >
                          <Plus />
                        </Button>
                      </div>

  {/* Düzelt Butonu */}
  <Tooltip content="Sepete Ekle" className="text-white" color="warning" showArrow>
    <AddBasket issingle={true} product={selectedProduct} myquantity={selectedQuantities[selectedProduct.id] || 1} />
  </Tooltip>
</ModalFooter>

    </ModalContent>
  </Modal>
)}



    </div>

  );
}
