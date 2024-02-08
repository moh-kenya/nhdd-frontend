
import useSWR from "swr";
import { API_BASE_URL } from '../index';

export const searchConcepts = (searchParams, owner, source) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    let surl = `${API_BASE_URL}/concepts/?q=${searchParams}`
    if (owner) surl += `&owner=${owner}`
    if (source) surl += `&source=${source}`
    surl += `&limit=1000&verbose=false&includeRetired=false&includeInverseMappings=false`
    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        surl,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}