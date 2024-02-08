import useSWR from "swr";
import { API_BASE_URL } from '../index';

export const getConceptDetail = (org, source, id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/orgs/${org}/sources/${source}/concepts/${id}/?includeMappings=true`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}
export const getConceptVersions = (org, source, id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/orgs/${org}/sources/${source}/concepts/${id}/versions/`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}

export const getConceptRelated = (org, source, id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `${API_BASE_URL}/orgs/${org}/sources/${source}/concepts/${id}/$cascade/?cascadeLevels=4&view=hierarchy&reverse=true&includeRetired=false&limit=100`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}