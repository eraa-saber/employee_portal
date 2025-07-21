import axios from "axios";

const instance = axios.create({
  baseURL: "http://backend2.api/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
