import { useEffect, useState } from "react";
import { useHttpClient } from "./useHttp";
import { AxiosError } from "axios";

function useFetchData<T>(url: string): {
  data: T | null;
  isLoading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const responseData = await sendRequest<T>(url);
        setData(responseData);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message || "Something went wrong");
        }
        setError("Something went wrong");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, sendRequest]);

  return { data, isLoading, error };
}

export default useFetchData;
