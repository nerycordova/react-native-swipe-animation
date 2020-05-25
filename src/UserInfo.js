import React from 'react';
import { View, StyleSheet, Animated, Easing, Text, Dimensions, ImagePropTypes } from 'react-native';
import Avatar from './Avatar';
import { hide } from 'expo/build/launch/SplashScreen';

const { width, height } = Dimensions.get('window');

/**
 * User info's screen area
 */
const user_info_area = 2/5;

const UserInfo = (props) => {

    const [display, setDisplay] = React.useState(false);

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

    const animate = ( {opacityTarget, yTarget, action} ) => Animated.parallel(
        [
          //Avatar
          Animated.timing(avatarOpacity, {
            toValue: opacityTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 900,
            delay: action === 'showing' ? 100 : 200 //used to invert animation sequence
          }),
          Animated.timing(avatarY, {
            toValue: yTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 900,
            delay: action === 'showing' ? 100 : 200 //used to invert animation sequence
          }),

          //Name
          Animated.timing(nameOpacity, {
            toValue: opacityTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 850,
            delay: 150
          }),
          Animated.timing(nameY, {
            toValue: yTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 850,
            delay: 150
          }),

          //Cart info
          Animated.timing(cartOpacity, {
            toValue: opacityTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 900,
            delay: action === 'showing' ? 200 : 100 //used to invert animation sequence
          }),

          Animated.timing(cartY, {
            toValue: yTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 900,
            delay: action === 'showing' ? 200 : 100 //used to invert animation sequence
          })
          
        ]
      )
    
    const show = () => {
      animate({opacityTarget : 1, yTarget: yTo, action:'showing'}).start();
    }

    const hide = () =>{
      animate(
        {opacityTarget : 0, 
          yTarget: yFrom, 
          action:'hiding'
        }).start( () => { //callback, when fadeOut is complete, render null
          setDisplay(false); 
      } );
    }

    React.useEffect( () => {

      if (props.show){
        setDisplay(true);
        show();
      }

    } , []);

    React.useEffect( ()=> {
      if (props.show){
        setDisplay(true);
        show();
      }else{
        hide();
      }
    } , [props.show])


    if (!display) return null;

    return (
        <View style={ styles.avatar }>

            <Animated.View style={{display:'flex', alignSelf: 'center', opacity: avatarOpacity, transform: [{translateY: avatarY}]}}>
              <Avatar source={require('../assets/avatar.png')}/>
            </Animated.View>

            <Animated.View style={{display:'flex', alignSelf: 'center', marginVertical:5, opacity: nameOpacity, transform: [{translateY: nameY}]}}>
              <Text selectable={false} style={{fontWeight:'bold', color:'white', fontSize:15}}>Lottie Curtis</Text>
            </Animated.View>

            <Animated.View style={{display:'flex', alignSelf: 'center', marginVertical:5, opacity: cartOpacity, transform: [{translateY: cartY}]}}>
                <View style={styles.cart}>
                    <Text selectable={false} style={{color:'black', fontSize:13}}>You have 3 products</Text>
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