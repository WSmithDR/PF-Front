import initialState from './initialState';
import {
  ADD_TO_CART,
  CLEAR_DATA,
  CLEAR_SEARCH_RESULTS,
  CREATE_NEW_PRODUCT,
  CREATE_REVIEW,
  DELETE_PRODUCTS,
  FINISH_PURCHASE,
  GET_ALL_PRODUCTS,
  GET_DELETED_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_NAME,
  RESTORE_PRODUCT,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  DELETE_USER,
  GET_ALL_USERS_DELETED,
  RESTORE_USER,
  LOCAL_STORAGE,
  POST_LOGIN_FAILURE, POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS,
  POST_USER_FAILURE, POST_USER_REQUEST, POST_USER_SUCCESS,
  REGISTER_ADMIN,
  REGISTER_USER,
  REMOVE_FROM_CART,
  SEND_TOKEN_GOOGLE_FAILURE, SEND_TOKEN_GOOGLE_REQUEST, SEND_TOKEN_GOOGLE_SUCCESS,
  SET_CURRENT_PAGE,
  UPDATE_PRODUCTS,
  POST_MESSAGE_FAILURE, POST_MESSAGE_REQUEST, POST_MESSAGE_SUCCESS,
  GET_USERDATA_FAILURE, GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS,
  PUT_USERDATA_FAILURE, PUT_USERDATA_REQUEST, PUT_USERDATA_SUCCESS,  
  GET_USER_PURCHASES_FAILURE, GET_USER_PURCHASES_REQUEST, GET_USER_PURCHASES_SUCCESS,
  GET_ADMIN_PRODUCTS_FAILURE, GET_ADMIN_PRODUCTS_REQUEST, GET_ADMIN_PRODUCTS_SUCCESS,
  GET_USER_PRODUCTS_FAILURE, GET_USER_PRODUCTS_REQUEST, GET_USER_PRODUCTS_SUCCESS,
} from './types';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        productsByName: action.payload,
      };
      
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        productsByName: []
      };

    case GET_PRODUCTS_BY_ID:
      return {
        ...state,
        productById: action.payload,
      };

    case CREATE_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.id),
      };
    
    case RESTORE_PRODUCT:
      return {
        ...state,
        products: state.restoredProduct.filter(product => product.id !== action.payload),
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case GET_DELETED_PRODUCTS:
      return {
        ...state,
        deletedProducts: action.payload,
      };

    case REGISTER_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };

    case REGISTER_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    
    case LOCAL_STORAGE:
      return {
        ...state,
        localstorage: [action.payload],
      };
  
      case 'REMOVE_FROM_CART':
        const productIdToRemove = action.payload;
        const updatedCartAfterRemoval = state.cart.filter(item => item.id !== productIdToRemove);
        localStorage.setItem('cart', JSON.stringify(updatedCartAfterRemoval));
        return {
          ...state,
          cart: updatedCartAfterRemoval,
        };
    case FINISH_PURCHASE:
      return {
        ...state,
        cart: action.payload
      };
    case ADD_TO_CART:
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userData: action.payload,
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
        dataUser: action.payload.data
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
        dataUser: action.payload.data
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
        dataUser: action.payload.data,
        messageGoogle: action.payload.data.message
      };
    case SEND_TOKEN_GOOGLE_FAILURE:
      return {
        ...state,
        loadingPostTokenGoogle: false,
        errorPostTokenGoogle: action.payload,
        successPostTokenGoogle: false,
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
        dataUser: [],
      };

    case POST_MESSAGE_REQUEST:
      return{
        ...state,
        loadingPostMessage: true,
        errorPostMessage: false,
        successPostMessage: false,
      }
    case POST_MESSAGE_SUCCESS:
      return{
        ...state,
        loadingPostMessage: false,
        errorPostMessage: false,
        successPostMessage: true,
      }
    case POST_MESSAGE_FAILURE:
      return{
        ...state,
        loadingPostMessage: false,
        errorPostMessage: action.payload,
        successPostMessage: false,
      }


    case GET_USERDATA_REQUEST:
      return{
        ...state,
        loadingGetUserData: true,
        errorGetUserData: false,
        successGetUserData: false,
      }
    case GET_USERDATA_SUCCESS:
      return{
        ...state,
        loadingGetUserData: false,
        errorGetUserData: false,
        successGetUserData: true,
        userData: action.payload,
      }
    case GET_USERDATA_FAILURE:
      return{
        ...state,
        loadingGetUserData: false,
        errorGetUserData: action.payload,
        successGetUserData: false,
      }

    case PUT_USERDATA_REQUEST:
      return{
        ...state,
        loadingPutUser: true,
        errorPutUser: false,
        successPutUser: false,
      }
    case PUT_USERDATA_SUCCESS:
      return{
        ...state,
        loadingPutUser: false,
        errorPutUser: false,
        successPutUser: true,
        userData: action.payload,
      }
    case PUT_USERDATA_FAILURE:
      return{
        ...state,
        loadingPutUser: false,
        errorPutUser: action.payload,
        successPutUser: false,
      }

    case GET_USER_PURCHASES_REQUEST:
      return{
        ...state,
        loadingGetUserPurchase: true,
        errorGetUserPurchase: false,
        successGetUserPurchase: false,
      }
    case GET_USER_PURCHASES_SUCCESS:
      return{
        ...state,
        loadingGetUserPurchase: false,
        errorGetUserPurchase: false,
        successGetUserPurchase: true,
        userPurchase: action.payload,
      }
    case GET_USER_PURCHASES_FAILURE:
      return{
        ...state,
        loadingGetUserPurchase: false,
        errorGetUserPurchase: action.payload,
        successGetUserPurchase: false,
      }

    case GET_ADMIN_PRODUCTS_REQUEST:
      return{
        ...state,
        loadingGetAdminProducts: true,
        errorGetAdminProducts: false,
        successGetAdminProducts: false,
      }
    case GET_ADMIN_PRODUCTS_SUCCESS:
      return{
        ...state,
        loadingGetAdminProducts: false,
        errorGetAdminProducts: false,
        successGetAdminProducts: true,
        adminProducts: action.payload,
      }
    case GET_ADMIN_PRODUCTS_FAILURE:
      return{
        ...state,
        loadingGetAdminProducts: false,
        errorGetAdminProducts: action.payload,
        successGetAdminProducts: false,
      }
      
    case GET_USER_PRODUCTS_REQUEST:
      return{
        ...state,
        loadingGetUserProducts: true,
        errorGetUserProducts: false,
        successGetUserProducts: false,
      }
    case GET_USER_PRODUCTS_SUCCESS:
      return{
        ...state,
        loadingGetUserProducts: false,
        errorGetUserProducts: false,
        successGetUserProducts: true,
        userProducts: action.payload,
      }
    case GET_USER_PRODUCTS_FAILURE:
      return{
        ...state,
        loadingGetUserProducts: false,
        errorGetUserProducts: action.payload,
        successGetUserProducts: false,
      }
    default:
      return state;
  }
};
  
export default reducer;