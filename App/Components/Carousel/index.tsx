import React, { useState, useEffect, useRef } from 'react';
import {
    View, FlatList, StyleSheet, Dimensions, Animated,
} from 'react-native';

import Image from '../Image';

interface CarouselProps {
    data: Array<any>;
}

const { width, height } = Dimensions.get('window');

const renderItem = ({ item }:any) => (<Image styles={styles.logo} uri={item.poster_path} />);

const infiniteScroll = (data:any, listRef: React.RefObject<FlatList>, currentScrolled:number) => {
    const dataLength = data.length;
    let scrollValue = 0; let scrolled = currentScrolled; let
        eventId = null;
    if (listRef && dataLength > 0) {
        eventId = setInterval(() => {
            scrolled += 1;
            if (scrolled < dataLength) {
                scrollValue = scrolled * width;
            } else {
                scrollValue = 0;
                scrolled = 0;
            }
            if (listRef.current) {
                listRef.current.scrollToOffset({
                    animated: true,
                    offset: scrollValue,
                });
            }
        }, 4000);
    }
    return eventId;
};

const Carousel = ({ data }:CarouselProps) => {
    const [dataList, setDataList] = useState(data);
    const [currentScrolled, setCurrentScrolled] = useState(0);
    const listRef = useRef<FlatList>(null);
    const scrollX = useState(new Animated.Value(0))[0];

    const getScrollPosition = (e:any) => {
        setCurrentScrolled(e.nativeEvent.contentOffset.x / width);
    };

    useEffect(() => {
        setDataList(data);
    }, [data]);

    useEffect(() => {
        const eventId:any = infiniteScroll(dataList, listRef, currentScrolled);
        return (() => {
            clearInterval(eventId);
        });
    }, [dataList, currentScrolled]);

    const position = Animated.divide(scrollX, width);
    return (
        <View>
            <Animated.FlatList
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
                        useNativeDriver: true,
                    },
                )}
                onMomentumScrollEnd={(e) => getScrollPosition(e)}
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
                                key={_.id}
                                style={{
                                    opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 4, borderRadius: 5,
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
