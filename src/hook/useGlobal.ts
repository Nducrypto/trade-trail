import {RootStackParamList, screenNames} from '../screen';
import {create} from 'zustand';

interface GlobalStateProps {
  previousRoute: keyof RootStackParamList;
  updatePreviousRoute: (value: keyof RootStackParamList) => void;
}

const useGlobalStateStore = create<GlobalStateProps>(set => ({
  previousRoute: screenNames.productList,
  updatePreviousRoute: (value: keyof RootStackParamList) =>
    set(state => ({...state, previousRoute: value})),
}));

export const useGlobalState = () => {
  const {updatePreviousRoute, previousRoute} = useGlobalStateStore(
    state => state,
  );

  return {updatePreviousRoute, previousRoute};
};
