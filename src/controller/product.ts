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
//   import {snackBarFailure,snackBarSuccess,SetSnackBarUpdate} from '../hook/useSnackbar';
import {PRODUCTS} from '@env';
import {useProducts} from '../hook/useProducts';

const productRoute = PRODUCTS;

export const addProduct = async (
  newProduct: ProductInterface,
  state: AllProductState,
  setToast: any,
  // setToast,
) => {
  state.updateProductLoading(true);

  try {
    const productId = await createInDatabase(productRoute, newProduct);

    if (productId) {
      const data = {
        ...newProduct,
        productId,
      };
      state.addProductToState(newProduct);
      //    toastSuccess('New product added successfully', 'success', setSnackBar);
    }
  } catch (error) {
    state.updateProductLoading(false);

    // toastFailure('Failed To Create Product', 'error', setSnackBar);
    throw new Error();
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
        const uniqueCaTegories: Set<string | string> = new Set(['POPULAR']);
        const groupBySubCategories: Record<string, ProductInterface[]> = {};
        const uniqueType: Set<string | string> = new Set();
        const uniqueTypeDataArray: ProductInterface[] = [];

        snapshot.forEach(doc => {
          const product = {
            ...(doc.data() as ProductInterface),
            productId: doc.id,
          };
          fetchedData.push(product);
          if (!groupBySubCategories[product.subCategory]) {
            groupBySubCategories[product.subCategory] = [];
          }
          groupBySubCategories[product.subCategory].push(product);
          if (!uniqueType.has(product?.type)) {
            uniqueType.add(product.type);
            uniqueTypeDataArray.push(product);
          }
          if (
            !uniqueCaTegories.has(product?.category) &&
            product.category !== 'All'
          ) {
            uniqueCaTegories.add(product.category);
          }
        });

        state.storeAllProducts(fetchedData);
        state.updateUniqueSubCategory(groupBySubCategories);
        state.updateUniqueType(uniqueTypeDataArray);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [state]);
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
      state.deleteProduct(productId);
      // toastSuccess('Product deleted successfully', 'success', setSnackBar);
    }
  } catch (error) {
    // toastFailure('Failed to delete product', 'error', setSnackBar);
    throw new Error();
  }
};
