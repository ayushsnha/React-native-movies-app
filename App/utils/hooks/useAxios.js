import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = ({ method, url, data = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const axiosRequest = async () => {
        setError(false);
        setIsLoading(true);
        setResponse(null);
        try {
            const apiResponse = await axios({
                method,
                url,
                data,
            });
            setResponse(apiResponse.data.results);
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        axiosRequest();

    //   return () => {
    //     second
    //   }
    }, [method, url, data]);
    return { response, error, isLoading };
};

export default useAxios;
