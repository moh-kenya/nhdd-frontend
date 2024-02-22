import useSWR from "swr";
import { API_BASE_URL } from "../index";
import Cookies from 'js-cookie';

export const getOrganizations = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, isLoading, isError, mutate } = useSWR(
    `${API_BASE_URL}/orgs/?limit=1000&verbose=false&includeRetired=false`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return {
    data,
    isLoading,
    isError,
    mutate,
  };
};

export const getUserOrganizations = () => {
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    }).then((res) => res.json());

  const { data, isLoading, isError, mutate } = useSWR(
    `${API_BASE_URL}/user/orgs/`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return {
    data,
    isLoading,
    isError,
    mutate,
  };
};
