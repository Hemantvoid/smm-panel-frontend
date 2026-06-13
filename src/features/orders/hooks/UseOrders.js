import { useQuery } from "@tanstack/react-query";

import { fetchOrders } from "../api/ordersApi";

export const useOrders = (page) => {

  return useQuery({

    queryKey: ["orders", page],

    queryFn: () => fetchOrders(page),

  });
};