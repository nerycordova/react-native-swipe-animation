import React from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

/**
 * Angle (in radians) of the triangle clip
 */
const angle =  0.3;

/**
 * Calculate opposite side of the triangle clip
 */
const elevation = Math.tan(angle) * width;

/**
 * Area of the background image to be covered by front layer
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

const SwipeAnimation = () => {

    const growAnim = React.useRef(new Animated.Value(0)).current;
    const bgY = React.useRef(new Animated.Value(0)).current;
    const bgX = React.useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
      
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
            duration: 1000,
            delay: 1000
          })
        ]
      ).start();

    };
  

    React.useEffect( () => {

      fadeIn();

    } , []);


    return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#FCFCFC',
            justifyContent: 'flex-end',
          }}
        >
          <Animated.View style={{ ...StyleSheet.absoluteFill, flex: 1, marginLeft: bgX, marginTop: bgY }}> 
            
              <Image
                source={require('../assets/background.png')}
                width={width} 
                height={height}
                style={{flex:1}}
              />
            
          </Animated.View>      

          <Animated.View style={{ position:'absolute', bottom:0, left:0, height:growAnim}}>
            <Svg width={width} height={cover_area * height} >
              <Polygon
                    points={`0,${elevation} ${width},0 ${width},${height} 0,${height}`}
                    fill="#FCFCFC"
                />
            </Svg>
          </Animated.View>
          

        </View>
      );
}

export default SwipeAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
});