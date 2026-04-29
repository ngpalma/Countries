import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountry = async (id) => {
  const { data } = await axios.get(`/countries/${id}`);
  return data;
};

export const useCountry = (id) => {
  return useQuery({
    queryKey: ["country", id],
    queryFn: () => fetchCountry(id),
    enabled: !!id,
  });
};
