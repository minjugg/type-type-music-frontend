import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../states/user";
import axios from "axios";

export const useFetchData = (url, contentType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (token) {
      setLoading(true);

      const response = axios.get(url, {
        headers: {
          "Content-Type": contentType,
          charset: "utf-8",
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [url]);

  return { data, loading, error };
};
