import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchActivities = async () => {
  const { data } = await axios.get("/activities");
  return data;
};

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });
};
