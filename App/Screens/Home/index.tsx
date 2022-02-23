import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TMDB_API_URI, TMDB_API_KEY } from '@env';

import { useAxios } from '../../utils';

const List = (data:any) => {
    const { id, title } = data;
    return (
        <View key={id}>
            <Text>
                {title}
            </Text>
        </View>
    );
};

const ErrorUI = () => <Text>Some Error</Text>;

const Home = () => {
    const [movieData, setMovieData] = useState([]);
    const [gerror, setError] = useState(null);

    const { response, error } = useAxios({
        method: 'GET',
        url: `${TMDB_API_URI}/discover/movie?api_key=${TMDB_API_KEY}`,
    });
    useEffect(() => {
        if (response) {
            setMovieData(response);
        } else {
            setError(error);
        }
    }, []);

    return (
        <View>
            {gerror ? ErrorUI() : movieData.map(List)}
        </View>
    );
};

export default Home;
