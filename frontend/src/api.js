import axios from "axios";



export const userApi = axios.create({
  baseURL: "http://localhost:8000/",
});

export const bookApi = axios.create({
  baseURL: "http://localhost:8001/",
  
});

export const borrowApi = axios.create({
  baseURL: "http://localhost:8002/",
  headers: {
    'Content-Type': 'application/json', // 👈 QUAN TRỌNG
  }
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

//User API
export const getAllUsers = () => userApi.get("/users");
export const promoteUser = (userId) => userApi.put(`/users/${userId}/promote`);
export const deleteUser = (userId) => userApi.delete(`/users/${userId}`);
export const getUserById = (userId) => userApi.get(`/users/${userId}`);
export const getUsers = () => userApi.get("/users");


export const getBorrows = () => borrowApi.get("/borrow");
export const getBorrowById = (id) => borrowApi.get(`/borrow/${id}`);
export const createBorrow = (data) => borrowApi.post("/borrow", data);
export const returnBorrow = (id, data) => borrowApi.put(`/borrow/return/${id}`, data);
export const deleteBorrow = (id) => borrowApi.delete(`/borrow/${id}`);


export const getNotifications = () => notificationApi.get("/notifications");
export const deleteNotification = (id) => notificationApi.delete(`/notifications/${id}`);
export const getNotificationsByUser = (userId) =>notificationApi.get(`/notifications/user/${userId}`);