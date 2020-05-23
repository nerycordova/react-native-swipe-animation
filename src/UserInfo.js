import React from 'react';
import { View, StyleSheet, Animated, Easing, Text, Dimensions } from 'react-native';
import Avatar from './Avatar';

const { width, height } = Dimensions.get('window');

const UserInfo = () => {

    const avatarOpacity = React.useRef(new Animated.Value(0)).current;
    const nameOpacity = React.useRef(new Animated.Value(0)).current;
    const cartOpacity = React.useRef(new Animated.Value(0)).current;

    const avatarY = React.useRef(new Animated.Value(75)).current;
    const nameY = React.useRef(new Animated.Value(75)).current;
    const cartY = React.useRef(new Animated.Value(75)).current;

    const avatarOffset = -35;

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
                toValue: avatarOffset,
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
                toValue: avatarOffset,
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
                toValue: avatarOffset,
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
              <Text style={styles.cart}>You have 3 products</Text>
            </Animated.View>

        </View>
    )

}

const styles = StyleSheet.create({
    avatar:{
      position: 'absolute',
      top: 0,
      zIndex: 2,
      height: 2/5 * height,
      width: width,
      justifyContent:'center',
      alignSelf: 'center'
    },
    cart:{
      color:'black', 
      fontSize:13,
      backgroundColor: 'white',
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 50
    }
  });

export default UserInfo;