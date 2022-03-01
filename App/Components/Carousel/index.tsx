import React from 'react';
import {
    View, FlatList, Image, StyleSheet, Dimensions,
} from 'react-native';

interface CarouselProps {
    data: Array<any>;
}

const dimensions = Dimensions.get('screen');

const ImageComponent = ({ uri }: any) => (
    <Image
        style={styles.logo}
        source={{
            uri: `https://image.tmdb.org/t/p/w500${uri}`,
        }}
    />
);

const renderItem = ({ item }:any) => (<ImageComponent uri={item.poster_path} />);
const Carousel = ({ data }:CarouselProps) => (
    <View>
        <FlatList
            data={data}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item):any => item.id}
        />
    </View>

);

const styles = StyleSheet.create({
    logo: {
        width: dimensions.width,
        height: dimensions.height / 1.5,
    },
});

export default Carousel;
