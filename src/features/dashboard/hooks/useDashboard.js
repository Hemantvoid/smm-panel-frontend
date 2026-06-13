import { useQuery } from "@tanstack/react-query";

import {
  fetchDashboard,
} from "../api/dashboardApi";

export const useDashboard = () => {

  return useQuery({

    queryKey: ["dashboard"],

    queryFn: fetchDashboard,

  });
};