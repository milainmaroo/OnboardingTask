const initialState = {
  sales: [],
};

export const ActionTypes = {
  SET_SALES: "SET_SALES",
  NEW_SALE: "NEW_SALE",
  EDIT_SALE: "EDIT_SALE",
  DELETE_SALE: "DELETE_SALE",
};

export const ActionCreators = {
  setSales: (payload) => ({ type: ActionTypes.SET_SALES, payload }),
  newSale: (payload) => ({ type: ActionTypes.NEW_SALE, payload }),
  editSale: (payload) => ({ type: ActionTypes.EDIT_SALE, payload }),
  deleteSale: (payload) => ({ type: ActionTypes.DELETE_SALE, payload }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SALES:
      return { ...state, sales: [...action.payload] };
    case ActionTypes.NEW_SALE:
      return { ...state, sales: [action.payload, ...state.sales] };
    case ActionTypes.EDIT_SALE:
      var sales = state.sales.map((sale) => {
        if (sale.SalesId === action.payload.SalesId) {
          sale = action.payload;
        }
        return sale;
      });
      return { ...state, sales: [...sales] };
    case ActionTypes.DELETE_SALE:
      var sales = state.sales.filter(
        (sale) => sale.SalesId !== action.payload.SalesId
      );
      return { ...state, sales: [...sales] };
    default:
      return state;
  }
};
