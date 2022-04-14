import { ActionCreators } from "../app/storesReducer";
import * as axios from "axios";

const axiosInstance = axios.create({
  //baseURL: `${process.env.REACT_APP_BASE_URL}/store`,
  // baseURL: "http://localhost:5000/store",
  baseURL: "https://onboardingfinalapi.azurewebsites.net/store",
});

export const GetStores = async (dispatch) => {
  try {
    const { data } = await axiosInstance.get();
    dispatch(ActionCreators.setStores(data));
  } catch {
    console.log("Error!");
  }
};

export const NewStore = async (dispatch, store) => {
  try {
    // api call
    const { data } = await axiosInstance.post("", store);
    dispatch(ActionCreators.newStore(data));
  } catch {
    console.log("Error!");
  }
};

export const EditStore = async (dispatch, store) => {
  try {
    // api call
    await axiosInstance.put("", store);
    dispatch(ActionCreators.editStore(store));
  } catch {
    console.log("Error!");
  }
};

export const DeleteStore = async (dispatch, store) => {
  try {
    // api call
    await axiosInstance.delete("", { data: { ...store } });
    dispatch(ActionCreators.deleteStore(store));
  } catch {
    console.log("Error!");
  }
};
