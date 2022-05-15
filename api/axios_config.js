import axios from "axios";
import { baseURL } from "./baseurl__links";

let token = localStorage.getItem("jwt");

let api = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export default api;
