import axios from 'axios';

// Products

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME';
export const GET_PRODUCTS_BY_ID = 'GET_BY_ID';
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT';
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const GET_DELETED_PRODUCTS = 'GET_DELETED_PRODUCTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

// LocalStorage

export const LOCAL_STORAGE = 'LOCAL_STORAGE';

// Cart

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const FINISH_PURCHASE = 'FINISH_PURCHASE';

// Admin

export const REGISTER_ADMIN = 'REGISTER_NEW_ADMIN';

// Users

export const REGISTER_USER = 'REGISTER_NEW_USER';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export const SEND_TOKEN_GOOGLE_REQUEST = 'SEND_TOKEN_GOOGLE_REQUEST';
export const SEND_TOKEN_GOOGLE_SUCCESS = 'SEND_TOKEN_GOOGLE_SUCCESS';
export const SEND_TOKEN_GOOGLE_FAILURE = 'SEND_TOKEN_GOOGLE_FAILURE';

export const CLEAR_DATA = 'CLEAR_DATA'
// Reviews

export const CREATE_REVIEW = 'CREATE_REVIEW';

// Actions

const URL = 'https://pfback1-q5aoyanf.b4a.run';

export function getAllProducts(page, limit, filters) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/product`, {
        params: { page, limit, ...filters },
      });
      console.log(response.data);
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
      const deletedProduct = await fetch.put(`${URL}/product/delete/${id}`);
      dispatch({
        type: DELETE_PRODUCTS,
        payload: deletedProduct.data,
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
      const getDeletedProducts = await fetch.get(`${URL}/product/deleted`);
      console.log(getDeletedProducts);
      dispatch({
        type: GET_DELETED_PRODUCTS,
        payload: getDeletedProducts.data.results,
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

export function removeFromCart(productId) {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
    };
  }

  export function finishPurchase(objectPago) {
    return async function compra(dispatch) {
      try {
        const response = await axios.post(`${URL}/purchase/order`, objectPago);
        window.location.href = response.data.init_point;
  
        dispatch({
          type: FINISH_PURCHASE,
  
          payload: response.data,
        });
      } catch (error) {
        console.error('Error al tratar de finalizar compra', error);
      }
    };
  }

  export const addToCart = (productById) => ({
    type: 'ADD_TO_CART',
    payload: productById,
  });

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
      console.log(data);
      dispatch(postTokenGoogleSuccess(data));
    } catch (error) {
      dispatch(postTokenGoogleFailure(error));
    }
  };
};

export const clearData = () => ({
  type: CLEAR_DATA,
});