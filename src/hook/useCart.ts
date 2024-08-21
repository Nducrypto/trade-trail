import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {ProductInterface} from './useProducts';
import * as localStorage from '../controller/cart';
import {cartKey} from '../config/appConfig';

export interface CartItem extends ProductInterface {
  quantity: number;
  totalPrice: number;
  date: string;
  selectedSize: string;
}

export type CartState = {
  items: Record<string, CartItem>;
  subTotal: number;
  savedForLaterItems: CartItem[];
  storeItemToCart: (product: CartItem) => void;
  deleteItemInCart: (value: string) => void;
  updateSavedForLater: (value: CartItem) => void;
  updateItemQuantity: (value: CartItem, quantity: number) => void;
  manageSavedItem: (value: CartItem, type: string) => void;
  clearCart: () => void;
  loadCartStateFromStorage: () => void;
};
export const useCartStore = create<CartState>(set => ({
  items: {},
  subTotal: 0,
  savedForLaterItems: [],

  storeItemToCart: (product: CartItem) =>
    set((prev: CartState) => {
      const productId = product.productId;
      const newState = {...prev};
      newState.items = {...newState.items};
      newState.items[productId] = {...product};
      newState.subTotal += newState.items[productId].totalPrice;
      localStorage.updateStateInStorage(newState);
      return newState;
    }),
  deleteItemInCart: (productId: string) =>
    set((prev: CartState) => {
      const newState = {...prev};
      newState.items = {...newState.items};
      newState.subTotal -= newState.items[productId].totalPrice;
      delete newState.items[productId];
      localStorage.updateStateInStorage(newState);

      return newState;
    }),
  updateItemQuantity: (product: CartItem, quantity: number) =>
    set((prev: CartState) => {
      const productId = product.productId;

      const newState = {...prev};
      newState.items = {
        ...newState.items,
        [productId]: {
          ...newState.items[productId],
          totalPrice: newState.items[productId].price * quantity,
          quantity: quantity,
        },
      };

      newState.subTotal = Object.values(newState.items).reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      localStorage.updateStateInStorage(newState);

      return newState;
    }),
  updateSavedForLater: (product: CartItem) =>
    set((prev: CartState) => {
      const newState = {...prev};
      newState.savedForLaterItems = [...newState.savedForLaterItems, product];
      localStorage.updateStateInStorage(newState);

      return newState;
    }),
  clearCart: () => {
    set({
      items: {},
      subTotal: 0,
      savedForLaterItems: [],
    });
    localStorage.clearCartFromStorage();
  },

  manageSavedItem: (product: CartItem, type: string) => {
    const isDelete = type === 'delete';
    const {productId} = product;

    set((prev: CartState) => {
      const newState = {...prev};
      newState.savedForLaterItems = newState.savedForLaterItems.filter(
        item => item.productId !== productId,
      );

      if (isDelete) {
        localStorage.updateStateInStorage(newState);
      } else {
        newState.items = {
          ...newState.items,
          [productId]: {...product},
        };
        newState.subTotal += product.totalPrice;
        localStorage.updateStateInStorage(newState);
      }

      return newState;
    });
  },

  loadCartStateFromStorage: async () => {
    try {
      const storedCartState = await AsyncStorage.getItem(cartKey);
      if (storedCartState !== null) {
        const parsedCartState = JSON.parse(storedCartState);
        set(() => ({
          items: parsedCartState.items,
          subTotal: parsedCartState.subTotal,
          savedForLaterItems: parsedCartState.savedForLaterItems,
        }));
      }
    } catch (error) {}
  },
}));

export const useCart = () => {
  const {
    items,
    subTotal,
    savedForLaterItems,
    loadCartStateFromStorage,
    storeItemToCart,
    deleteItemInCart,
    updateSavedForLater,
    updateItemQuantity,
    manageSavedItem,
    clearCart,
  } = useCartStore(state => state);

  useEffect(() => {
    loadCartStateFromStorage();
  }, []);

  return {
    items,
    subTotal,
    savedForLaterItems,
    storeItemToCart,
    deleteItemInCart,
    updateSavedForLater,
    updateItemQuantity,
    manageSavedItem,
    clearCart,
  };
};
