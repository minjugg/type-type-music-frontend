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
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const response = await axios.request(params);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      setLoading(true);
      fetchData(axiosParams);
    }
  }, [axiosParams, trigger]);

  const refetch = () => {
    if (token) {
      setLoading(true);
      setTrigger(Date.now());
    }
  };

  return { data, loading, error, refetch };
};
