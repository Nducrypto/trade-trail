import React, {useEffect, useState} from 'react';
import {addProduct, updateProduct} from '../../../controller/product';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {ProductInterface, useProducts} from '../../../hook/useProducts';
import {CustomButton, Product} from '../../index.ts';
import {wp} from '../../../config/appConfig.ts';
import {addProductStyles} from './productFormStyles.ts';

interface NewProduct {
  title: string;
  brand: string;
  price: number | string;
  image: string[];
  category: string;
  subCategory: string;
  type: string;
}
const initialState: NewProduct = {
  title: '',
  brand: '',
  price: '',
  image: [],
  category: '',
  subCategory: '',
  type: '',
};

const ProductForm = () => {
  const [productForm, setProductForm] = useState<NewProduct | ProductInterface>(
    initialState,
  );
  const state = useProducts();
  const productToUpdate = state.allArticles.find(
    item => item.productId === state.currentId,
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
    if (state.currentId && productToUpdate !== undefined) {
      setProductForm(productToUpdate);
    }
  }, [state.currentId]);

  function createProductHandler() {
    const data = {
      ...productForm,
      price: Number(productForm.price),
    } as ProductInterface;
    if (state.currentId.length < 1) {
      addProduct(data as ProductInterface, state, '');
    } else {
      updateProduct(state.currentId, data as ProductInterface, state);
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
          {state.allArticles.map(product => (
            <View key={product.productId} style={addProductStyles.item}>
              <Product product={product} />
            </View>
          ))}
        </ScrollView>
        <Text style={{...addProductStyles.label, textAlign: 'center'}}>
          You have {state.allArticles.length} products in Stock
        </Text>
        <View style={{margin: 20}}>
          <Text style={addProductStyles.label}>Add New Product</Text>
          <Text style={addProductStyles.label}>Title:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.title}
            onChangeText={text => handleNewProductChange('title', text)}
          />
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
          <Text style={addProductStyles.label}>Brand:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.brand}
            onChangeText={text => handleNewProductChange('brand', text)}
          />

          <Text style={addProductStyles.label}>Price:</Text>
          <TextInput
            style={addProductStyles.input}
            value={productForm.price.toString()}
            onChangeText={value => handleNewProductChange('price', value)}
            keyboardType="numeric"
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
