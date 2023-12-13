import axios from 'axios';
import {
  CLEAR_DATA,
  CLEAR_SEARCH_RESULTS,
  CREATE_NEW_PRODUCT,
  CREATE_REVIEW,
  DELETE_PRODUCTS,
  DELETE_USER,
  FINISH_PURCHASE,
  GET_ADMIN_PRODUCTS_FAILURE, GET_ADMIN_PRODUCTS_REQUEST, GET_ADMIN_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS,
  GET_ALL_USERS,
  GET_ALL_USERS_DELETED,
  GET_DELETED_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_NAME,
  GET_REVIEWS,
  GET_USERDATA_FAILURE,
  GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS,
  GET_USER_BY_ID,
  GET_USER_PRODUCTS_FAILURE,
  GET_USER_PRODUCTS_REQUEST, GET_USER_PRODUCTS_SUCCESS,
  GET_USER_PURCHASES_FAILURE,
  GET_USER_PURCHASES_REQUEST, GET_USER_PURCHASES_SUCCESS,
  LOCAL_STORAGE,
  POST_LOGIN_FAILURE, POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS,
  POST_MESSAGE_FAILURE,
  POST_MESSAGE_REQUEST,
  POST_MESSAGE_SUCCESS,
  POST_USER_FAILURE, POST_USER_REQUEST, POST_USER_SUCCESS,
  PUT_USERDATA_FAILURE, PUT_USERDATA_REQUEST, PUT_USERDATA_SUCCESS,
  REGISTER_ADMIN,
  REMOVE_FROM_CART,
  RESTORE_PRODUCT,
  RESTORE_USER,
  SEND_TOKEN_GOOGLE_FAILURE, SEND_TOKEN_GOOGLE_REQUEST, SEND_TOKEN_GOOGLE_SUCCESS,
  SET_CURRENT_PAGE, SET_FILTERS,
  UPDATE_PRODUCTS,
  PUT_USER_ADMIN_FAILURE, PUT_USER_ADMIN_REQUEST, PUT_USER_ADMIN_SUCCESS,
} from './types';

export const URL =  'https://pfback1-q5aoyanf.b4a.run'
//'http://localhost:3001'

export function setFilters(filters){
 return {
   type: SET_FILTERS,
   payload: filters
 }
}

export function getAllProducts(page, limit, filters) {
 return async function (dispatch) {
   try {
     const response = await axios.get(`${URL}/product`, {
       params: { page, limit, ...filters },
     }, { headers: { 'Cache-Control': 'no-cache' }});
     dispatch({
       type: GET_ALL_PRODUCTS,
       payload: response.data,
     });
   } catch (error) {
     console.error('Error:', error);
   }
 };
}

export function getProductsByName(name) {
 return async function (dispatch) {
   try {
     const response = await axios.get(`${URL}/product/name?name=${name}`);
     const data = await response.data;
     dispatch({
       type: GET_PRODUCTS_BY_NAME,
       payload: data,
     });
   } catch (error) {
     console.log(error.response.data.error);
   }
 };
}

export const clearSearchResults = () => ({
 type: CLEAR_SEARCH_RESULTS,
});

export function getProductsById(_id) {
 return async function (dispatch) {
   const { data } = await axios.get(`${URL}/product/${_id}`);
   console.log(data);
   dispatch({
     type: GET_PRODUCTS_BY_ID,
     payload: data,
   });
 };
} 

export function getProductReview(productId) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/review/${productId}`);     
      if (data.length === 0) {       
        dispatch({
          type: GET_REVIEWS,
          payload: [{}],
        });
      } else {     
        dispatch({
          type: GET_REVIEWS,
          payload: data,
        });
      }
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };
}
 export function createProduct(newproduct) {
 console.log(newproduct);
 return async function (dispatch) {
   try {
     const { data } = await fetch.post(`${URL}/product`, newproduct);
     console.log(data);
     console.log(newproduct);

     dispatch({
       type: CREATE_NEW_PRODUCT,
       payload: data,
     });
   } catch (error) {
     throw error.response.data;
   }
 };
}
 export function deleteProduct(id) {
 return async function (dispatch) {
   const deletedProduct = await axios.put(`${URL}/product/delete/${id}`, { headers: { 'Cache-Control': 'no-cache' }});
   dispatch({
     type: DELETE_PRODUCTS,
     payload: deletedProduct.data,
   });
 };
}
export function restoreProduct(id) {
 return async function (dispatch) {
   const restoredProduct = await axios.put(`${URL}/product/restore/${id}`, { headers: { 'Cache-Control': 'no-cache' }});
   dispatch({
     type: RESTORE_PRODUCT,
     payload: restoredProduct.data,
   });
 };
}
export function updateProduct(payload) {
 return async function (dispatch) {
   console.log(payload.id);

   const info = await fetch.put(`${URL}/product/${payload.id}`, payload);

   dispatch({
     type: UPDATE_PRODUCTS,
     payload: info.data,
   });
 };
}
export function getDeletedProducts() {
 return async function (dispatch) {
   const getDeletedProducts = await axios.get(`${URL}/product/deleted`, { headers: { 'Cache-Control': 'no-cache' }});
   console.log(getDeletedProducts);
   dispatch({
     type: GET_DELETED_PRODUCTS,
     payload: getDeletedProducts.data,
   });
 };
}


export function createAdmin(payload) {
 return async function (dispatch) {
   try {
     const { data } = await fetch.post(`${URL}/admin`, payload);
     dispatch({
       type: REGISTER_ADMIN,
       payload: data,
     });
   } catch (error) {
     throw error.response.data;
   }
 };
}


export function createReview(newReview) {
 return async function (dispatch) {
   const reviews = await fetch.post(`${URL}/review`, newReview);
   dispatch({
     type: CREATE_REVIEW,
     payload: reviews.data,
   });
 };
}


export const addToCart = (productById) => ({
 type: 'ADD_TO_CART',
 payload: productById,
});

export function removeFromCart(productId) {
 return {
   type: REMOVE_FROM_CART,
   payload: productId,
 };
}

export function putLocalstorage() {
 if (localStorage.getItem('cart')) {
   let cart = JSON.parse(localStorage.getItem('cart'));
   return {
     type: LOCAL_STORAGE,
     payload: cart,
     };
 } else {
     let cart = [];
     return {
       type: LOCAL_STORAGE,
       payload: cart,
   };
 }
}

export function finishPurchase(objectPago) {
 return async function compra(dispatch) {
   try {
     const response = await axios.post(`${URL}/purchase/order`, objectPago);
     window.location.href = response.data.init_point;

     dispatch({
       type: FINISH_PURCHASE, //afsdfgs

       payload: response.data,
     });
   } catch (error) {
     console.error('Error al tratar de finalizar compra', error);
   }
 };
}


export function getAllUsers() {
 return async function (dispatch) {
   const allUsers = await axios.get(`${URL}/user`);
   dispatch({
     type: GET_ALL_USERS,
     payload: allUsers.data,
    });
 };
}

export function deleteUser(id) {
 return async function (dispatch) {
   const deletedUser = await axios.put(`${URL}/user/delete/${id}`, { headers: { 'Cache-Control': 'no-cache'}});
   dispatch({
     type: DELETE_USER,
     payload: deletedUser.data,
   });
 };
}

export function getAllUsersDeleted() {
 return async function (dispatch) {
   const allUsersDeleted = await axios.get(`${URL}/user/deleted`, { headers: { 'Cache-Control': 'no-cache' }});
   dispatch({
     type: GET_ALL_USERS_DELETED,
     payload: allUsersDeleted.data,
   });
 };
}

export function restoreUser(id) {
 return async function (dispatch) {
   const restoredUser = await axios.put(`${URL}/user/restore/${id}`, { headers: { 'Cache-Control': 'no-cache' }});
   dispatch({
     type: RESTORE_USER,
     payload: restoredUser.data,
   });
 };
}

export function getUserByID(id) {
 return async function (dispatch) {
   const { data } = await axios.get(`${URL}/user/${id}`);
   console.log(data);
   dispatch({
     type: GET_USER_BY_ID,
     payload: data,
   });
 };
}


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
   }
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
     console.log(data);
     dispatch(postUserSuccess(data));
   } catch (error) {
     dispatch(postUserFailure(error.response.data.error));
   }
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
   }
 };
};


export const clearData = () => ({
 type: CLEAR_DATA,
});

export const setCurrentPage = (page) => {
 return {
   type: SET_CURRENT_PAGE,
   payload: page
 }
}
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
     console.log(data);
     dispatch(postMessageSuccess(data));
   } catch (error) {
     dispatch(postMessageError(error.response.data.error));
   }
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
   }
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
   }
 };
};

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
   }
 };
};

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
   }
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
   }
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
      console.log(data);
      dispatch(putUserAdminSuccess(data));
    } catch (error) {
      dispatch(putUserAdminError(error.response));
    }
  };
};
