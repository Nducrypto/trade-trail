import {
  firestore,
  doc,
  collection,
  updateDoc,
  onSnapshot,
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
      productState.addProductToState(newProduct);
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
    const unsubscribe = onSnapshot(
      collection(firestore, productRoute),
      snapshot => {
        const fetchedData: ProductInterface[] = [];
        const groupByCategories: Record<string, ProductInterface[]> = {};

        snapshot.forEach(doc => {
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
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);
};

type ProductUpdateFields = Partial<ProductInterface>;

export const updateProduct = async (
  productId: string,
  newProduct: ProductUpdateFields,
  state: AllProductState,
  // setToast,
) => {
  state.updateProductLoading(true);

  const productIdRef = doc(firestore, productRoute, productId);

  try {
    await updateDoc(productIdRef, newProduct);
    state.updateProductLoading(false);

    // toastSuccess('Product updated successfully', 'success', setToast);
  } catch (error) {
    // toastFailure('Failed To update Product', 'error', setToast);
    throw new Error();
  }
};

export const removeProduct = async (
  productId: string,
  state: AllProductState,
  // setToast,
) => {
  state.updateProductLoading(true);

  try {
    const success = await removeInDatabase(productRoute, productId);

    if (success) {
      state.deleteArticle(productId);
      // toastSuccess('Product deleted successfully', 'success', setSnackBar);
    }
  } catch (error) {
    // toastFailure('Failed to delete product', 'error', setSnackBar);
    throw new Error();
  }
};
