import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useSearch = (user: string) => {
  const url = user ? `/api/search?search=${user}` : null;

  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  return { data, isLoading, error, mutate };
};
export default useSearch;
