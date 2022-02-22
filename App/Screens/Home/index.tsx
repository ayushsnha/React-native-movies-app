import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { TMDB_API_URI, TMDB_API_KEY } from '@env';

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
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()
            .then((movies) => setMovieData(movies))
            .catch((err) => setError(err));
    }, []);

    const fetchData = async () => {
        const data = await axios.get(`${TMDB_API_URI}/discover/movie?api_key=${TMDB_API_KEY}`);
        return data.data.results;
    };

    return (
        <View>
            {error ? ErrorUI() : movieData.map(List)}
        </View>
    );
};

export default Home;
