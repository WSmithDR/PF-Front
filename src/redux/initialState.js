const initialState = {
  //PRODUCTS
  loadingGetAllProducts: false,
  errorGetAllProducts: false,
  successGetAllProducts: false,
  products: {results: []},

  loadingGetProductByName: false,
  errorGetProductByName: false,
  successGetProductByName: false,
  productsByName: [],

  loadingGetDetailProduct: false,
  errorGetDetailProduct: false,
  successGetDetailProduct: false,
  detailProduct: [],

  loadingDeleteProduct: false,
  errorDeleteProduct: false,
  successDeleteProduct: false,
  deletedProducts: {results:[]},

  loadingPutProduct: false,
  errorPutProduct: false,
  successPutProduct: false,

  restoredProduct: [],


  //uSERS
  loadingGetAllUsers: false,
  errorGetAllUsers: false,
  successGetAllUsers: false,
  allUsers: {results: []},

  loadingPostLogin: false, 
  errorPostLogin: false,
  successPostLogin: false,
  access: false,
  messageLogin: '',

  loadingPostUser: false,
  errorPostUser: false,
  successPostUser: false,
  messageRegister: '',

  loadingPostTokenGoogle: false,
  errorPostTokenGoogle: false,
  successPostTokenGoogle: false,
  messageGoogle: '',

  loadingGetUserData: false,
  errorGetUserData: false,
  successGetUserData: false,
  userData: [],

  loadingPutUser: false,
  errorPutUser: false,
  successPutUser: false,

  loadingGetUserPurchase: false,
  errorGetUserPurchase: false,
  successGetUserPurchase: false,
  userPurchase: [],

  loadingGetUserProducts: false,
  errorGetUserProducts: false,
  successGetUserProducts: false,
  userProducts: [],

  //ADMINS
  admins: [],

  loadingPostCategory: false,
  errorPostCategory: false,
  successPostCategory: false,

  loadingPutUserAdmin: false,
  errorPutUserAdmin: false,
  successPutUserAdmin: false,

  loadingGetAdminProducts: false,
  errorGetAdminProducts: false,
  successGetAdminProducts: false,
  adminProducts: [],

  deletedUser: [],
  allUsersDeleted: {results:[]},
  restoredUser: [],

  //REVIEWS
  loadingPostReview: false,
  errorPostReview: false,
  successPostReview: false,
  
  loadingGetReviews: false,
  errorGetReviews: false,
  successGetReviews: false,
  reviews: [],

  loadingPutReview: false,
  errorPutReview: false,
  successPutReview: false,

  loadingDeleteReview: false,
  errorDeleteReview: false,
  successDeleteReview: false,

  //CART
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],

  //PAGE & FILTERS
  currentPage:1,
  filters:{
    category: '',
    sale: 3,
    price: '',
  },

    
  //MESSAGE
  loadingPostMessage: false,
  errorPostMessage: false,
  successPostMessage: false,
};

export default initialState
