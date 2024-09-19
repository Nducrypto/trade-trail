import React, {useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {useOrder, OrderItem} from '../../hook/useOrder';
import {orderStyles} from './orderStyles';
import {useUser} from '../../hook/useUser';
import {mergeSort} from '../../utils/sortUtils';
import {fetchAllOrders} from '../../controller/order';

const Order = () => {
  fetchAllOrders();
  const {isOrderLoading, allOrders} = useOrder();
  const {currentUser} = useUser();
  const email = currentUser?.email ?? '';
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

  const getAndSortOrderHistory = () => {
    const data = allOrders[email] || [];
    const sortedArray = mergeSort(data, (a: OrderItem, b: OrderItem) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return sortedArray;
  };
  const orderHistory = getAndSortOrderHistory();

  const handleRefresh = () => {
    setIsRefreshed(true);
    setTimeout(() => {
      setIsRefreshed(false);
    }, 3000);
  };
  const length = orderHistory.length;
  return (
    <FlatList
      data={orderHistory}
      renderItem={({item: order, index}) => (
        <View key={order?.orderId} style={orderStyles.orderCard}>
          <View style={orderStyles.orderHeader}>
            <View style={orderStyles.items}>
              <Text style={orderStyles.orderHeaderText}>
                Order {length - index}
              </Text>
              <Text style={orderStyles.subtotal}>
                ₦ {Intl.NumberFormat().format(order?.subTotal)}
              </Text>
            </View>
            <Text style={orderStyles.title}> {order?.userName}</Text>
            <Text style={orderStyles.title}> {order?.status}</Text>
          </View>
          <View style={orderStyles.orderDetails}>
            <View style={orderStyles.itemsList}>
              <View style={orderStyles.items}>
                <FlatList
                  testID="order-flatlist"
                  data={order.items}
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={orderStyles.item}>
                        <Text style={orderStyles.itemText}>
                          Item {index + 1}
                        </Text>
                        <Text style={orderStyles.sharedText}>{item.title}</Text>
                        <Text style={orderStyles.itemPrice}>
                          &#8358; {Intl.NumberFormat().format(item.price)}
                        </Text>
                        <Text style={orderStyles.sharedText}>
                          Quantity: {item.quantity}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
      scrollEnabled={length > 2}
      keyExtractor={item => item.orderId}
      contentContainerStyle={orderStyles.orderList}
      ListEmptyComponent={
        <View style={orderStyles.noOrderContainer}>
          {!isOrderLoading && (
            <Text style={orderStyles.noOrderHeader}>
              No order placed by you
            </Text>
          )}
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshed}
          onRefresh={handleRefresh}
          colors={['green', 'yellow']}
        />
      }
    />
  );
};

export default Order;
