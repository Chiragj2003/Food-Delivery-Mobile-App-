import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

interface UseAppwriteOptions<T, P = undefined> {
    fn: (params: P) => Promise<T>;
    params?: P;
    skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: (newParams?: P) => Promise<void>;
}

/**
 * Reusable hook that wraps Appwrite queries, handling loading, error display, and manual refetching.
 */
const useAppwrite = <T, P = undefined>({
    fn,
    params = undefined as P,
    skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    // Store fn in ref to avoid dependency issues
    const fnRef = useRef(fn);
    const paramsRef = useRef<P>(params);
    const initialFetchDone = useRef(false);

    // Update refs when they change
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        paramsRef.current = params;
    }, [params]);

    /**
     * Executes the provided Appwrite function with the latest params and stores the results.
     */
    const fetchData = useCallback(async (fetchParams?: P) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fnRef.current((fetchParams ?? paramsRef.current) as P);
            setData(result);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "An unknown error occurred";
            setError(errorMessage);
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies - uses refs

    // Initial fetch only
    useEffect(() => {
        if (!skip && !initialFetchDone.current) {
            initialFetchDone.current = true;
            fetchData(paramsRef.current);
        }
    }, [skip, fetchData]);

    /**
     * Allows callers to manually trigger the query with optional overrides.
     */
    const refetch = useCallback(
        async (newParams?: P) => {
            if (newParams !== undefined) {
                paramsRef.current = newParams;
            }

            await fetchData(newParams ?? paramsRef.current);
        },
        [fetchData]
    );

    return { data, loading, error, refetch };
};

export default useAppwrite;