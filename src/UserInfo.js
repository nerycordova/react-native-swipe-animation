import React from 'react';
import { View, StyleSheet, Animated, Easing, Text, Dimensions } from 'react-native';
import Avatar from './Avatar';

const { width, height } = Dimensions.get('window');

/**
 * User info's screen area
 */
const user_info_area = 2/5;

const UserInfo = () => {

    //Final Y position
    const  yTo = 60;

    //Initial Y position
    const  yFrom = 150;

    const avatarOpacity = React.useRef(new Animated.Value(0)).current;
    const nameOpacity = React.useRef(new Animated.Value(0)).current;
    const cartOpacity = React.useRef(new Animated.Value(0)).current;

    const avatarY = React.useRef(new Animated.Value( yFrom )).current;
    const nameY = React.useRef(new Animated.Value( yFrom )).current;
    const cartY = React.useRef(new Animated.Value( yFrom )).current;

    const show = () => {

        Animated.parallel(
            [
              //Avatar
              Animated.timing(avatarOpacity, {
                toValue: 1,
                easing: Easing.inOut(Easing.exp),
                duration: 900,
                delay: 1100
              }),
              Animated.timing(avatarY, {
                toValue: yTo,
                easing: Easing.inOut(Easing.exp),
                duration: 900,
                delay: 1100
              }),
    
              //Name
              Animated.timing(nameOpacity, {
                toValue: 1,
                easing: Easing.inOut(Easing.exp),
                duration: 850,
                delay: 1150
              }),
              Animated.timing(nameY, {
                toValue: yTo,
                easing: Easing.inOut(Easing.exp),
                duration: 850,
                delay: 1150
              }),
    
              //Cart info
              Animated.timing(cartOpacity, {
                toValue: 1,
                easing: Easing.inOut(Easing.exp),
                duration: 900,
                delay: 1200
              }),
    
              Animated.timing(cartY, {
                toValue: yTo,
                easing: Easing.inOut(Easing.exp),
                duration: 900,
                delay: 1200
              })
              
            ]
          ).start();

    }

    React.useEffect( () => {

        show();

    } , [])

    return (
        <View style={ styles.avatar }>

            <Animated.View style={{display:'flex', alignSelf: 'center', opacity: avatarOpacity, transform: [{translateY: avatarY}]}}>
              <Avatar source={require('../assets/avatar.png')}/>
            </Animated.View>

            <Animated.View style={{display:'flex', alignSelf: 'center', marginVertical:5, opacity: nameOpacity, transform: [{translateY: nameY}]}}>
              <Text style={{fontWeight:'bold', color:'white', fontSize:15}}>Lottie Curtis</Text>
            </Animated.View>

            <Animated.View style={{display:'flex', alignSelf: 'center', marginVertical:5, opacity: cartOpacity, transform: [{translateY: cartY}]}}>
                <View style={styles.cart}>
                    <Text style={{color:'black', fontSize:13}}>You have 3 products</Text>
                </View>
            </Animated.View>

        </View>
    )

}

const styles = StyleSheet.create({
    avatar:{
      position: 'absolute',
      top: 0,
      zIndex: 2,
      height: user_info_area * height,
      width: width,
      justifyContent:'flex-start',
      alignSelf: 'center'
    },
    cart:{
      backgroundColor: 'white',
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 50
    }
  });

export default UserInfo;