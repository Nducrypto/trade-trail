import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStartedStorageKey} from '../config/appConfig';
import {create} from 'zustand';
import {useEffect} from 'react';

interface GetStartedProps {
  hasUserVisitedBefore: boolean;
  updateHasVisitedBefore: (value: boolean) => void;
  loadStateFromStorage: () => Promise<void>;
}

const useUserOnboardingStore = create<GetStartedProps>(set => ({
  hasUserVisitedBefore: false,
  updateHasVisitedBefore: (value: boolean) =>
    set({hasUserVisitedBefore: value}),

  loadStateFromStorage: async () => {
    try {
      const hasVisited = await AsyncStorage.getItem(getStartedStorageKey);

      if (hasVisited !== null) {
        set({hasUserVisitedBefore: true});
      }
    } catch (error) {
      throw new Error('Failed to update get started');
    }
  },
}));

export const useGetStarted = () => {
  const {hasUserVisitedBefore, updateHasVisitedBefore, loadStateFromStorage} =
    useUserOnboardingStore();

  useEffect(() => {
    loadStateFromStorage();
  }, []);

  return {hasUserVisitedBefore, updateHasVisitedBefore};
};
