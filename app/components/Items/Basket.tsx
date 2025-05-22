"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Badge} from "@heroui/badge";
import {Button, ButtonGroup} from "@heroui/button";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";

import { ShoppingBag } from "react-feather";
import Link from "next/link";

import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchCurrentBasket,
  removeFromBasketAsync,
  emptyBasketAsync,
} from "@/redux/basketSlice";
import { basketList } from "@/api/services/basketService";
import { useAuth } from "@/context/AuthContext";
import { useMyAlert } from "@/context/MyAlertContext";

import AddBasket from "./AddBasket";
import ChooseBasket from "./ChooseBasket";

const Basket: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useMyAlert();
  const { token, currentBasketId, user } = useAuth();

  const basketState = useSelector((state: RootState) => state.basket);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const [basketItems, setBasketItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  

  const fetchBaskets = async () => {
    try {
      if (!token) return;

      const response = await basketList(token);
      
      const baskets = response.data;

      const activeBasket =
        baskets.find((basket: any) => basket.id === currentBasketId) || baskets[0];

      setSelectedKeys(new Set([activeBasket.id.toString()]));
    } catch (error) {
      console.error("Error fetching basket list:", error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && currentBasketId) fetchBaskets();
  };

  const handleRemove = (productId: number) => {
    if (token && currentBasketId) {
      dispatch(removeFromBasketAsync({ token, productId, currentBasketId }))
        .unwrap()
        .then(() => dispatch(fetchCurrentBasket({ token, currentBasketId })))
        .catch((error) => showAlert("Oppss..!", error.message));
    }
  };

  const handleClearBasket = () => {
    if (token && currentBasketId) {
      dispatch(emptyBasketAsync({ token, currentBasketId }));
    }
  };

  useEffect(() => {
    if (token && currentBasketId) {
      dispatch(fetchCurrentBasket({ token, currentBasketId }));
    }
  }, [token, currentBasketId, dispatch]);

  useEffect(() => {
    setBasketItems(basketState.items);
    setTotalItems(basketState.totalItems);
    setTotalPrice(basketState.totalPrice);
  }, [basketState]);

  return (
    <NavbarItem className="hidden lg:flex relative">
      <Popover placement="bottom-end" onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <div className="flex items-center shadow cursor-pointer">
            <div className="bg-yellow-100 dark:bg-slate-700 dark:text-white py-2 px-3 h-[45px]">
              <Badge
                color="danger"
                isInvisible={totalItems === 0}
                content={totalItems}
                size="lg"
              >
                <ShoppingBag />
              </Badge>
            </div>
            <div className="bg-yellow-200 dark:bg-slate-700 dark:text-white py-2 px-3 h-[45px] font-semibold">
              ₺ {totalPrice.toFixed(2)}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-4 w-72">
          {currentBasketId ? (
            <div>
              <h3 className="font-bold mb-3 text-gray-600 dark:text-white flex justify-between items-center">
                <span>Sepetiniz</span>
                <ChooseBasket />
              </h3>

              <div className="space-y-2 overflow-y-auto max-h-96 pr-3">
                {basketItems.length > 0 ? (
                  basketItems.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-black dark:text-white">
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          ₺ {item.product.price}
                        </p>
                        <div className="flex items-center space-x-2">
                          <AddBasket issingle={false} product={item.product} />
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400"
                      >
                        Sil
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-white text-center text-sm">
                    Henüz Sepetinize Ürün Eklemediniz
                  </p>
                )}
              </div>

              {basketItems.length > 0 && (
                <div className="mt-4">
                  <div className="grid grid-cols-3 items-center">
                    <Link
                      href="/basket"
                      className="col-span-2 bg-warning-500 text-black font-bold rounded-l-lg px-2 py-2 flex justify-center items-center h-[40px]"
                    >
                      Sepete Git
                    </Link>
                    <div className="font-semibold rounded-r-lg border border-warning-500 text-black dark:text-white px-2 py-2 flex justify-center items-center h-[40px]">
                      ₺ {totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <Button className="mt-5" variant="flat" fullWidth onClick={handleClearBasket}>
                    Sepeti Boşalt
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="font-bold mb-3 text-gray-600">Sepet Seçimi Yap</h3>
              <Button onClick={() => handleOpenChange(!isOpen)}>Sepet Seç</Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </NavbarItem>
  );
};

export default Basket;