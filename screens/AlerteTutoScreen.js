import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView, Pressable, Dimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-anchor-carousel';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;

const testData = [
    {
        image: require('../assets/images/tuto5.jpg'),
        title: 'Vous pouvez également directement cliquer sur "Alerte" pour trouver une plaque !'
    }
]

const AlerteTutoScreen = () => {

    const carouselRef = React.useRef(null);

    function renderItem({item, index}) {
        const {image, title, url} = item;
        return (
            <Pressable
                activeOpacity={1}
                style={styles.item}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}>
                <Image source={image} style={styles.image} />
                <View style={styles.lowerContainer}>
                    <View style={styles.lowerLeft}>
                        <Text style={styles.titleText} numberOfLines={5}>
                            {title}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <Carousel
            keyExtractor={item => item?.id}
            style={[styles.carousel]}
            ref={carouselRef}
            data={testData}
            renderItem={renderItem}
            itemWidth={ITEM_WIDTH}
            separatorWidth={SEPARATOR_WIDTH}
            inActiveScale={1}
            inActiveOpacity={1}
            containerWidth={windowWidth}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: 200
    },
    container: {
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginVertical: '6%',
        textAlign: 'center'
    },
    imageContainer2: {
        display: 'flex',
        flexDirection: 'column'
    },
    carousel: {
        width: windowWidth,
        height: ITEM_WIDTH + 500,
        flexGrow: 0,
    },
    lowerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingLeft: '1%'
    },
    lowerLeft: {
        width: '80%',
    },
    titleText: {
        fontFamily: 'Calibri',
        fontSize: 20
    }
})

export default AlerteTutoScreen;