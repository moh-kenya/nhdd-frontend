
import useSWR from "swr";
import { API_BASE_URL } from '../index';

export const getCollections = (org) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/orgs/${org}/collections/?limit=25&verbose=false&includeRetired=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}
export const getCollectionConcepts = (collection, org, page = 1) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {
        data,
        isLoading,
        isError,
    } = useSWR(
        //LIVE
        `${API_BASE_URL}/orgs/${org}/collections/${collection}/concepts/?limit=25&page=${page}&verbose=false&includeRetired=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading: false, isError
    }
}