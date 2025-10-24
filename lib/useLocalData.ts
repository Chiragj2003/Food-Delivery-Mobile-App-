import { useEffect, useState } from "react";

interface UseLocalDataOptions<T, P = undefined> {
    fn: (params?: P) => Promise<T>;
    params?: P;
}

interface UseLocalDataReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Simple hook for local data fetching - no complex dependencies
 */
const useLocalData = <T, P = undefined>({
    fn,
    params,
}: UseLocalDataOptions<T, P>): UseLocalDataReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fn(params);
                if (!cancelled) {
                    setData(result);
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    const errorMessage =
                        err instanceof Error ? err.message : "An error occurred";
                    setError(errorMessage);
                    console.error('Error fetching data:', errorMessage);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [refresh, JSON.stringify(params)]);

    const refetch = () => {
        setRefresh(prev => prev + 1);
    };

    return { data, loading, error, refetch };
};

export default useLocalData;
