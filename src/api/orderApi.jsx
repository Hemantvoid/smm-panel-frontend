import api from "../axios";

export const getOrders = async (page) => {
  const res = await api.get(`/orders?page=${page}&size=5`);
  return res.data;
};

export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};
export const getBalance = async () => {
  const res = await api.get("/wallet/balance");
  return res.data;
};

export const addBalance = async (amount) => {
  const res = await api.post(`/wallet/add?amount=${amount}`);
  return res.data;
};

export const getTransactions = (username) => {
  return api.get(`/transactions/user?username=${username}`);
};