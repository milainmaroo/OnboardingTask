const initialState = {
  products: [],
};

export const ActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
  NEW_PRODUCT: "NEW_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
};

export const ActionCreators = {
  setProducts: (payload) => ({ type: ActionTypes.SET_PRODUCTS, payload }),
  newProduct: (payload) => ({ type: ActionTypes.NEW_PRODUCT, payload }),
  editProduct: (payload) => ({ type: ActionTypes.EDIT_PRODUCT, payload }),
  deleteProduct: (payload) => ({ type: ActionTypes.DELETE_PRODUCT, payload }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: [...action.payload] };
    case ActionTypes.NEW_PRODUCT:
      return { ...state, products: [action.payload, ...state.products] };
    case ActionTypes.EDIT_PRODUCT:
      var products = state.products.map((product) => {
        if (product.ProductId === action.payload.ProductId) {
          product = action.payload;
        }
        return product;
      });
      return { ...state, products: [...products] };
    case ActionTypes.DELETE_PRODUCT:
      var products = state.products.filter(
        (product) => product.ProductId !== action.payload.ProductId
      );
      return { ...state, products: [...products] };
    default:
      return state;
  }
};
