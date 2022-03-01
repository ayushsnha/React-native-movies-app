import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TMDB_API_URI, TMDB_API_KEY } from '@env';
// import { SliderBox } from 'react-native-image-slider-box';

import { useAxios } from '../../utils';

import { Carousel } from '../../Components';

const ErrorUI = () => <Text>Some Error</Text>;

const Home = () => {
    const [movieData, setMovieData] = useState([]);
    const [gerror, setError] = useState(null);

    const { response, error }:any = useAxios({
        method: 'GET',
        url: `${TMDB_API_URI}/discover/movie?api_key=${TMDB_API_KEY}`,
    });

    useEffect(() => {
        if (response) {
            setMovieData(response);
        } else {
            setError(error);
        }
    }, [response]);
    return (
        <View>
            {gerror ? ErrorUI()
                : (
                    <Carousel data={movieData} />
                )}

        </View>
    );
};

export default Home;
