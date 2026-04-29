import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountries = async (searchName) => {
  const url = searchName ? `/countries?name=${searchName}` : "/countries";
  const { data } = await axios.get(url);
  return data;
};

export const useCountries = (searchName = "") => {
  return useQuery({
    queryKey: ["countries", searchName],
    queryFn: () => fetchCountries(searchName),
  });
};
