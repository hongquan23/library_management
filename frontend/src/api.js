import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://localhost:8000/",
});

export const bookApi = axios.create({
  baseURL: "http://localhost:8001/",
  
});

export const borrowApi = axios.create({
  baseURL: "http://localhost:8002/",
  
});

export const notificationApi = axios.create({
  baseURL: "http://localhost:8003/",
  
});

export  const registerUser = (data) => userApi.post("/users/register", data);   
export  const loginUser = (data) => userApi.post("/users/login", data);

