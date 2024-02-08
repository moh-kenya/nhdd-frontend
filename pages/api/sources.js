
import useSWR from "swr";
import { API_BASE_URL } from '../index';

export const getSources = (org) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/orgs/${org}/sources?limit=100&verbose=false&includeRetired=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}
export const getSourceConcepts = (sourceName, org, page = 1) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {
        data,
        isLoading,
        isError,
    } = useSWR(
        //LIVE
        `${API_BASE_URL}/orgs/${org}/sources/${sourceName}/concepts/?limit=20&page=${page}&verbose=false&includeRetired=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading: false, isError
    }
}