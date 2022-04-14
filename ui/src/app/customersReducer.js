const initialState = {
  customers: [],
};

export const ActionTypes = {
  SET_CUSTOMERS: "SET_CUSTOMERS",
  NEW_CUSTOMER: "NEW_CUSTOMER",
  EDIT_CUSTOMER: "EDIT_CUSTOMER",
  DELETE_CUSTOMER: "DELETE_CUSTOMER",
};

export const ActionCreators = {
  setCustomers: (payload) => ({ type: ActionTypes.SET_CUSTOMERS, payload }),
  newCustomer: (payload) => ({ type: ActionTypes.NEW_CUSTOMER, payload }),
  editCustomer: (payload) => ({ type: ActionTypes.EDIT_CUSTOMER, payload }),
  deleteCustomer: (payload) => ({ type: ActionTypes.DELETE_CUSTOMER, payload }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CUSTOMERS:
      return { ...state, customers: [...action.payload] };
    case ActionTypes.NEW_CUSTOMER:
      return { ...state, customers: [action.payload, ...state.customers] };
    case ActionTypes.EDIT_CUSTOMER:
      var customers = state.customers.map((customer) => {
        if (customer.CustomerId === action.payload.CustomerId) {
          customer = action.payload;
        }
        return customer;
      });
      return { ...state, customers: [...customers] };
    case ActionTypes.DELETE_CUSTOMER:
      var customers = state.customers.filter(
        (customer) => customer.CustomerId !== action.payload.CustomerId
      );
      return { ...state, customers: [...customers] };
    default:
      return state;
  }
};
