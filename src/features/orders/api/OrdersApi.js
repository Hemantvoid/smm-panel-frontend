import api from "../../../axios";

export const fetchOrders = async (page) => {

  const res = await api.get(
    `/orders?page=${page}`
  );

  return res.data;
};

export const refillOrder = async (id) => {

  return api.post(
    `/orders/${id}/refill`
  );
};

export const cancelOrder = async (id) => {

  return api.post(
    `/orders/${id}/cancel`
  );
};