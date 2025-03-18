import {create} from 'zustand';
import {CartItem} from './useCart';

export interface OrderItem {
  email: string;
  userName: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
  orderId: string;
}

export interface OrderState {
  allOrders: Record<string, OrderItem[]>;
  isOrderLoading: boolean;
  isOrderError: boolean;
  fetchAllOrders: (value: Record<string, OrderItem[]>) => void;
  updateOrderLoading: (value: boolean) => void;
}

export const useOrderStore = create<OrderState>(set => ({
  allOrders: {},
  isOrderLoading: false,
  isOrderError: false,
  fetchAllOrders: (value: Record<string, OrderItem[]>) =>
    set(prev => ({
      ...prev,
      allOrders: value,
      isOrderError: false,
      isOrderLoading: false,
    })),

  updateOrderLoading: (value: boolean) =>
    set(prev => ({...prev, isOrderLoading: value})),
}));

export const useOrder = () => {
  const {
    allOrders,
    isOrderLoading,
    isOrderError,
    fetchAllOrders,
    updateOrderLoading,
  } = useOrderStore(state => state);
  return {
    allOrders,
    isOrderLoading,
    isOrderError,
    fetchAllOrders,
    updateOrderLoading,
  };
};
