import { FETCH_CATEGORIES } from './types'
import axios from 'axios';

export const fetchCategories = (id) => async dispatch => {
   try{
     let response = await axios.get(`${process.env.REACT_APP_API_URL}/stores/${id}`);
      dispatch({
         type: FETCH_CATEGORIES,
         payload: {
            categories: response.data.data.categories.reverse()
         }
      })
   }catch(err) {
     console.log(err);
    }
 };

export const addCategory = (payload, id) => async dispatch => {
   try{
    console.log(payload)
      await axios.post(`${process.env.REACT_APP_API_URL}/categories/create`, payload);
      dispatch(fetchCategories(id));
   }catch(err) {
       console.log(err);
    }
 };

 export const editCategory = (payload, id) => async dispatch => {
   try{
       console.log(payload)
      await axios.post(`${process.env.REACT_APP_API_URL}/categories/update`, payload);
      dispatch(fetchCategories(id));
   }catch(err) {
       console.log(err)
    }
 };

 export const deleteCategory = (payload, id) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/categories/delete`, payload);
      
      dispatch(fetchCategories(id));
   }catch(err) {
      console.log(err)
    }
 };