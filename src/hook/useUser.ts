import {create} from 'zustand';
import {RootStackParamList, screenNames} from '../screen';

export interface FriendsProp {
  userName: string;
  status: string;
  date: string;
  userId: string;
  docId: string;
}

export interface CommentsProp extends Omit<FriendsProp, 'status'> {
  comment: string;
}

export interface CollectionInterface {
  role: string;
  email: string;
  userId: string;
  joined: string;
  docId: string;
  location: string;
  userName: string;
  profilePic: string;
  phoneNumber: string;
  bio: string;
  age: null | number;
  friends: FriendsProp[];
  photos: string[];
  comments: CommentsProp[];
  city: string;
  country: string;
}

interface AllUserStateProps {
  allUsers: Record<string, CollectionInterface>;
  currentUser: CollectionInterface;
  isUserLoading: boolean;
  isAuthError: boolean | string;
  previousRoute: keyof RootStackParamList;
  storeAllUsers: (value: Record<string, CollectionInterface>) => void;
  updateCurrentUser: (value: CollectionInterface) => void;
  setUserLoading: (value: boolean) => void;
  setUserError: (value: boolean | string) => void;
}
export const initialState = {
  role: '',
  email: '',
  userId: '',
  joined: '',
  docId: '',
  location: '',
  userName: '',
  profilePic: '',
  phoneNumber: '',
  bio: '',
  age: null,
  friends: [],
  photos: [],
  comments: [],
  city: '',
  country: '',
};
const useUserStore = create<AllUserStateProps>(set => ({
  allUsers: {},
  currentUser: initialState,
  isUserLoading: false,
  isAuthError: false,
  previousRoute: screenNames.productList,
  storeAllUsers: (value: Record<string, CollectionInterface>) =>
    set(state => ({
      ...state,
      isUserLoading: false,
      isAuthError: false,
      allUsers: value,
    })),
  updateCurrentUser: (value: CollectionInterface) =>
    set(state => ({
      ...state,
      isUserLoading: false,
      isAuthError: false,
      currentUser: value,
    })),
  setUserLoading: (value: boolean) =>
    set(state => ({
      ...state,
      isUserLoading: value,
      isAuthError: false,
    })),
  setUserError: (value: string | boolean) =>
    set(state => ({
      ...state,
      isUserLoading: false,
      isAuthError: value,
    })),
}));

export const useUser = () => {
  const {
    allUsers,
    currentUser,
    isAuthError,
    isUserLoading,
    previousRoute,
    updateCurrentUser,
    setUserError,
    setUserLoading,
    storeAllUsers,
  } = useUserStore(state => state);

  return {
    allUsers,
    currentUser,
    isAuthError,
    isUserLoading,
    previousRoute,
    updateCurrentUser,
    setUserError,
    setUserLoading,
    storeAllUsers,
  };
};
