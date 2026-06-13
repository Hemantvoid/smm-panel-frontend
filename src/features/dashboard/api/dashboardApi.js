import api from "../../../axios";

export const fetchDashboard = async () => {

  const [
    walletRes,
    ordersRes,
  ] = await Promise.all([

    api.get("/wallet/balance"),

    api.get("/orders?page=0"),

  ]);

  return {
    balance: walletRes.data,
    orders: ordersRes.data,
  };
};