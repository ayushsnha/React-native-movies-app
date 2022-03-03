import React, { useState, useEffect, useRef } from 'react';
import {
    View, FlatList, Image, StyleSheet, Dimensions, Animated,
} from 'react-native';

interface CarouselProps {
    data: Array<any>;
}

const { width, height } = Dimensions.get('window');

const ImageComponent = ({ uri }: any) => (
    <Image
        style={styles.logo}
        source={{
            uri: `https://image.tmdb.org/t/p/w500${uri}`,
        }}
    />
);

const renderItem = ({ item }:any) => (<ImageComponent uri={item.poster_path} />);

const infiniteScroll = (data:any, listRef:any) => {
    const dataLength = data.length;
    let scrollValue = 0; let scrolled = 0;
    // console.log(scrollValue, dataLength);
    setInterval(() => {
        scrolled += 1;
        if (scrolled < dataLength) {
            scrollValue += width;
        } else {
            scrollValue = 0;
            scrolled = 0;
        }
        if (listRef) {
            listRef.current.scrollToOffset({
                animated: true,
                offset: scrollValue,
            });
        }
    }, 2000);
};

const Carousel = ({ data }:CarouselProps) => {
    const [dataList, setDataList] = useState(data);
    const listRef = useRef();
    const scrollX = new Animated.Value(0);

    useEffect(() => {
        setDataList(data);
        infiniteScroll(dataList, listRef);
    }, []);

    const position = Animated.divide(scrollX, width);
    return (
        <View>
            <FlatList
                data={data}
                horizontal
                ref={listRef}
                renderItem={renderItem}
                keyExtractor={(item):any => item.id}
                pagingEnabled
                scrollEventThrottle={16}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: { x: scrollX },
                        },
                    }],
                    {
                        useNativeDriver: false, // check
                    },
                )}
            />
            <View style={styles.dotView}>
                {
                    data.map((_, i) => {
                        const opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5,
                                }}
                            />
                        );
                    })
                }
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    logo: {
        width,
        height: height / 1.5,
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default Carousel;
