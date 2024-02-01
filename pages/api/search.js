
import useSWR from "swr";

export const searchConcepts = (searchParams) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `http://41.89.92.186:8000/concepts/?q=${searchParams}&verbose=false&includeRetired=false&includeInverseMappings=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}