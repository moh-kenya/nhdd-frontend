
import useSWR from "swr";
import { API_BASE_URL } from '../index';

export const searchConcepts = (searchParams) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/concepts/?q=${searchParams}&limit=1000&verbose=false&includeRetired=false&includeInverseMappings=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}