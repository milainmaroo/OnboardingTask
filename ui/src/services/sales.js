import { ActionCreators } from "../app/salesReducer";
import * as axios from "axios";

const axiosInstance = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}/sales`,
  // baseURL: "http://localhost:5000/sales",
  baseURL: "https://onboardingfinalapi.azurewebsites.net/sales",
});

export const GetSales = async (dispatch) => {
  try {
    const { data } = await axiosInstance.get();
    dispatch(ActionCreators.setSales(data));
  } catch {
    console.log("Error!");
  }
};

export const NewSale = async (dispatch, sale) => {
  try {
    // api call
    const { data } = await axiosInstance.post("", sale);

    dispatch(ActionCreators.newSale(data));
  } catch {
    console.log("Error!");
  }
};

export const EditSale = async (dispatch, sale) => {
  try {
    // api call
    await axiosInstance.put("", sale);
    dispatch(ActionCreators.editSale(sale));
  } catch {
    console.log("Error!");
  }
};

export const DeleteSale = async (dispatch, sale) => {
  try {
    // api call
    await axiosInstance.delete("", { data: { ...sale } });
    dispatch(ActionCreators.deleteSale(sale));
  } catch {
    console.log("Error!");
  }
};
