const initialState = {
  stores: [],
};

export const ActionTypes = {
  SET_STORES: "SET_STORES",
  NEW_STORE: "NEW_STORE",
  EDIT_STORE: "EDIT_STORE",
  DELETE_STORE: "DELETE_STORE",
};

export const ActionCreators = {
  setStores: (payload) => ({ type: ActionTypes.SET_STORES, payload }),
  newStore: (payload) => ({ type: ActionTypes.NEW_STORE, payload }),
  editStore: (payload) => ({ type: ActionTypes.EDIT_STORE, payload }),
  deleteStore: (payload) => ({ type: ActionTypes.DELETE_STORE, payload }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_STORES:
      return { ...state, stores: [...action.payload] };
    case ActionTypes.NEW_STORE:
      return { ...state, customers: [action.payload, ...state.customers] };
    case ActionTypes.EDIT_STORE:
      var stores = state.stores.map((store) => {
        if (store.StoreId === action.payload.StoreId) {
          store = action.payload;
        }
        return store;
      });
      return { ...state, stores: [...stores] };
    case ActionTypes.DELETE_STORE:
      var stores = state.stores.filter(
        (store) => store.StoreId !== action.payload.StoreId
      );
      return { ...state, stores: [...stores] };
    default:
      return state;
  }
};
