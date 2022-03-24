import React from 'react';
import { Image as Img } from 'react-native';

interface ImageProps {
    uri: string;
    styles: object
}

const Image = ({ uri, styles }: ImageProps) => (
    <Img
        style={styles}
        source={{
            uri: `https://image.tmdb.org/t/p/w500${uri}`,
        }}
    />
);

export default Image;
