import { ActionCreators } from "../app/customersReducer";
import * as axios from "axios";

const axiosInstance = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}/customer`,
  // baseURL: "http://localhost:5000/customer",
  baseURL: "https://onboardingfinalapi.azurewebsites.net/customer",
});

export const GetCustomers = async (dispatch) => {
  try {
    // api call
    // const customers = [
    //   { CustomerId: 1, CustomerName: "John", CustomerAddress: "Central" },
    //   { CustomerId: 2, CustomerName: "Sally", CustomerAddress: "Haymarket" },
    //   { CustomerId: 3, CustomerName: "Tara", CustomerAddress: "Ultimo" },
    // ];
    // dispatch(ActionCreators.setCustomers(customers));
    const { data } = await axiosInstance.get();
    //console.log({ data });
    dispatch(ActionCreators.setCustomers(data));
    //console.log(data);
  } catch {
    console.log("Error!");
  }
};

export const NewCustomer = async (dispatch, customer) => {
  try {
    // api call
    const { data } = await axiosInstance.post("", customer);
    // dispatch(
    //   ActionCreators.newCustomer({
    //     CustomerId: 10,
    //     CustomerName: customer.CustomerName,
    //     CustomerAddress: customer.CustomerAddress,
    //   })
    // );
    dispatch(ActionCreators.newCustomer(data));
  } catch {
    console.log("Error!");
  }
};

export const EditCustomer = async (dispatch, customer) => {
  try {
    // api call
    await axiosInstance.put("", customer);
    dispatch(ActionCreators.editCustomer(customer));
  } catch {
    console.log("Error!");
  }
};

export const DeleteCustomer = async (dispatch, customer) => {
  try {
    // api call
    await axiosInstance.delete("", { data: { ...customer } });
    dispatch(ActionCreators.deleteCustomer(customer));
  } catch {
    console.log("Error!");
  }
};
