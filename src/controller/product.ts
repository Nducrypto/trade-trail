import {
  firestore,
  doc,
  collection,
  updateDoc,
  getDocs,
} from '../config/firebase';
import {useEffect} from 'react';
import {AllProductState, ProductInterface} from '../hook/useProducts';
import {removeInDatabase, createInDatabase} from '../utils/firebaseUtils';
import {PRODUCTS} from '@env';
import {useProducts} from '../hook/useProducts';
import {GlobalStateProps} from '../hook/useGlobal';

const productRoute = PRODUCTS;

export const addProduct = async (
  newProduct: ProductInterface,
  productState: AllProductState,
  globalState: GlobalStateProps,
) => {
  productState.updateProductLoading(true);

  try {
    const productId = await createInDatabase(productRoute, newProduct);

    if (productId) {
      const data = {
        ...newProduct,
        productId,
      };
      productState.addProductToState(data);
      globalState.toastSuccess('New product added successfully');
    }
  } catch (error) {
    productState.updateProductLoading(false);
    globalState.toastError('Failed To Create Product');
    throw new Error('Failed To Create Product');
  }
};
export const fetchAllProducts = () => {
  const state = useProducts();

  useEffect(() => {
    state.updateProductLoading(true);
    const getAll = async () => {
      const userCollections = collection(firestore, productRoute);
      const getDoc = getDocs(userCollections);

      const fetchedData: ProductInterface[] = [];
      const groupByCategories: Record<string, ProductInterface[]> = {};

      (await getDoc).forEach(doc => {
        const product = {
          ...(doc.data() as ProductInterface),
          productId: doc.id,
        };
        fetchedData.push(product);
        if (!groupByCategories[product.category]) {
          groupByCategories[product.category] = [];
        }
        groupByCategories[product.category].push(product);
      });

      state.storeAllArticles(fetchedData);
      state.updateUniqueCategory(groupByCategories);
    };
    getAll();
  }, []);
};

type ProductUpdateFields = Partial<ProductInterface>;

export const updateProduct = async (
  productId: string,
  newProduct: ProductUpdateFields,
  state: AllProductState,
) => {
  state.updateProductLoading(true);

  const productIdRef = doc(firestore, productRoute, productId);

  try {
    await updateDoc(productIdRef, newProduct);
    state.updateProductLoading(false);
  } catch (error) {
    throw new Error('Failed To update Product');
  }
};

export const removeProduct = async (
  productId: string,
  state: AllProductState,
) => {
  state.updateProductLoading(true);

  try {
    const success = await removeInDatabase(productRoute, productId);
    if (success) {
      state.deleteArticle(productId);
    }
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

export const getUniqueSubCategory = (
  categoryArray: ProductInterface[],
  selectedTitle: string,
) => {
  const uniqueSubCategory = new Set(['POPULAR']);
  const uniqueTypeArray = [] as ProductInterface[];
  for (const item of categoryArray) {
    uniqueSubCategory.add(item.subCategory);

    if (!uniqueTypeArray.some(i => i.type === item.type)) {
      uniqueTypeArray.push(item);
    }
  }
  const titleArray = Array.from(uniqueSubCategory);
  const isPopular = selectedTitle === 'POPULAR';

  const filteredBySelectedType = isPopular
    ? uniqueTypeArray
    : uniqueTypeArray.filter(item => item.subCategory === selectedTitle);

  return {filteredBySelectedType, titleArray};
};
