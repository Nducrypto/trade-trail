import {create} from 'zustand';

export interface ProductInterface {
  title: string;
  productId: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  type: string;
  creatorId: string;
  gender: string;
}

export interface AllProductState {
  allArticles: ProductInterface[];
  isProductLoading: boolean;
  isProductError: boolean;
  currentId: string;
  uniqueCategory: Record<string, ProductInterface[]>;
  storeAllArticles: (value: ProductInterface[]) => void;
  updateUniqueCategory: (value: Record<string, ProductInterface[]>) => void;
  addProductToState: (value: ProductInterface) => void;
  updateProductLoading: (value: boolean) => void;
  deleteArticle: (value: string) => void;
}

const useProductsStore = create<AllProductState>(set => ({
  allArticles: [],
  isProductLoading: false,
  isProductError: false,
  currentId: '',
  uniqueCategory: {},
  uniqueTypeDataArray: [],

  addProductToState: (value: ProductInterface) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      allArticles: [...state.allArticles, value],
    })),
  storeAllArticles: (value: ProductInterface[]) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      allArticles: [...value],
    })),

  updateUniqueCategory: (value: Record<string, ProductInterface[]>) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      uniqueCategory: value,
    })),
  updateProductLoading: (value: boolean) =>
    set(state => ({...state, isProductLoading: value})),

  deleteArticle: (value: string) =>
    set(state => ({
      ...state,
      allProducts: state.allArticles.filter(item => item.productId !== value),
    })),
}));

export const useProducts = () => {
  const {
    allArticles,
    storeAllArticles,
    updateUniqueCategory,
    uniqueCategory,
    isProductLoading,
    isProductError,
    updateProductLoading,
    currentId,
    addProductToState,
    deleteArticle,
  } = useProductsStore(state => state);

  return {
    allArticles,
    uniqueCategory,
    isProductLoading,
    isProductError,
    currentId,
    storeAllArticles,
    updateUniqueCategory,
    updateProductLoading,
    addProductToState,
    deleteArticle,
  };
};
