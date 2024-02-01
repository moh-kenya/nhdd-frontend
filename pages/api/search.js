
import useSWR from "swr";

export const searchConcepts = (searchParams) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const {
        data,
        isLoading,
        isError,
        mutate,
    } = useSWR(
        `https://nhdd-staging-api.health.go.ke/concepts/?q=${searchParams}&verbose=false&includeRetired=false&includeInverseMappings=false`,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
        data, isLoading, isError, mutate
    }
}