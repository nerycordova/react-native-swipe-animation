import React from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import UserInfo from './UserInfo';
import Carrousel from './Carrousel';
import TabbedMenu from './TabbedMenu';

const moonstone = require('../assets/moonstone.png');
const shapphire = require('../assets/sapphire.png');

const { width, height } = Dimensions.get('window');

/**
 * Angle (in radians) of the overlay's triangle clip
 */
const angle =  0.3;

/**
 * Calculate height of the triangle clip
 */
const elevation = Math.tan(angle) * width;

/**
 * Area of the background image to be covered by the overlay
 */
const cover_area = 3/5;

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

    const growAnim = React.useRef(new Animated.Value(0)).current;
    const bgY = React.useRef(new Animated.Value(0)).current;
    const bgX = React.useRef(new Animated.Value(0)).current;

    const show = () => {
      
      Animated.parallel(
        [
          Animated.timing(bgY, {
            toValue: bgYTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
            delay: 1000
          }),

          Animated.timing(bgX, {
            toValue: bgXTarget,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
            delay: 1000
          }),

          Animated.timing(growAnim, {
            toValue: cover_area*height,
            easing: Easing.inOut(Easing.exp),
            duration: 900,
            delay: 1100
          }),
          
        ]
      ).start();

    };
  

    React.useEffect( () => {

      show();

    } , []);


    return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#FCFCFC',
            justifyContent: 'flex-end',
          }}
        >

          <UserInfo />

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
          <Animated.View style={{ position:'absolute', bottom:0, left:0, height:growAnim}}>
            <Svg width={width} height={cover_area * height} >
              <Polygon
                    points={`0,${elevation} ${width},0 ${width},${height} 0,${height}`}
                    fill="#FCFCFC"
                />
            </Svg>
          </Animated.View>
          
          <Carrousel data={data}/>

          {/* Tabbed Menu */}
          <TabbedMenu visible={true}/>

        </View>
      );
}

export default SwipeAnimation;
