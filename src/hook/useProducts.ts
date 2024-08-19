import {create} from 'zustand';

export interface ProductInterface {
  title: string;
  brand: string;
  productId: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  type: string;
  creatorId: string;
}

export interface AllProductState {
  allArticles: ProductInterface[];
  isProductLoading: boolean;
  isProductError: boolean;
  currentId: string;
  uniqueSubCategory: Record<string, ProductInterface[]>;
  uniqueTypeDataArray: ProductInterface[];
  storeAllProducts: (value: ProductInterface[]) => void;
  updateUniqueSubCategory: (value: Record<string, ProductInterface[]>) => void;
  updateUniqueType: (value: ProductInterface[]) => void;
  addProductToState: (value: ProductInterface) => void;
  updateProductLoading: (value: boolean) => void;
  deleteProduct: (value: string) => void;
}

const dummyData = [
  {
    category: 'Fashion',
    subCategory: 'Lingerie',
    brand: 'Ndu',
    type: 'pant',
    price: 300,
    title: 'undy dion',
    image: [
      'https://images.unsplash.com/photo-1719937206300-fc0dac6f8cac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    ],
    productId: '1',
    creatorId: '12345',
  },

  {
    brand: 'Ndu',

    category: 'Fashion',
    subCategory: 'accessories',
    type: 'watch',
    price: 300,
    title: 'rolex',
    image: [
      'https://images.unsplash.com/photo-1719937206300-fc0dac6f8cac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    ],
    productId: '2',
    creatorId: '12345',
  },
  {
    brand: 'Ndu',

    category: 'Fashion',
    subCategory: 'footwear',
    type: 't-shirt',
    price: 300,
    title: 'timberland',
    image: [
      'https://images.unsplash.com/photo-1719937206300-fc0dac6f8cac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    ],
    productId: '3',
    creatorId: '12345',
  },
  {
    brand: 'Ndu',

    category: 'Fashion',
    subCategory: 'clothing',
    type: 't-shirt',
    price: 300,
    title: 'versace',
    image: [
      'https://images.unsplash.com/photo-1719937206300-fc0dac6f8cac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    ],
    productId: '4',
    creatorId: '12345',
  },
  {
    brand: 'Ndu',

    category: 'Fashion',
    subCategory: 'clothing',
    type: 't-shirt',
    price: 300,
    title: 'versace',
    image: [
      'https://images.unsplash.com/photo-1719937206300-fc0dac6f8cac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    ],
    productId: '5',
    creatorId: '123456',
  },
];
const useProductsStore = create<AllProductState>(set => ({
  allArticles: [...dummyData],
  isProductLoading: false,
  isProductError: false,
  currentId: '',
  uniqueSubCategory: {},
  uniqueTypeDataArray: [],

  addProductToState: (value: ProductInterface) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      allProducts: [...state.allArticles, value],
    })),
  storeAllProducts: (value: ProductInterface[]) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      allProducts: [...value],
    })),
  updateUniqueType: (value: ProductInterface[]) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      allProducts: [...value],
    })),
  updateUniqueSubCategory: (value: Record<string, ProductInterface[]>) =>
    set(state => ({
      ...state,
      isProductLoading: false,
      isProductError: false,
      uniqueSubCategory: value,
    })),
  updateProductLoading: (value: boolean) =>
    set(state => ({...state, isProductLoading: value})),
  deleteProduct: (value: string) =>
    set(state => ({
      ...state,
      allProducts: state.allArticles.filter(item => item.productId !== value),
    })),
}));

export const useProducts = () => {
  const {
    allArticles,
    storeAllProducts,
    updateUniqueSubCategory,
    updateUniqueType,
    uniqueSubCategory,
    isProductLoading,
    isProductError,
    updateProductLoading,
    uniqueTypeDataArray,
    currentId,
    addProductToState,
    deleteProduct,
  } = useProductsStore(state => state);

  return {
    allArticles,
    storeAllProducts,
    updateUniqueSubCategory,
    updateProductLoading,
    updateUniqueType,
    addProductToState,
    uniqueSubCategory,
    isProductLoading,
    isProductError,
    uniqueTypeDataArray,
    currentId,
    deleteProduct,
  };
};
