import axios from "axios";

export const api = axios.create({
  baseURL: "http://15.164.4.234/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
