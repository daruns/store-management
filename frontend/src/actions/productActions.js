import { FETCH_PRODUCTS } from './types'
import axios from 'axios';


export const fetchAllProducts = () => async dispatch => {
   try{
     let response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      dispatch({
         type: FETCH_PRODUCTS,
         payload: {
            products: response.data.data.reverse()
         }
      })
   }catch(err) {
     console.log(err);
    }
 };

export const fetchProducts = (id) => async dispatch => {
  try{
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${id}`);
     dispatch({
        type: FETCH_PRODUCTS,
        payload: {
           products: response.data.data.products.reverse()
        }
     })
  }catch(err) {
    console.log(err);
   }
};

export const addProducts = (payload, id) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/products/create`, payload);
      dispatch(fetchProducts(id));
   }catch(err) {
       console.log(err);
    }
 };

 export const editProducts= (payload, id) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/products/update`, payload);
      dispatch(fetchProducts(id));
   }catch(err) {
       console.log(err.response)
    }
 };

 export const deleteProducts = (payload, id) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/products/delete`, payload);
      dispatch(fetchProducts(id));
   }catch(err) {
    }
 };