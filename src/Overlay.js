import React from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native'
import Svg, { Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

/**
 * Area of the background image to be covered by the overlay
 */
const cover_area = 3/5;

/**
 * Angle (in radians) of the overlay's triangle clip
 */
const angle =  0.3;

/**
 * Calculate height of the triangle clip
 */
const elevation = Math.tan(angle) * width;

const Overlay = (props) => {

    const [display, setDisplay] = React.useState(false);

    /**
     * To animate SVG overlay
     */
    const growAnim = React.useRef(new Animated.Value(0)).current;

    const show = () => Animated.timing(growAnim, {
            toValue: cover_area*height,
            easing: Easing.inOut(Easing.exp),
            duration: 900
          })
    

    const hide = () => Animated.timing(growAnim, {
        toValue: 0,
        easing: Easing.inOut(Easing.exp),
        duration: 900
      })

    React.useEffect( () => {

        if (props.show){
            setDisplay(true);
            show().start();
        }

    }, []);

    React.useEffect( () => {

        if (props.show){
            setDisplay(true);
            show().start();
        }else{
            hide().start(() => { //callback, when fadeOut is complete, render null
                setDisplay(false); 
            });
        }

    }, [props.show]);

    if (!display) return null;

    return (
        <Animated.View style={{ position:'absolute', bottom:0, left:0, height:growAnim}}>
            <Svg width={width} height={cover_area * height} >
              <Polygon
                    points={`0,${elevation} ${width},0 ${width},${height} 0,${height}`}
                    fill="#FCFCFC"
                />
            </Svg>
          </Animated.View>
    )

}

export default Overlay;