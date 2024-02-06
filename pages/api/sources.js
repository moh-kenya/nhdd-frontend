
import useSWR from "swr";
import { API_BASE_URL } from '../index';

export const getSources = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/orgs/MOH-KENYA/sources?limit=1000&verbose=false&includeRetired=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}
export const getSourceConcepts = (sourceName) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {
        data,
        isLoading,
        isError,
    } = useSWR(
        //LIVE
        `${API_BASE_URL}/orgs/MOH-KENYA/sources/${sourceName}/concepts/?limit=1000&verbose=false&includeRetired=false`,
        //TESTING
        // `${API_BASE_URL}/orgs/WHO/sources/${sourceName}/concepts/?limit=1000&verbose=false&includeRetired=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading:false, isError
    }
}