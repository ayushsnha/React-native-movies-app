import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TMDB_API_URI, TMDB_API_KEY } from '@env';
import { SliderBox } from 'react-native-image-slider-box';

import { useAxios } from '../../utils';

const dimensions = Dimensions.get('screen');

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
            setMovieData(response.map((d:any) => `https://image.tmdb.org/t/p/w500/${d.poster_path}`));
        } else {
            setError(error);
        }
    }, [response]);
    return (
        <View>
            {gerror ? ErrorUI()
                : (
                    <SliderBox
                        images={movieData}
                        autoPlay
                        circleLoop
                        dotStyle={{ height: 0 }}
                        sliderBoxHeight={dimensions.height / 1.5}
                    />
                )}
        </View>
    );
};

export default Home;
