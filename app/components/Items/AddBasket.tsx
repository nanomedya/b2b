"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { AlertOctagon, Minus, Plus, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasketAsync,
  fetchCurrentBasket,
  removeFromBasketAsync,
} from "@/redux/basketSlice";
import { RootState } from "@/redux/store";
import { useAuth } from "@/context/AuthContext";
import { useMyAlert } from "@/context/MyAlertContext";
import { BasketItem, RowsProps } from "@/types";

interface AddBasketProps {
  product: RowsProps;
  issingle: boolean;
  myquantity?: number;
}

const AddBasket: React.FC<AddBasketProps> = ({ product, issingle = false, myquantity = 1 }) => {
  const dispatch = useDispatch<any>();
  const { token, currentBasketId } = useAuth();
  const { showAlert } = useMyAlert();
  const basket = useSelector((state: RootState) => state.basket.items);
  const existingProduct = basket.find((item: BasketItem) => item.productId === product.id);
  const quantity = existingProduct?.quantity ?? 0;
  const stock_quantity = existingProduct?.stock_quantity ?? 0;

  const handleBasketUpdate = (count: number) => {
    const productId = product.id;
    if (token && currentBasketId) {
      dispatch(addToBasketAsync({ token, productId, count, currentBasketId }))
        .unwrap()
        .then(() => dispatch(fetchCurrentBasket({ token, currentBasketId })))
        .catch((error: any) => showAlert("Oppss..!", error.message));
    }
  };

  const handleRemoveFromBasket = () => {
    const productId = Number(product.id);
    if (token && currentBasketId) {
      dispatch(removeFromBasketAsync({ token, productId, currentBasketId }))
        .unwrap()
        .then(() => dispatch(fetchCurrentBasket({ token, currentBasketId })))
        .catch((error: any) => showAlert("Oppss..!", error.message));
    }
  };

  return (
    <>
      {issingle ? (
        quantity === 0 && stock_quantity === 0  ? (
          !product.quantity && !product.stock_quantity ? (
            <Tooltip
              color="warning"
              showArrow
              className="bg-gray-900 text-white"
              content="Stokta yok"
            >
              <Button
                isIconOnly
                radius="md"
                size="md"
                className="absolute right-0 top-0 z-10 bg-[#ffefd4] text-black"
              >
                <AlertOctagon />
              </Button>
            </Tooltip>
          ) : (
            <Button
                onClick={() => handleBasketUpdate(myquantity)}
                radius="lg"
                size="lg"
                className="bg-[#ffefd4] text-black px-3 font-semibold"
              >
                Sepete Ekle
              </Button>
          )
        ) : (
          <Button
            isIconOnly
            radius="lg"
            onClick={() => handleBasketUpdate(myquantity)}
            className="absolute right-0 top-0 z-10 bg-[#ffefd4] text-black"
          >
            <Plus />
          </Button>
        )
      ) : (
        <div className="grid grid-cols-3 w-32 gap-0">
          {quantity === 0 ? (
            <div className="col-span-12">
               <Button
              isIconOnly
              radius="sm"
              size="sm"
              onClick={() => handleBasketUpdate(myquantity)}
              className="bg-[#ffefd4] text-black px-3 font-semibold text-right"
            >
              <Plus />
            </Button>
            <Button
                onClick={() =>  handleBasketUpdate(-1) }
                radius="sm"
                size="sm"
                isIconOnly
                fullWidth
                className="bg-[#ffefd4] text-black px-3 font-semibold text-right mx-3"
              >
                {quantity > -1 ? <Minus  /> : <Trash  />}
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={() => quantity > 1 ? handleBasketUpdate(-1) : handleRemoveFromBasket()}
                radius="sm"
                size="sm"
                isIconOnly
                fullWidth
                className="bg-[#ffefd4] dark:bg-slate-700 dark:text-white text-black rounded-l-lg rounded-r-none w-full"
              >
                {quantity > 1 ? <Minus size={15} /> : <Trash size={15} />}
              </Button>
              <span className="text-md bg-gray-100 dark:bg-slate-600 dark:text-white text-black font-semibold flex justify-center items-center">
                {quantity}
              </span>
              <Button
                onClick={() => handleBasketUpdate(myquantity)}
                radius="sm"
                size="sm"
                isIconOnly
                className="bg-[#ffefd4] dark:bg-slate-700 dark:text-white text-black rounded-r-lg rounded-l-none w-full"
              >
                <Plus size={15} />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddBasket;