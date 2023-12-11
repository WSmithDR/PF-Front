const initialState = {
    products: {results: []},
    productsByName: [],
    productById: [],
    deletedProducts: {results:[]},
    restoredProduct: [],
    deletedUser: [],
    allUsersDeleted: {results:[]},
    allUsers: {results: []},
    restoredUser: [],
    admins: [],
    users: [],
    reviews: [],
    localStorage: [],
    cart: [],
    items: [],
    currentPage:1,
    filters:{
      category: '',
      sale: 3,
      price: '',
    },
  
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
    
    dataUser: [],

    loadingPostCategory: false,
    errorPostCategory: false,
    successPostCategory: false,

    loadingPostMessage: false,
    errorPostMessage: false,
    successPostMessage: false,

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
  
    loadingGetAdminProducts: false,
    errorGetAdminProducts: false,
    successGetAdminProducts: false,
    adminProducts: [],

    loadingGetUserProducts: false,
    errorGetUserProducts: false,
    successGetUserProducts: false,
    userProducts: [],
};

export default initialState
