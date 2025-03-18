import React, {useEffect, useState} from 'react';
import {addProduct, updateProduct} from '../../../controller/product.ts';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {ProductInterface, useProducts} from '../../../hook/useProducts.ts';
import {CustomButton, Product} from '../../index.ts';
import {wp} from '../../../config/appConfig.ts';
import {addProductStyles} from './productFormStyles.ts';
import {GlobalStateProps, useGlobalState} from '../../../hook/useGlobal.ts';
import {useUser} from '../../../hook/useUser.ts';

interface NewProduct {
  title: string;
  price: number | string;
  image: string[];
  category: string;
  subCategory: string;
  type: string;
  gender: string;
}
const initialState: NewProduct = {
  title: '',
  price: '',
  image: [],
  category: '',
  subCategory: '',
  type: '',
  gender: '',
};

const ProductForm = () => {
  const [productForm, setProductForm] = useState<NewProduct | ProductInterface>(
    initialState,
  );
  const products = useProducts();
  const {currentUser} = useUser();
  const globalState = useGlobalState() as GlobalStateProps;
  const productToUpdate = products.allArticles.find(
    item => item.productId === products.currentId,
  );

  function handleNewProductChange(name: string, value: string) {
    if (name === 'image') {
      setProductForm(prevProduct => ({
        ...prevProduct,
        [name]: value.split(',').map((item: string) => item.trim()),
      }));
    } else {
      setProductForm(prevProduct => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    if (products.currentId && productToUpdate !== undefined) {
      setProductForm(productToUpdate);
    }
  }, [products.currentId]);

  function createProductHandler() {
    const data = {
      ...productForm,
      price: Number(productForm.price),

      creatorId: currentUser.userId,
    } as ProductInterface;
    if (products.currentId.length < 1) {
      addProduct(data as ProductInterface, products, globalState);
    } else {
      updateProduct(products.currentId, data as ProductInterface, products);
    }
    setProductForm(initialState);
  }

  return (
    <View>
      <ScrollView>
        <ScrollView
          horizontal
          contentContainerStyle={addProductStyles.itemCon}
          showsHorizontalScrollIndicator={false}>
          {products.allArticles.map(product => (
            <View key={product.productId} style={addProductStyles.item}>
              <Product product={product} />
            </View>
          ))}
        </ScrollView>
        <Text style={{...addProductStyles.label, textAlign: 'center'}}>
          You have {products.allArticles.length} products in Stock
        </Text>
        <View style={{margin: 20}}>
          <Text style={addProductStyles.label}>Category:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.category}
            onChangeText={text => handleNewProductChange('category', text)}
          />
          <Text style={addProductStyles.label}>Sub Category:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.subCategory}
            onChangeText={text => handleNewProductChange('subCategory', text)}
          />
          <Text style={addProductStyles.label}>Type:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.type}
            onChangeText={text => handleNewProductChange('type', text)}
          />
          <Text style={addProductStyles.label}>Price:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.price.toString()}
            onChangeText={value => handleNewProductChange('price', value)}
            keyboardType="numeric"
          />
          <Text style={addProductStyles.label}>Title:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.title}
            onChangeText={text => handleNewProductChange('title', text)}
          />
          <Text style={addProductStyles.label}>Gender:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.gender}
            onChangeText={text => handleNewProductChange('gender', text)}
          />

          <Text style={addProductStyles.label}>Image URL:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.image.join(', ')}
            onChangeText={text => handleNewProductChange('image', text)}
          />
          <View style={addProductStyles.btnCon}>
            <CustomButton
              title="ADD PRODUCT"
              width={wp('88%')}
              marginTop={10}
              testID="add-product-btn"
              onPress={() => createProductHandler()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductForm;
