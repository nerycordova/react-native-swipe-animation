import React from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Card from './Card';

const { width, height } = Dimensions.get('window');

/**
 * Card's width area
 */

const card_width_area = 3/5;

/**
 * Carrousel's area
 */
const carrousel_area = 1/2;

/** 
*  Card's width 
*/
const card_width = card_width_area * width;

/**
 * Space between cards
 */
const card_space = 30;

/**
 * Slides initial position
 */
const initial_position = -(width/2 + card_width/2);

/**
 * Vertical gap between center card and siblings
 */
const vertical_gap = 20;

const Carrousel = (props) => {

    const config = {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 80
    };

    const { data } = props;

    /**
     * X scroll
     */
    const scrollX = data.map( item => React.useRef(new Animated.Value(0)).current );

    /**
     * Card's Y position
     */
    const positionY = data.map( item => React.useRef(new Animated.Value(vertical_gap)).current );
    /**
     * Viewing index
     */
    const [index, setIndex] = React.useState(0);

    /**
     * Used to control card animation delay
     */
    const [direction, setDirection] = React.useState(1);


    const useDidMountEffect = (func, deps) => {
        const didMount = React.useRef(false);
    
        React.useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    // Mount animation
    const animate = () => {

        const animations = data.map ( (item, index) => 
                                Animated.timing(scrollX[index], {
                                    toValue: initial_position,
                                    easing: Easing.inOut(Easing.exp),
                                    duration: 1000,
                                    delay: 1200 + ( index === 1 ? 100 : 0 )
                                })
                            );

        animations.push(
             //Move up card at 0
             Animated.timing(positionY[0], {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
                delay: 1200 
            })
        )

        Animated.parallel(animations).start();
  
      };

    const swipe = (direction) => {
        
        setDirection ( direction );

        //Swipe left validation
        if ( direction === 1 && index >= data.length - 1) return;
        
        //Swipe right validation
        if ( direction === -1 && index === 0) return;
        
        setIndex( (index) => index + direction );
        
    }

    React.useEffect ( () => {

        animate();

    } , [])


    useDidMountEffect(() => {
        console.log('Index now: ',index);

        const animations =  data.map ( (item, i) => Animated.timing(scrollX[i], {
                                        toValue: initial_position - (card_width + card_space)*index,
                                        easing: Easing.inOut(Easing.exp),
                                        // Makes it look like the other cards are following the leader
                                        delay : (i >= index && direction === 1 ? 100 : 0) || (i <= index && direction === -1 ? 100 : 0 ),
                                        duration: 1000,
                                    }) );

        //Push down the 'exiting' card
        let priorIndex = index - direction;
        animations.push(
            Animated.timing(positionY[priorIndex], {
                toValue: vertical_gap,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
            })
        )

        //Push up the 'entering' card
        animations.push(
            Animated.timing(positionY[index], {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
            })
        )

        Animated.parallel(animations).start();

    }, [index]); 

    return (
        
            <View style={ styles.carrousel }>
                <GestureRecognizer onSwipeLeft = { () => swipe(1) } onSwipeRight = { () => swipe(-1) } config={config} style={{height:'100%'}}>
                {data.map( (item, i) => {
                        
                        return (
                            <Animated.View style={
                                {
                                    height:'90%', 
                                    left: width + (card_width + card_space ) * i , // carrousel starts positioned all the way to the right
                                    position:'absolute',
                                    transform: [{translateX: scrollX[i]}, {translateY: positionY[i]}]
                                }} 
                                key={item.id}
                            >
                                <Card data={item}/>
                            </Animated.View>
                        )
                    })
                }
                </GestureRecognizer>
            </View>
        
    )

}

const styles = StyleSheet.create({
    carrousel:{
        position: 'absolute',
        bottom: 100,
        zIndex: 2,
        height: carrousel_area * height,
        width: width,
        justifyContent:'flex-start',
        alignSelf: 'center',
        overflow: 'hidden'
        // borderWidth: 1,
        // borderColor: 'blue',
        // borderStyle: 'solid'
    }
});


export default Carrousel;