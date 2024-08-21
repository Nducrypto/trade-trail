import {cartKey} from '../config/appConfig';
import {CartState} from '../hook/useCart';

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function updateStateInStorage(newState: CartState) {
  try {
    const newStateJSON = JSON.stringify(newState);
    AsyncStorage.setItem(cartKey, newStateJSON);
  } catch (error) {
    throw new Error('failed to update in storage');
  }
}
export async function clearCartFromStorage() {
  try {
    await AsyncStorage.removeItem(cartKey);
  } catch (error) {
    throw error;
  }
}
