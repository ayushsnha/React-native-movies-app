import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useAxios = ({ method, url, data = null }:AxiosRequestConfig) => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const axiosRequest = async () => {
        setIsLoading(true);
        try {
            const apiResponse = await axios({
                method,
                url,
                data,
            });
            setResponse(apiResponse.data.results);
            setError(null);
        } catch (err:any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        axiosRequest();
    }, [method, url, data]);

    return { response, error, isLoading };
};

export default useAxios;
