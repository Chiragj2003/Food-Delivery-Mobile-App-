import { useEffect, useRef, useState } from "react";
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
 * Uses a simpler approach with serial number tracking to avoid infinite loops.
 */
const useAppwrite = <T, P = undefined>({
    fn,
    params = undefined as P,
    skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);
    const [fetchSerial, setFetchSerial] = useState(0);

    // Store latest values in refs
    const fnRef = useRef(fn);
    const paramsRef = useRef<P>(params);
    const isMountedRef = useRef(true);

    // Update refs on every render
    fnRef.current = fn;
    paramsRef.current = params;

    // Trigger fetch on mount and when fetchSerial changes
    useEffect(() => {
        if (skip) return;

        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fnRef.current(paramsRef.current);
                if (!cancelled && isMountedRef.current) {
                    setData(result);
                }
            } catch (err: unknown) {
                if (!cancelled && isMountedRef.current) {
                    const errorMessage =
                        err instanceof Error ? err.message : "An unknown error occurred";
                    setError(errorMessage);
                    Alert.alert("Error", errorMessage);
                }
            } finally {
                if (!cancelled && isMountedRef.current) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [skip, fetchSerial]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    /**
     * Allows callers to manually trigger the query with optional overrides.
     */
    const refetch = async (newParams?: P) => {
        if (newParams !== undefined) {
            paramsRef.current = newParams;
        }
        setFetchSerial(prev => prev + 1);
    };

    return { data, loading, error, refetch };
};

export default useAppwrite;