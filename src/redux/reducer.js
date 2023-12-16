import initialState from './initialState';
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

  FINISH_PURCHASE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  
  GET_ADMIN_PRODUCTS_FAILURE, GET_ADMIN_PRODUCTS_REQUEST, GET_ADMIN_PRODUCTS_SUCCESS,
  PUT_USER_ADMIN_FAILURE, PUT_USER_ADMIN_REQUEST, PUT_USER_ADMIN_SUCCESS,
  DELETE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAILURE, UPDATE_PRODUCTS_REQUEST, UPDATE_PRODUCTS_SUCCESS,
  
  DELETE_USER,
  GET_ALL_USERS_DELETED,
  GET_DELETED_PRODUCTS,
  RESTORE_PRODUCT,
  RESTORE_USER,
  

  POST_MESSAGE_FAILURE, POST_MESSAGE_REQUEST, POST_MESSAGE_SUCCESS,
  
  SET_CURRENT_PAGE, SET_FILTERS,
} from './types';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //PRODUCTS
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingGetAllProducts: true,
        errorGetAllProducts: false,
        successGetAllProducts: false,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loadingGetAllProducts: false,
        errorGetAllProducts: false,
        successGetAllProducts: true,
        products: action.payload,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loadingGetAllProducts: false,
        errorGetAllProducts: action.payload,
        successGetAllProducts: false,
      };
    
    case GET_PRODUCTS_BY_NAME_REQUEST:
      return {
        ...state,
        loadingGetProductByName: true,
        errorGetProductByName: false,
        successGetProductByName: false,
      };
    case GET_PRODUCTS_BY_NAME_SUCCESS:
      return {
        ...state,
        loadingGetProductByName: false,
        errorGetProductByName: false,
        successGetProductByName: true,
        productsByName: action.payload,
      };
    case GET_PRODUCTS_BY_NAME_FAILURE:
      return {
        ...state,
        loadingGetProductByName: false,
        errorGetProductByName: action.payload,
        successGetProductByName: false,
      }; 

    case GET_DETAIL_PRODUCT_REQUEST:
      return {
        ...state,
        loadingGetDetailProduct: true,
        errorGetDetailProduct: false,
        successGetDetailProduct: false,
      };
    case GET_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingGetDetailProduct: false,
        errorGetDetailProduct: false,
        successGetDetailProduct: true,
        detailProduct: action.payload,
      };
    case GET_DETAIL_PRODUCT_FAILURE:
      return {
        ...state,
        loadingGetDetailProduct: false,
        errorGetDetailProduct: action.payload,
        successGetDetailProduct: false,
      };


    //USERS
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loadingGetAllUsers: true,
        errorGetAllUsers: false,
        successGetAllUsers: false,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loadingGetAllUsers: false,
        errorGetAllUsers: false,
        successGetAllUsers: true,
        allUsers: action.payload,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loadingGetAllUsers: false,
        errorGetAllUsers: action.payload,
        successGetAllUsers: false,
      };

    case GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        loadingGetUserData: true,
        errorGetUserData: false,
        successGetUserData: false,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loadingGetUserData: false,
        errorGetUserData: false,
        successGetUserData: true,
        userData: action.payload,
      };
    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        loadingGetUserData: false,
        errorGetUserData: action.payload,
        successGetUserData: false,
      };

    case POST_LOGIN_REQUEST:
      return {
        ...state,
        loadingPostLogin: true,
        errorPostLogin: false,
        successPostLogin: false,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        loadingPostLogin: false,
        errorPostLogin: false,
        successPostLogin: true,
        access: action.payload.access,
        messageLogin: action.payload.data.message,
      };
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        loadingPostLogin: false,
        errorPostLogin: action.payload,
        successPostLogin: false,
      };

    case POST_USER_REQUEST:
      return {
        ...state,
        loadingPostUser: true,
        errorPostUser: false,
        successPostUser: false,
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        loadingPostUser: false,
        errorPostUser: false,
        successPostUser: true,
        access: action.payload.access,
        messageRegister: action.payload.data.message,
      };
    case POST_USER_FAILURE:
      return {
        ...state,
        loadingPostUser: false,
        errorPostUser: action.payload,
        successPostUser: false,
      };

    case SEND_TOKEN_GOOGLE_REQUEST:
      return {
        ...state,
        loadingPostTokenGoogle: true,
        errorPostTokenGoogle: false,
        successPostTokenGoogle: false,
      };
    case SEND_TOKEN_GOOGLE_SUCCESS:
      return {
        ...state,
        loadingPostTokenGoogle: false,
        errorPostTokenGoogle: false,
        successPostTokenGoogle: true,
        access: action.payload.access,
        messageGoogle: action.payload.data.message
      };
    case SEND_TOKEN_GOOGLE_FAILURE:
      return {
        ...state,
        loadingPostTokenGoogle: false,
        errorPostTokenGoogle: action.payload,
        successPostTokenGoogle: false,
      };

    case GET_USERDATA_REQUEST:
      return{
        ...state,
        loadingGetUserData: true,
        errorGetUserData: false,
        successGetUserData: false,
      };
    case GET_USERDATA_SUCCESS:
      return{
        ...state,
        loadingGetUserData: false,
        errorGetUserData: false,
        successGetUserData: true,
        userData: action.payload,
      };
    case GET_USERDATA_FAILURE:
      return{
        ...state,
        loadingGetUserData: false,
        errorGetUserData: action.payload,
        successGetUserData: false,
      };

    case PUT_USERDATA_REQUEST:
      return{
        ...state,
        loadingPutUser: true,
        errorPutUser: false,
        successPutUser: false,
      };
    case PUT_USERDATA_SUCCESS:
      return{
        ...state,
        loadingPutUser: false,
        errorPutUser: false,
        successPutUser: true,
        userData: action.payload,
      };
    case PUT_USERDATA_FAILURE:
      return{
        ...state,
        loadingPutUser: false,
        errorPutUser: action.payload,
        successPutUser: false,
      };

    case GET_USER_PURCHASES_REQUEST:
      return{
        ...state,
        loadingGetUserPurchase: true,
        errorGetUserPurchase: false,
        successGetUserPurchase: false,
      };
    case GET_USER_PURCHASES_SUCCESS:
      return{
        ...state,
        loadingGetUserPurchase: false,
        errorGetUserPurchase: false,
        successGetUserPurchase: true,
        userPurchase: action.payload,
      };
    case GET_USER_PURCHASES_FAILURE:
      return{
        ...state,
        loadingGetUserPurchase: false,
        errorGetUserPurchase: action.payload,
        successGetUserPurchase: false,
      };

    //CLEAR
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        productsByName: []
      };

    case CLEAR_DATA:
      return {
        ...state,
        messageLogin: '',
        messageRegister: '',
        messageGoogle: '',
        loadingPostLogin: false,
        errorPostLogin: false,
        successPostLogin: false,
        access: false,
        loadingPostUser: false,
        errorPostUser: false,
        successPostUser: false,
        loadingPostTokenGoogle: false,
        errorPostTokenGoogle: false,
        successPostTokenGoogle: false,
        userData: [],
        loadingGetUserData: false,
        errorGetUserData: false,
        successGetUserData: false,
      };

    case CLEAR_MESSAGE_STATUS:
      return {
        ...state,
        loadingPostMessage: false, 
        errorPostMessage: false,
        successPostMessage: false,
      };
  

    //REVIEWS
    case CREATE_REVIEW_REQUEST:
      return{
        ...state,
        loadingPostReview: true,
        errorPostReview: false,
        successPostReview: false,
      };
    case CREATE_REVIEW_SUCCESS:
      return{
        ...state,
        loadingPostReview: false,
        errorPostReview: false,
        successPostReview: true,
        reviews: [...state.reviews, action.payload],
      };
    case CREATE_REVIEW_FAILURE:
      return{
        ...state,
        loadingPostReview: false,
        errorPostReview: action.payload,
        successPostReview: false,
      };

    case GET_REVIEWS_REQUEST:
      return{
        ...state,
        loadingGetReviews: true,
        errorGetReviews: false,
        successGetReviews: false,
      };
    case GET_REVIEWS_SUCCESS:
      return{
        ...state,
        loadingGetReviews: false,
        errorGetReviews: false,
        successGetReviews: true,
        reviews: action.payload,
      };
    case GET_REVIEWS_FAILURE:
      return{
        ...state,
        loadingGetReviews: false,
        errorGetReviews: action.payload,
        successGetReviews: false,
      };


    //ADMINS
    case GET_ADMIN_PRODUCTS_REQUEST:
      return{
        ...state,
        loadingGetAdminProducts: true,
        errorGetAdminProducts: false,
        successGetAdminProducts: false,
      };
    case GET_ADMIN_PRODUCTS_SUCCESS:
      return{
        ...state,
        loadingGetAdminProducts: false,
        errorGetAdminProducts: false,
        successGetAdminProducts: true,
        adminProducts: action.payload,
      };
    case GET_ADMIN_PRODUCTS_FAILURE:
      return{
        ...state,
        loadingGetAdminProducts: false,
        errorGetAdminProducts: action.payload,
        successGetAdminProducts: false,
      };

    case GET_USER_PRODUCTS_REQUEST:
      return{
        ...state,
        loadingGetUserProducts: true,
        errorGetUserProducts: false,
        successGetUserProducts: false,
      };
    case GET_USER_PRODUCTS_SUCCESS:
      return{
        ...state,
        loadingGetUserProducts: false,
        errorGetUserProducts: false,
        successGetUserProducts: true,
        userProducts: action.payload,
      };
    case GET_USER_PRODUCTS_FAILURE:
      return{
        ...state,
        loadingGetUserProducts: false,
        errorGetUserProducts: action.payload,
        successGetUserProducts: false,
      };

    case PUT_USER_ADMIN_REQUEST:
      return{
        ...state,
        loadingPutUserAdmin: true,
        errorPutUserAdmin: false,
        successPutUserAdmin: false,
      };
    case PUT_USER_ADMIN_SUCCESS:
      let allUsersPut = state.allUsers.filter(user => user.id !== action.payload.id);
      return{
        ...state,
        loadingPutUserAdmin: false,
        errorPutUserAdmin: false,
        successPutUserAdmin: true,
        allUsers: [...allUsersPut, action.payload],
      };
    case PUT_USER_ADMIN_FAILURE:
      return{
        ...state,
        loadingPutUserAdmin: false,
        errorPutUserAdmin: action.payload,
        successPutUserAdmin: false,
      };

    case DELETE_PRODUCTS_REQUEST:
      return{
        ...state,
        loadingDeleteProduct: true,
        errorDeleteProduct: false,
        successDeleteProduct: false,
      };
    case DELETE_PRODUCTS_SUCCESS:
      return{
        ...state,
        loadingDeleteProduct: false,
        errorDeleteProduct: false,
        successDeleteProduct: true,
        deletedProduct: action.payload,
      };
    case DELETE_PRODUCTS_FAILURE:
      return{
        ...state,
        loadingDeleteProduct: false,
        errorDeleteProduct: action.payload,
        successDeleteProduct: false,
      };

    case UPDATE_PRODUCTS_REQUEST:
      return{
        ...state,
        loadingPutProduct: true,
        errorPutProduct: false,
        successPutProduct: false,
      };
    case UPDATE_PRODUCTS_SUCCESS:
      return{
        ...state,
        loadingPutProduct: false,
        errorPutProduct: false,
        successPutProduct: true,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case UPDATE_PRODUCTS_FAILURE:
      return{
        ...state,
        loadingPutProduct: false,
        errorPutProduct: action.payload,
        successPutProduct: false,
      };

    case RESTORE_PRODUCT:
      return {
        ...state,
        products: state.restoredProduct.filter(product => product.id !== action.payload),
      };


    case GET_DELETED_PRODUCTS:
      return {
        ...state,
        deletedProducts: action.payload,
      };
  
    case DELETE_USER:
      return {
        ...state,
        user: state.deletedUser.filter(user => user.id !== action.payload.id),
      };
      
    case GET_ALL_USERS_DELETED:
      return {
        ...state,
        allUsersDeleted: action.payload,
      };

    case RESTORE_USER:
      return {
        ...state,
        user: state.restoredUser.filter(user => user.id !== action.payload),
      };
  
    //Cart
    case FINISH_PURCHASE:
      return {
        ...state,
        cart: action.payload
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      const indexToRemove = state.cart.findIndex(item => item.id === action.payload);
      
      if (indexToRemove !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[indexToRemove].quantity -= 1;
    
        if (updatedCart[indexToRemove].quantity === 0) {
          updatedCart.splice(indexToRemove, 1);
        }
    
        return {
          ...state,
          cart: updatedCart,
        };
      }
      return state;

  
    //MESSAGES
    case POST_MESSAGE_REQUEST:
      return{
        ...state,
        loadingPostMessage: true,
        errorPostMessage: false,
        successPostMessage: false,
      };
    case POST_MESSAGE_SUCCESS:
      return{
        ...state,
        loadingPostMessage: false,
        errorPostMessage: false,
        successPostMessage: true,
      };
    case POST_MESSAGE_FAILURE:
      return{
        ...state,
        loadingPostMessage: false,
        errorPostMessage: action.payload,
        successPostMessage: false,
      };
    

    //PAGE & FILTERS
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };


    default:
      return state;
  }
};
  
export default reducer;