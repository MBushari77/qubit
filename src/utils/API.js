import axios from "axios";
import BaseAPI from "./BaseAPI";

export default axios.create({
  baseURL: BaseAPI,
  headers: {
    Accept: "*/*",
  },
});
