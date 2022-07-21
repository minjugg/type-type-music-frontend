import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../states/user";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL}`;

export const useAxios = (axiosParams) => {
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        setLoading(true);
        const response = await axios.request(params);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData(axiosParams);
    }
  }, [axiosParams.headers.Authorization]);

  return { data, loading, error };
};
