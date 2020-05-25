import React from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing, TouchableWithoutFeedback, Text, Button } from 'react-native';

import Overlay from './Overlay';
import UserInfo from './UserInfo';
import Carrousel from './Carrousel';
import TabbedMenu from './TabbedMenu';

const moonstone = require('../assets/moonstone.png');
const shapphire = require('../assets/sapphire.png');

const { width, height } = Dimensions.get('window');


/**
 * Background Y translation
 */
const bgYTarget = -150;

/**
 * Background X translation
 */
const bgXTarget = -50;

/**
 * Carrousel data
 */
const data = [
  {
    id: 1,
    title: 'Moonstone Keychain',
    type: 'product',
    img : moonstone,
    description: 'Choosing the Best Gemstone for Your Necklace and Jewelry'
  },
  {
    id: 2,
    type: 'product',
    title: 'Sapphire Keychain',
    img : shapphire,
    description: 'Choosing the Best Gemstone for Your Necklace and Jewelry'
  },
  {
    id: 3,
    type: 'action',
    img : moonstone,
    title: 'Add a Wearable',
    description: 'Don’t See One You Like? Choosing the Best Gemstone for Your Necklace and Jewelry'
  }
]

const SwipeAnimation = () => {

    const [playing, setPlaying] = React.useState(false);

    /**
     * To animate Play button
     */
    const buttonY = React.useRef(new Animated.Value(50)).current;
    const buttonOpacity = React.useRef(new Animated.Value(0)).current;

    /**
     * To animate background
     */
    const bgY = React.useRef(new Animated.Value(0)).current;
    const bgX = React.useRef(new Animated.Value(0)).current;


    const buttonFadeIn = () => {
      Animated.parallel(
        [
          Animated.timing(buttonY, {
            toValue: 0,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          }),
          Animated.timing(buttonOpacity, {
            toValue: 1,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          }),
          Animated.timing(bgY, {
            toValue: 0,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          }),
          Animated.timing(bgX, {
            toValue: 0,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          })
        ]
      ).start();
    }

    const buttonFadeOut = () => {
      Animated.parallel(
        [
          Animated.timing(buttonY, {
            toValue: 50,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          }),
          Animated.timing(buttonOpacity, {
            toValue: 0,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          })
        ]
      ).start();
    }

    const doPlay = () => {
      
      Animated.parallel(
        [
          Animated.timing(bgY, {
            toValue: bgYTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          }),

          Animated.timing(bgX, {
            toValue: bgXTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
          })
          
        ]
      ).start();

    };

    React.useEffect( () =>{
      buttonFadeIn();
    } , [])

    return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#FCFCFC',
            justifyContent: 'center',
          }}
        >

          <UserInfo show={playing}/> 

          {/* Background image */}
          <Animated.View style={{ ...StyleSheet.absoluteFill, flex: 1, marginLeft: bgX, marginTop: bgY }}> 
            
              <Image
                source={require('../assets/background.png')}
                width={width} 
                height={height}
                style={{flex:1}}
              />
            
          </Animated.View>      

          {/* Solid Overlay */}
          <Overlay show={playing} />
          
          <Carrousel show={playing} data={data} onScrollOutBoundLeft={ () => { setPlaying(false); buttonFadeIn(); } }/>

          <TabbedMenu show={playing}/> 
          
          {/* Play button */}
          <Animated.View style={
            [
              styles.playButton,
              {
                opacity: buttonOpacity,
                transform : [{translateY:buttonY}]
              }
            ]  
            }>
            <TouchableWithoutFeedback onPress={ () => { setPlaying(true); buttonFadeOut(); doPlay(); } }>
              <View style={{width:'100%'}}>
                <Text style={{color:'white', fontSize:20, textAlign:'center', marginHorizontal: 25,  marginVertical: 10}}>Play</Text>
              </View>
            </TouchableWithoutFeedback> 
          </Animated.View>
          

        </View>
      );
}

const styles = StyleSheet.create({
  playButton:{
    backgroundColor: '#303371',  
    alignSelf:'center', 
    width:150, 
    height: 50,
    borderRadius: 25, 
    position:'absolute', 
    justifyContent:'center'
  }
})

export default SwipeAnimation;
