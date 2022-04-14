import { ActionCreators } from "../app/productsReducer";
import * as axios from "axios";

const axiosInstance = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}/product`,
  // baseURL: "http://localhost:5000/product",
  baseURL: "https://onboardingfinalapi.azurewebsites.net/product",
});

export const GetProducts = async (dispatch) => {
  try {
    const { data } = await axiosInstance.get();
    dispatch(ActionCreators.setProducts(data));
  } catch {
    console.log("Error!");
  }
};

export const NewProduct = async (dispatch, product) => {
  try {
    // api call
    const { data } = await axiosInstance.post("", product);
    dispatch(ActionCreators.newProduct(data));
  } catch {
    console.log("Error!");
  }
};

export const EditProduct = async (dispatch, product) => {
  try {
    // api call
    await axiosInstance.put("", product);
    dispatch(ActionCreators.editProduct(product));
  } catch {
    console.log("Error!");
  }
};

export const DeleteProduct = async (dispatch, product) => {
  try {
    // api call
    await axiosInstance.delete("", { data: { ...product } });
    dispatch(ActionCreators.deleteProduct(product));
  } catch {
    console.log("Error!");
  }
};
