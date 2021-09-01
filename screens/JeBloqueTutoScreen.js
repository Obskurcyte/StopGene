import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView, Pressable, Dimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-anchor-carousel';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;

const testData = [
    {
        image: require('../assets/images/tuto1.jpg'),
        title: 'A votre arrivée sur l\'application, si vous bloquez une voiture, cliquez sur "Je bloque"'
    },
    {
        image: require('../assets/images/tuto2.jpg'),
        title: 'Rentrez ensuite votre plaque d\'immatriculation, votre numéro de téléphone et le temps pendant lequel vous pensez vous absenter'
    },
    {
        image: require('../assets/images/tuto3.jpg'),
        title: 'Une fois votre signalement pris en compte, vous devez vous abonner pour que votre apparaisse où payer 2€'
    },
    {
        image: require('../assets/images/tuto4.jpg'),
        title: 'Vous pouvez choisir trois abonnements différents avec différents tarifs'
    }
]

const JeBloqueTutoScreen = () => {

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

export default JeBloqueTutoScreen;