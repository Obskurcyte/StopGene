import React, {useState} from 'react';
import {View, StyleSheet, Image, Share} from "react-native";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Avatar
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from "react-redux";
import * as authActions from "../store/actions/auth";
import { MaterialIcons } from '@expo/vector-icons';

const DrawerContent = props => {

  const myCustomShare = async () => {
    const shareOptions = {
      message: 'This is a text message'
    }

    try {
      const shareResponse = await Share.share({
        message: 'rejoingnez stopgene'
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const dispatch = useDispatch();

  const [openNested, setOpenNested] = useState(false);

    return (
        <View style={{flex:1, backgroundColor: '#E5E7E7'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{backgroundColor: '#E5E7E7', height: 150, flex: 1, marginBottom: 70, marginTop: 20}}>
                            <Image
                                source={require('../logo_bonne_police.png')}
                                style={styles.image}
                            />
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="scan-helper"
                                    color="blue"
                                    size={size}
                                />
                            )}
                            label="Tutoriel"
                            onPress={() => setOpenNested(!openNested)}
                           // onPress={() => {props.navigation.navigate('SuggestionScreen')}}
                        />

                        {openNested ?
                            <View style={styles.nestedDrawer}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <Icon
                                        name="block-helper"
                                        color="blue"
                                        size={size}
                                    />
                                )}
                                label="Je bloque"
                                onPress={() => props.navigation.navigate('JeBloqueTutoScreen')}
                            />
                            <DrawerItem
                                icon={({color, size}) => (
                                    <Icon
                                        name="emoticon-sad-outline"
                                        color="blue"
                                        size={size}
                                    />
                                )}
                                label="Je suis bloqué"
                                onPress={() => props.navigation.navigate('BloqueurTutoScreen')}
                            />
                            <DrawerItem
                            icon={({color, size}) => (
                            <Icon
                                name="alert-octagram"
                                color="blue"
                                size={size}
                            />
                        )}
                            label="Alerte"
                            onPress={() => props.navigation.navigate('AlerteTutoScreen')}
                            />
                            </View> : <Text/>
                        }

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color="blue"
                                    size={size}
                                />
                            )}
                            label="Inviter"
                            onPress={myCustomShare}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="star"
                                    color="blue"
                                    size={size}
                                />
                            )}
                            label="Noter"
                            onPress={() => {props.navigation.navigate('FriendScreen')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="alert"
                                    color="blue"
                                    size={size}
                                />
                            )}
                            label="Signaler"
                            onPress={() => {props.navigation.navigate('FriendScreen')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="dropbox"
                                    color="blue"
                                    size={size}
                                />
                            )}
                            label="Abonnement"
                            onPress={() => {props.navigation.navigate('GererAbonnementScreen')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        fontFamily: 'Calibri'
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    image: {
        height: 164,
        width: 134,
        marginTop: '30%',
        marginLeft: '30%'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 50,
        backgroundColor: 'white',
        height: 600
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    nestedDrawer: {
        marginLeft: '8%',
        borderBottomWidth: 0.2
    }
});

export default DrawerContent;
