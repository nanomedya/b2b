import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BasketState } from "@/types";
import {
  getBasket,
  addToBasket,
  removeFromBasket,
  emptyBasket,
  deleteBasket,
  setCurrentBasket as setCurrentBasketService,
} from "@/api/services/basketService";

// Initial State
const initialState: BasketState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Interfaces
interface AddToBasketPayload {
  token: string;
  productId: number;
  count: number;
  currentBasketId: number;
}

interface BasketResponse {
  success: boolean;
  message: string;
}

// Async Thunks
export const setCurrentBasket = createAsyncThunk(
  "basket/setCurrentBasket",
  async ({ token, basketId }: { token: string; basketId: number }) => {
    const response = await setCurrentBasketService(token, basketId);
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to set current basket");
    }
    return basketId;
  }
);

export const fetchCurrentBasket = createAsyncThunk(
  "basket/fetchCurrentBasket",
  async ({ token, currentBasketId }: { token: string; currentBasketId: number }) => {
    const response = await getBasket(token, currentBasketId);
    return response;
  }
);

export const addToBasketAsync = createAsyncThunk<
  BasketResponse,
  AddToBasketPayload,
  { rejectValue: { message: string; stack?: string } }
>(
  "basket/addToBasket",
  async ({ token, productId, count, currentBasketId }, { rejectWithValue }) => {
    try {
      const response: any = await addToBasket(token, productId, count, currentBasketId);
      if (!response || response.error || !response.success) {
        return rejectWithValue({
          message: response?.error?.message || response?.message || "Failed to add to basket",
          stack: response?.error?.stack || "",
        });
      }
      return response;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Network error occurred.",
        stack: error.stack,
      });
    }
  }
);

export const removeFromBasketAsync = createAsyncThunk(
  "basket/removeFromBasket",
  async ({ token, productId, currentBasketId }: { token: string; productId: number; currentBasketId: number }) => {
    const response = await removeFromBasket(token, productId, currentBasketId);
    return response;
  }
);

export const emptyBasketAsync = createAsyncThunk(
  "basket/emptyBasket",
  async ({ token, currentBasketId }: { token: string, currentBasketId: number }) => {
    const response = await emptyBasket(token, currentBasketId);
    return response;
  }
);

export const deleteBasketAsync = createAsyncThunk(
  "basket/emptyBasket",
  async ({ token, dialogId }: { token: string, dialogId: number }) => {
    const response = await deleteBasket(token, dialogId);
    return response;
  }
);

// Slice
const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentBasket.fulfilled, (state, action) => {
        if (action.payload) {
          const { data } = action.payload;
          if (data && data.basket) {
            state.items = data.basket.items;
            state.totalItems = data.totalItems;
            state.totalPrice = data.totalPrice;
          }
        }
      })
      .addCase(addToBasketAsync.fulfilled, (state, action) => {
        // Optional: Update basket totals if necessary
      })
      .addCase(removeFromBasketAsync.fulfilled, (state, action) => {
        // Optional: Update basket totals if necessary
      })
      .addCase(emptyBasketAsync.fulfilled, (state) => {
        state.totalItems = 0;
        state.totalPrice = 0;
        state.items = [];
      });
  },
});

// Export Actions and Reducer
export default basketSlice.reducer;
