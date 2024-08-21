import {Data} from '../components/Cart/Cart';
import {firestore, collection, onSnapshot} from '../config/firebase';
import {useOrder, OrderItem, OrderState} from '../hook/useOrder';
import {createInDatabase} from '../utils/firebaseUtils';
import {ORDERS} from '@env';
import {useEffect} from 'react';
import {GlobalStateProps} from '../hook/useGlobal';
import {CartState} from '../hook/useCart';

const orderRoute = ORDERS;

interface CreateOrderParams {
  orderData: Data;
  orderState: OrderState;
  globalState: GlobalStateProps;
  cartState: CartState;
}

export const createOrder = async ({
  orderData,
  orderState,
  globalState,
  cartState,
}: CreateOrderParams) => {
  try {
    orderState.updateOrderLoading(true);
    const orderId = await createInDatabase(orderRoute, orderData);

    if (orderId) {
      orderState.updateOrderLoading(false);
      cartState.clearCart();
      globalState.toastSuccess('Order placed successfully');
    }
  } catch (error) {
    globalState.toastError('Failed to place order');
  }
};

export const fetchAllOrders = () => {
  const orders = useOrder();
  useEffect(() => {
    orders.updateOrderLoading(true);

    const listenForChangeUsers = onSnapshot(
      collection(firestore, orderRoute),
      snapshot => {
        const allOrders: Record<string, OrderItem[]> = {};

        snapshot.forEach(doc => {
          const data = {
            ...(doc.data() as OrderItem),
            orderId: doc.id,
          };
          if (!allOrders[data.email]) {
            allOrders[data.email] = [];
          }
          allOrders[data.email].push(data);
        });
        orders.fetchAllOrders(allOrders);
      },
    );
    return () => {
      listenForChangeUsers();
    };
  }, []);
};
