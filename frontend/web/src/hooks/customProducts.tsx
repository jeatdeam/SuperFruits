import { useState, useCallback,useEffect } from "react";

export function useFetchProducts() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean|number>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback((endpoint: string) => {

        setLoading(true);
        setError(null);

        setTimeout(() => {
            fetch(`http://localhost:3000${endpoint}`, {
                headers: { "Content-Type": "application/json" }
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 3000);
    }, []);


    useEffect(() => {
        // console.log('Data:', data);
        // console.log('Loading:', loading);
        // console.log('Error:', error);
    }, [data, loading, error]);

    return { data, loading, error, fetchData };
}
