import {RootStackParamList, screenNames} from '../screen';
import {create} from 'zustand';

export interface GlobalStateProps {
  previousRoute: keyof RootStackParamList;
  isVisible: boolean | string;
  text1: string;
  text2: string;
  type: string;
  utilityTitle: string;

  toastSuccess: (value: string) => void;
  toastError: (value: string) => void;
  closeToast: () => void;
  updatePreviousRoute: (value: keyof RootStackParamList) => void;
  updateUtilityTitle: (value: string) => void;
}

const useGlobalStateStore = create<GlobalStateProps>(set => ({
  previousRoute: screenNames.productList,
  utilityTitle: '',
  toastOpen: null,
  isVisible: false,
  text1: '',
  text2: '',
  type: '',
  updatePreviousRoute: (value: keyof RootStackParamList) =>
    set(state => ({...state, previousRoute: value})),
  updateUtilityTitle: (value: string) =>
    set(state => ({...state, utilityTitle: value})),
  toastSuccess: (message: string) =>
    set(state => ({
      ...state,
      text2: message,
      type: 'success',
      isVisible: true,
    })),

  toastError: (message: string) =>
    set(state => ({...state, text2: message, type: 'error', isVisible: true})),

  closeToast: () =>
    set(state => ({
      ...state,
      isVisible: false,
      text1: '',
      text2: '',
      type: '',
    })),
}));

export const useGlobalState = () => {
  const {
    updatePreviousRoute,
    previousRoute,
    text2,
    type,
    isVisible,
    closeToast,
    toastSuccess,
    toastError,
    utilityTitle,
    updateUtilityTitle,
  } = useGlobalStateStore(state => state);

  return {
    updatePreviousRoute,
    previousRoute,
    text2,
    type,
    closeToast,
    isVisible,
    toastSuccess,
    toastError,
    utilityTitle,
    updateUtilityTitle,
  };
};
