import { FETCH_STORES } from './types'
import axios from 'axios';

export const fetchStores = () => async dispatch => {
  try{
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/stores`);
     dispatch({
        type: FETCH_STORES,
        payload: {
           stores: response.data.data.reverse()
        }
     })
  }catch(err) {
    console.log(err);
   }
};

export const addStore = (payload) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/stores/create`, payload);
      dispatch(fetchStores());
   }catch(err) {
       console.log(err);
    }
 };

 export const editStore = (payload) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/stores/update`, payload);
      dispatch(fetchStores());
   }catch(err) {
       console.log(err)
    }
 };

 export const deleteStore = (payload) => async dispatch => {
   try{
      await axios.post(`${process.env.REACT_APP_API_URL}/stores/delete`, payload);
      dispatch(fetchStores());
   }catch(err) {
    }
 };