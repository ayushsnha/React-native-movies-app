import React, { useState, useEffect } from 'react';
import {
    View, Image, StyleSheet, Dimensions,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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

const Carousel = ({ data }:CarouselProps) => {
    const [images, setImages] = useState<Array<String>>([]);
    const [count, setCount] = useState(0);

    const calculateCount = (direction:String) => {
        const { length } = images;
        if (direction === 'left') {
            if (count === 0) {
                setCount(length - 1);
            } else {
                setCount((prev:number) => (prev - 1));
            }
        } else if (direction === 'right') {
            if (count === length - 1) {
                setCount(0);
            } else {
                setCount((prev:number) => (prev + 1));
            }
        }
    };

    useEffect(() => {
        const imageUrls:Array<String> = data.map((d) => d.poster_path);
        setImages(imageUrls);
    }, [data]);

    // useEffect(() => {

    // }, [count]);
    console.log(count);
    return (
        <View>
            <Swipeable
                renderLeftActions={() => (<ImageComponent uri={images[count - 1]} />)}
                renderRightActions={() => (<ImageComponent uri={images[count + 1]} />)}
                onSwipeableWillOpen={(direction) => (calculateCount(direction))}
            >
                <ImageComponent uri={images[count]} />
            </Swipeable>
        </View>

    );
};

const styles = StyleSheet.create({
    logo: {
        width: dimensions.width,
        height: dimensions.height / 1.5,
    },
});

export default Carousel;
