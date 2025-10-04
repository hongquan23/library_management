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
export const resetPassword = async(data) => {
  return await userApi.post("/users/reset-password",data);
}
// ================== Book API ==================
export const getBooks = () => bookApi.get("/books");
export const getBookById = (id) => bookApi.get(`/books/${id}`);
export const createBook = (data) => bookApi.post("/books", data);
export const updateBook = (id, data) => bookApi.put(`/books/${id}`, data);
export const deleteBook = (id) => bookApi.delete(`/books/${id}`);