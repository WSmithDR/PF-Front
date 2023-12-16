import axios from 'axios';
import {
  GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCTS_BY_NAME_FAILURE, GET_PRODUCTS_BY_NAME_SUCCESS, GET_PRODUCTS_BY_NAME_REQUEST,
  GET_DETAIL_PRODUCT_FAILURE, GET_DETAIL_PRODUCT_SUCCESS, GET_DETAIL_PRODUCT_REQUEST,

  GET_ALL_USERS_FAILURE, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_REQUEST,
  GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_REQUEST,
  POST_LOGIN_FAILURE, POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS,
  POST_USER_FAILURE, POST_USER_REQUEST, POST_USER_SUCCESS,
  GET_USERDATA_FAILURE, GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS,
  GET_USER_PRODUCTS_FAILURE, GET_USER_PRODUCTS_REQUEST, GET_USER_PRODUCTS_SUCCESS,
  PUT_USERDATA_FAILURE, PUT_USERDATA_REQUEST, PUT_USERDATA_SUCCESS,
  GET_USER_PURCHASES_FAILURE,GET_USER_PURCHASES_REQUEST, GET_USER_PURCHASES_SUCCESS,
  SEND_TOKEN_GOOGLE_FAILURE, SEND_TOKEN_GOOGLE_REQUEST, SEND_TOKEN_GOOGLE_SUCCESS,

  CLEAR_DATA,
  CLEAR_SEARCH_RESULTS,
  CLEAR_MESSAGE_STATUS,

  CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS,
  GET_REVIEWS_FAILURE, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS,
  PUT_REVIEW_FAILURE, PUT_REVIEW_REQUEST, PUT_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS,

  FINISH_PURCHASE,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  
  GET_ADMIN_PRODUCTS_FAILURE, GET_ADMIN_PRODUCTS_REQUEST, GET_ADMIN_PRODUCTS_SUCCESS,
  PUT_USER_ADMIN_FAILURE, PUT_USER_ADMIN_REQUEST, PUT_USER_ADMIN_SUCCESS,
  DELETE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS,

  DELETE_USER,
  GET_ALL_USERS_DELETED,
  GET_DELETED_PRODUCTS,
  RESTORE_PRODUCT,
  RESTORE_USER,
  UPDATE_PRODUCTS_FAILURE, UPDATE_PRODUCTS_REQUEST, UPDATE_PRODUCTS_SUCCESS,

  POST_MESSAGE_FAILURE, POST_MESSAGE_REQUEST, POST_MESSAGE_SUCCESS,
  
  SET_CURRENT_PAGE, SET_FILTERS,
} from './types';

//export const URL = 'https://pfback1-q5aoyanf.b4a.run';
export const URL = 'http://localhost:3001';


//PRODUCTS
export const getAllProductsRequest = () => ({
  type: GET_ALL_PRODUCTS_REQUEST
});
export const getAllProductsSuccess = (data) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: data
});
export const getAllProductsFailure = (error) => ({
  type: GET_ALL_PRODUCTS_FAILURE,
  payload: error
});
export const getAllProducts = (page, limit, filters) => {
  return async (dispatch) => {
    dispatch(getAllProductsRequest());
    try {
      const { data } = await axios.get(`${URL}/product`, {
        params: { page, limit, ...filters },
      }, { headers: { 'Cache-Control': 'no-cache' }});
      dispatch(getAllProductsSuccess(data));
    } catch (error) {
      dispatch(getAllProductsFailure(error));
    };
  };
};

export const getProductsByNameRequest = () => ({
  type: GET_PRODUCTS_BY_NAME_REQUEST
});
export const getProductsByNameSuccess = (data) => ({
  type: GET_PRODUCTS_BY_NAME_SUCCESS,
  payload: data
});
export const getProductsByNameFailure = (error) => ({
  type: GET_PRODUCTS_BY_NAME_FAILURE,
  payload: error
});
export const getProductsByName = (name) => {
  return async (dispatch) => {
    dispatch(getProductsByNameRequest());
    try {
      const { data } = await axios.get(`${URL}/product/name?name=${name}`);
      dispatch(getProductsByNameSuccess(data));
    } catch (error) {
      dispatch(getProductsByNameFailure(error));
    };
  };
};

export const getDetailProductRequest = () => ({
  type: GET_DETAIL_PRODUCT_REQUEST
});
export const getDetailProductSuccess = (data) => ({
  type: GET_DETAIL_PRODUCT_SUCCESS,
  payload: data
});
export const getDetailProductFailure = (error) => ({
  type: GET_DETAIL_PRODUCT_FAILURE,
  payload: error
});
export const getDetailProduct = (id) => {
  return async (dispatch) => {
    dispatch(getDetailProductRequest());
    try {
      const { data } = await axios.get(`${URL}/product/${id}`);
      dispatch(getDetailProductSuccess(data));
    } catch (error) {
      dispatch(getDetailProductFailure(error));
    };
  };
};


//USERS
export const getAllUsersRequest = () => ({
  type: GET_ALL_USERS_REQUEST
});
export const getAllUsersSuccess = (data) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: data
});
export const getAllUsersFailure = (error) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: error
});
export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch(getAllUsersRequest());
    try {
      const { data } = await axios.get(`${URL}/user`);
      dispatch(getAllUsersSuccess(data));
    } catch (error) {
      dispatch(getAllUsersFailure(error));
    };
  };
};

export const getUserByIDRequest = () => ({
  type: GET_USER_BY_ID_REQUEST
});
export const getUserByIDSuccess = (data) => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload: data
});
export const getUserByIDFailure = (error) => ({
  type: GET_USER_BY_ID_FAILURE,
  payload: error
});
export const getUserByID = (id) => {
  return async (dispatch) => {
    dispatch(getUserByIDRequest());
    try {
      const { data } = await axios.get(`${URL}/user/${id}`);
      dispatch(getUserByIDSuccess(data));
    } catch (error) {
      dispatch(getUserByIDFailure(error));
    };
  };
};

export const postLoginRequest = () => ({
 type: POST_LOGIN_REQUEST
});
export const postLoginSuccess = (user) => ({
 type: POST_LOGIN_SUCCESS,
 payload: user
});
export const postLoginFailure = (error) => ({
 type: POST_LOGIN_FAILURE,
 payload: error
});
export const postLogin = (user) => {
 return async (dispatch) => {
   dispatch(postLoginRequest());
   try {
     const { data } = await axios.post(`${URL}/user/login`, user);
     if (data.accessToken) {
       localStorage.setItem("token", data.accessToken);
       localStorage.setItem("access", data.access)
     }
     dispatch(postLoginSuccess(data));
   } catch (error) {
     dispatch(postLoginFailure(error.response.data.error));
   };
 };
};

export const postUserRequest = () => ({
 type: POST_USER_REQUEST
});
export const postUserSuccess = (user) => ({
 type: POST_USER_SUCCESS,
 payload: user
});
export const postUserFailure = (error) => ({
 type: POST_USER_FAILURE,
 payload: error
});
export const postUser = (user) => {
 return async (dispatch) => {
   dispatch(postUserRequest());
   try {
     const { data } = await axios.post(`${URL}/user/signup`, user);
     if (data.accessToken) {
       localStorage.setItem("token", data.accessToken);
       localStorage.setItem("access", data.access)
     }
     dispatch(postUserSuccess(data));
   } catch (error) {
     dispatch(postUserFailure(error.response.data.error));
   };
 };
};

export const postTokenGoogleRequest = () => ({
 type: SEND_TOKEN_GOOGLE_REQUEST
});
export const postTokenGoogleSuccess = (data) => ({
 type: SEND_TOKEN_GOOGLE_SUCCESS,
 payload: data
});
export const postTokenGoogleFailure = (error) => ({
 type: SEND_TOKEN_GOOGLE_FAILURE,
 payload: error
});
export const postTokenGoogle = (token) => {
 return async (dispatch) => {
   dispatch(postTokenGoogleRequest());
   try {
     const { data } = await axios.post(`${URL}/user/auth`, { token });
     if (data.accessToken) {
       localStorage.setItem("token", data.accessToken);
       localStorage.setItem("refreshToken", data.refreshToken);
       localStorage.setItem("access", data.access);
     }
     dispatch(postTokenGoogleSuccess(data));
   } catch (error) {
     dispatch(postTokenGoogleFailure(error));
   };
 };
};

export const getUserDataRequest = () => ({
 type: GET_USERDATA_REQUEST
});
export const getUserDataSuccess = (data) => ({
 type: GET_USERDATA_SUCCESS,
 payload: data
});
export const getUserDataError = (error) => ({
 type: GET_USERDATA_FAILURE,
 payload: error
});
export const getUserData = (userId) => {
 return async (dispatch) => {
   dispatch(getUserDataRequest());
   try {
     const { data } = await axios.get(`${URL}/user/${userId}`);
     dispatch(getUserDataSuccess(data));
   } catch (error) {
     dispatch(getUserDataError(error.response.data.error));
   };
 };
};

export const putUserDataRequest = () => ({
 type: PUT_USERDATA_REQUEST
});
export const putUserDataSuccess = (data) => ({
 type: PUT_USERDATA_SUCCESS,
 payload: data
});
export const putUserDataError = (error) => ({
 type: PUT_USERDATA_FAILURE,
 payload: error
});
export const putUserData = (userId, newData) => {
 return async (dispatch) => {
   const token = localStorage.getItem("token");
   dispatch(putUserDataRequest());
   try {
     const formData = new FormData();
     for (const key in newData) {
       if (newData.hasOwnProperty(key)) {
         if (key === 'img' && newData[key] !== undefined) {
           formData.append(key, newData[key]);
         } else if (key !== 'img') {
           formData.append(key, newData[key]);
         }
       }
     }

     const { data } = await axios.put(`${URL}/user/${userId}`, formData, {
       headers: {
         'x-access-token': token,
         'Content-Type': 'multipart/form-data',
       },
     });
     dispatch(putUserDataSuccess(data));
   } catch (error) {
     dispatch(putUserDataError(error.response?.data?.error || 'Unknown error'));
   };
 };
};
 
//REVIEWS
export const createReviewRequest = () => ({
  type: CREATE_REVIEW_REQUEST
});
export const createReviewSuccess = (data) => ({
  type: CREATE_REVIEW_SUCCESS,
  payload: data
});
export const createReviewError = (error) => ({
  type: CREATE_REVIEW_FAILURE,
  payload: error
});
export const createReview = (datas) => {
  return async (dispatch) => {
    dispatch(createReviewRequest());
    try {
      const { data } = await axios.post(`${URL}/review`, datas);
      dispatch(createReviewSuccess(data));
    } catch (error) {
      dispatch(createReviewError(error.response.data.error));
    };
  };
};

export const getReviewsRequest = () => ({
  type: GET_REVIEWS_REQUEST
});
export const getReviewsSuccess = (data) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: data
});
export const getReviewsError = (error) => ({
  type: GET_REVIEWS_FAILURE,
  payload: error
});
export const getReviews = (productId) => {
  return async (dispatch) => {
    dispatch(getReviewsRequest());
    try {
      const { data } = await axios.get(`${URL}/review/${productId}`);
      dispatch(getReviewsSuccess(data));
    } catch (error) {
      dispatch(getReviewsError(error.response.data.error));
    };
  };
};

export const putReviewRequest = () => ({
  type: PUT_REVIEW_REQUEST
});
export const putReviewSuccess = (data) => ({
  type: PUT_REVIEW_SUCCESS,
  payload: data
});
export const putReviewError = (error) => ({
  type: PUT_REVIEW_FAILURE,
  payload: error
});
export const putReview = (datas) => {
  return async (dispatch) => {
    dispatch(putReviewRequest());
    try {
      const { data } = await axios.put(`${URL}/review`, datas);
      console.log(datas);
      dispatch(putReviewSuccess(data));
    } catch (error) {
      dispatch(putReviewError(error.response.data.error));
    };
  };
};

export const deleteReviewRequest = () => ({
  type: DELETE_REVIEW_REQUEST
});
export const deleteReviewSuccess = (data) => ({
  type: DELETE_REVIEW_SUCCESS,
  payload: data
});
export const deleteReviewError = (error) => ({
  type: DELETE_REVIEW_FAILURE,
  payload: error
});
export const deleteReview = (reviewId, userId) => {
  return async (dispatch) => {
    dispatch(deleteReviewRequest());

    try {
      const { data } = await axios.delete(`${URL}/review/${reviewId}`, { data: { userId } });

      console.log(data);

      dispatch(deleteReviewSuccess(data));
    } catch (error) {
      console.error(error.response.data.error);
      dispatch(deleteReviewError(error.response.data.error));
    }
  };
};


//CART
export const addToCart = (productById) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: productById,
    });

    const updatedCart = getState().cart;

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });

    const updatedCart = getState().cart;

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
};

 
export function finishPurchase(objectPago) {
  return async function compra(dispatch) {
     try {
      const response = await axios.post(`${URL}/purchase/order`, objectPago);
      window.location.href = response.data.init_point;

      localStorage.removeItem('cart');

      dispatch({
        type: FINISH_PURCHASE, //afsdfgs

        payload: response.data,
      });
    } catch (error) {
        console.error('Error al tratar de finalizar compra', error);
    };
  };
};
 
 
//CLEAR
export const clearData = () => ({
  type: CLEAR_DATA,
});
 
export const clearMessageStatus = () => ({
  type: CLEAR_MESSAGE_STATUS,
})

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});
 

//PAGE & FILTERS
export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export function setFilters(filters){
  return {
    type: SET_FILTERS,
    payload: filters
  };
};


//MESSAGES
export const postMessageRequest = () => ({
  type: POST_MESSAGE_REQUEST
});
export const postMessageSuccess = (message) => ({
  type: POST_MESSAGE_SUCCESS,
  payload: message
});
export const postMessageError = (error) => ({
  type: POST_MESSAGE_FAILURE,
  payload: error
});
export const postMessage = (message) => {
  return async (dispatch) => {
    dispatch(postMessageRequest());
    try {
      const { data } = await axios.post(`${URL}/user/messages`, message);
      dispatch(postMessageSuccess(data));
    } catch (error) {
      dispatch(postMessageError(error.response.data.error));
    };
  };
};


//PURCHASES 
export const getUserPurchasesRequest = () => ({
  type: GET_USER_PURCHASES_REQUEST
});
export const getUserPurchasesSuccess = (data) => ({
  type: GET_USER_PURCHASES_SUCCESS,
  payload: data
});
export const getUserPurchasesError = (error) => ({
  type: GET_USER_PURCHASES_FAILURE,
  payload: error
});
export const getUserPurchases = (userId) => {
  return async (dispatch) => {
    dispatch(getUserPurchasesRequest());
    try {
      const { data } = await axios.get(`${URL}/purchase/user/${userId}`);
      dispatch(getUserPurchasesSuccess(data));
    } catch (error) {
      dispatch(getUserPurchasesError(error.response.data.error));
    };
  };
};
 

//ADMIN
export const getAdminProductsRequest = () => ({
  type: GET_ADMIN_PRODUCTS_REQUEST
});
export const getAdminProductsSuccess = (data) => ({
  type: GET_ADMIN_PRODUCTS_SUCCESS,
  payload: data
});
export const getAdminProductsError = (error) => ({
  type: GET_ADMIN_PRODUCTS_FAILURE,
  payload: error
});
export const getAdminProducts = (userId) => {
  return async (dispatch) => {
    dispatch(getAdminProductsRequest());
    try {
      const { data } = await axios.get(`${URL}/user/mycreated/${userId}`);
      dispatch(getAdminProductsSuccess(data));
    } catch (error) {
      dispatch(getAdminProductsError(error.response.data.error));
    };
  };
};
 
export const getUserProductsRequest = () => ({
  type: GET_USER_PRODUCTS_REQUEST
});
export const getUserProductsSuccess = (data) => ({
  type: GET_USER_PRODUCTS_SUCCESS,
  payload: data
});
export const getUserProductsError = (error) => ({
  type: GET_USER_PRODUCTS_FAILURE,
  payload: error
});
export const getUserProducts = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(getUserProductsRequest());
    try {
      const { data } = await axios.get(`${URL}/product/users&products`, {
        headers: {
          'x-access-token': token,
        },
      });
      dispatch(getUserProductsSuccess(data));
    } catch (error) {
        dispatch(getUserProductsError(error.response.data.error));
    };
  };
};
 
 
export const putUserAdminRequest = () => ({
    type: PUT_USER_ADMIN_REQUEST
});
export const putUserAdminSuccess = (data) => ({
    type: PUT_USER_ADMIN_SUCCESS,
    payload: data
});
export const putUserAdminError = (error) => ({
    type: PUT_USER_ADMIN_FAILURE,
    payload: error
});
export const putUserAdmin = (userId) => {
  return async (dispatch) => {
    dispatch(putUserAdminRequest());
    try {
      const { data } = await axios.put(`${URL}/user/admin/${userId}`, { headers: { 'Cache-Control': 'no-cache'}});
      dispatch(putUserAdminSuccess(data));
    } catch (error) {
        dispatch(putUserAdminError(error.response));
    };
  };
};

export const deleteProductRequest = () => ({
  type: DELETE_PRODUCTS_REQUEST
});
export const deleteProductSuccess = (data) => ({
  type: DELETE_PRODUCTS_SUCCESS,
  payload: data
});
export const deleteProductError = (error) => ({
  type: DELETE_PRODUCTS_FAILURE,
  payload: error
});
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch(deleteProductRequest());
    try {
      const { data } = await axios.delete(`${URL}/product/${productId}`, { headers: { 'Cache-Control': 'no-cache'}});
      dispatch(deleteProductSuccess(data));
    } catch (error) {
        dispatch(deleteProductError(error.response));
    };
  };
};

const updateProductsRequest = () => ({
  type: UPDATE_PRODUCTS_REQUEST
});
const updateProductsSuccess = (data) => ({
  type: UPDATE_PRODUCTS_SUCCESS,
  payload: data
});
const updateProductsError = (error) => ({
  type: UPDATE_PRODUCTS_FAILURE,
  payload: error
});
export const updateProducts = (productId, product) => {
  return async (dispatch) => {
    dispatch(updateProductsRequest());
    try {
      const { data } = await axios.put(`${URL}/product/${productId}`, product);
      dispatch(updateProductsSuccess(data));
    } catch (error) {
        dispatch(updateProductsError(error.response));
    };
  };
};

export function restoreProduct(id) {
  return async function (dispatch) {
    const restoredProduct = await axios.put(`${URL}/product/restore/${id}`, { headers: { 'Cache-Control': 'no-cache' }});
    dispatch({
      type: RESTORE_PRODUCT,
      payload: restoredProduct.data,
    });
  };
};

export function getDeletedProducts() {
  return async function (dispatch) {
    const getDeletedProducts = await axios.get(`${URL}/product/deleted`, { headers: { 'Cache-Control': 'no-cache' }});
    dispatch({
      type: GET_DELETED_PRODUCTS,
      payload: getDeletedProducts.data,
    });
  };
};

export function deleteUser(id) {
  return async function (dispatch) {
    const deletedUser = await axios.put(`${URL}/user/delete/${id}`, { headers: { 'Cache-Control': 'no-cache'}});
    dispatch({
      type: DELETE_USER,
      payload: deletedUser.data,
    });
  };
 };
 
 export function getAllUsersDeleted() {
   return async function (dispatch) {
      const allUsersDeleted = await axios.get(`${URL}/user/deleted`, { headers: { 'Cache-Control': 'no-cache' }});
      dispatch({
        type: GET_ALL_USERS_DELETED,
        payload: allUsersDeleted.data,
      });
  };
 };
 
 export function restoreUser(id) {
  return async function (dispatch) {
    const restoredUser = await axios.put(`${URL}/user/restore/${id}`, { headers: { 'Cache-Control': 'no-cache' }});
    dispatch({
      type: RESTORE_USER,
      payload: restoredUser.data,
    });
  };
 };
 