import {RootStackParamList, screenNames} from '../screen';
import {create} from 'zustand';

interface GlobalStateProps {
  previousRoute: keyof RootStackParamList;
  toastOpen: string | null;

  updateToast: (value: string) => void;
  updatePreviousRoute: (value: keyof RootStackParamList) => void;
}

const useGlobalStateStore = create<GlobalStateProps>(set => ({
  previousRoute: screenNames.productList,
  toastOpen: null,
  updatePreviousRoute: (value: keyof RootStackParamList) =>
    set(state => ({...state, previousRoute: value})),
  updateToast: (value: string) => set(state => ({...state, toastOpen: value})),
}));

export const useGlobalState = () => {
  const {updatePreviousRoute, previousRoute} = useGlobalStateStore(
    state => state,
  );

  return {updatePreviousRoute, previousRoute};
};
