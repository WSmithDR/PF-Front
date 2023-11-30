import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_PRODUCTS_BY_ID,
    CREATE_NEW_PRODUCT,
    DELETE_PRODUCTS,
    UPDATE_PRODUCTS,
    GET_DELETED_PRODUCTS,
    REGISTER_ADMIN,
    REGISTER_USER,
    CREATE_REVIEW,
    CLEAR_SEARCH_RESULTS,
    LOCAL_STORAGE,
    REMOVE_FROM_CART,
    FINISH_PURCHASE,
    ADD_TO_CART
  } from './actions';
  
  const initialState = {
    products: [],
    productsByName: [],
    productById: [],
    deletedProducts: [],
    admins: [],
    users: [],
    reviews: [],
    localStorage: [],
    cart: [],
    items: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
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
      
      case REMOVE_FROM_CART:
        // eslint-disable-next-line no-case-declarations
        const productIdToRemove = action.payload;
          return {
          ...state,
           cart: state.cart.filter(item => item.id !== productIdToRemove),
  };
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
          default:
            return state;
          }
  };
  
  export default reducer;