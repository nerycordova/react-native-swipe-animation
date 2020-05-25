import React from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
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
const carrousel_area = 2/3;

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

/**
 * Carrousel's bottom area
 */
const bottom_area = 1/18;

/**
 * Initial pagination Y
 */
const pagination_y = 30;

const Carrousel = (props) => {

    const [display, setDisplay] = React.useState(false);

    /**
     * Gesture handler configuration
     */
    const config = {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 500,
    };

    /**
     * Card's data
     */
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
     * Used to control card animation  based on the direction that the carrousel is moving.
     * Swipe left / jump to the right thru pagination: direction is positve (increase index)
     * Swipe right / jump to the left thru pagination: direction is negative (decrease index)
     */
    const [direction, setDirection] = React.useState(1);
    
    /**
     * Used to control pagination Y animation and opacity
     */
    const paginationY = React.useRef( new Animated.Value(pagination_y) ).current;
    const paginationOpacity = React.useRef( new Animated.Value(0) ).current;


    const useDidMountEffect = (func, deps) => {
        const didMount = React.useRef(false);
    
        React.useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    // Fade-in animation
    const show = () => {

        const animations = data.map ( (item, index) => 
                                Animated.timing(scrollX[index], {
                                    toValue: initial_position,
                                    easing: Easing.inOut(Easing.exp),
                                    duration: 1000,
                                    delay:  ( index === 1 ? 100 : 0 )
                                })
                            );

        //Move up card at index = 0
        animations.push(
             Animated.timing(positionY[0], {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
                delay: 200 
            })
        )

        //Move up pagination controls
        animations.push(
            Animated.timing(paginationY, {
               toValue: 0,
               easing: Easing.inOut(Easing.exp),
               duration: 1000,
               delay: 200 
           })
        )

        animations.push(
            Animated.timing(paginationOpacity, {
               toValue: 1,
               easing: Easing.inOut(Easing.exp),
               duration: 1000,
               delay: 200 
           })
        )

        return Animated.parallel(animations);
  
    };

    /**
     * Fade-out animation
     */
    const hide = () => {
        const animations = data.map ( (item, index) => 
                                Animated.timing(scrollX[index], {
                                    toValue: 0,
                                    easing: Easing.inOut(Easing.exp),
                                    duration: 1000,
                                    
                                })
                            );

        //Move up card at index = 0
        animations.push(
             Animated.timing(positionY[0], {
                toValue: vertical_gap,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
                
            })
        )

        //Move up pagination controls
        animations.push(
            Animated.timing(paginationY, {
               toValue: pagination_y,
               easing: Easing.inOut(Easing.exp),
               duration: 1000,
               
           })
        )

        animations.push(
            Animated.timing(paginationOpacity, {
               toValue: 0,
               easing: Easing.inOut(Easing.exp),
               duration: 1000,
               
           })
        )

        return Animated.parallel(animations);
    }

    const swipe = (direction) => {
        
        setDirection ( direction );

        //Swipe left: validate that index ramins within boundaries
        if ( direction === 1 && index >= data.length - 1) return;
    
        //Swipe right: validate that index remains within boundaries
        if ( direction === -1 && index === 0) {
            if (typeof props.onScrollOutBoundLeft !== 'undefined'){
                props.onScrollOutBoundLeft();
            }
            return;
        };
        
        setIndex( (index) => index + direction );
        
    }

    const goToCard = (targetIndex) => {

        // let direction = 1;
        // if (targetIndex < index) direction = -1;
        setDirection( targetIndex - index );
        setIndex( targetIndex );

    }

    React.useEffect ( () => {

        if (props.show){
            setDisplay(true);
            show().start();
        }

    } , [])

    React.useEffect( ()=> {
        if (props.show){
          setDisplay(true);
          show().start();
        }else{
            hide().start(() => { //callback, when fadeOut is complete, render null
                setDisplay(false); 
            });
        }
      } , [props.show])


    useDidMountEffect(() => {

        const animations =  data.map ( (item, i) => Animated.timing(scrollX[i], {
                                        toValue: initial_position - (card_width + card_space)*index,
                                        easing: Easing.inOut(Easing.exp),
                                        // This dealy is to make it look like the rest of the cards are pulled by the card leading the animation
                                        delay : (i >= index && direction === 1 ? 100 : 0) || (i <= index && direction === -1 ? 100 : 0 ),
                                        duration: 1000,
                                    }) );

        let priorIndex = index - direction;

        //Animation to push down the 'exiting' card
        animations.push(
            Animated.timing(positionY[priorIndex], {
                toValue: vertical_gap,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
            })
        )

        //Animation to push up the 'entering' card
        animations.push(
            Animated.timing(positionY[index], {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                duration: 1000,
            })
        )

        Animated.parallel(animations).start();

    }, [index]); 

    if (!display) return null;

    return (
        
            <View style={ styles.carrousel }>

                <GestureRecognizer onSwipe={ (direction, state) => {

                    //Sometimes the gesture handler does not seem to properly pickup the swipe direction. The below
                    //is an attempt to correct that.
                    const {dx} = state;
                    if (direction === null){
                        if (dx > 0) {
                            swipe(-1) //swipe right
                        }else if (dx < 0) {
                            swipe(1) //swipe left
                        }
                    }

                } } onSwipeLeft = { () => swipe(1) } onSwipeRight = { () => swipe(-1) } config={config} style={{height:'100%'}}>
                {data.map( (item, i) => {
                        
                        return (
                            <Animated.View style={
                                {
                                    height:'90%', 
                                    left: width + (card_width + card_space ) * i , // carrousel starts positioned all the way to the right
                                    bottom: 0,
                                    position:'absolute',
                                    transform: [{translateX: scrollX[i]}, {translateY: positionY[i]}]
                                }} 
                                key={item.id}
                            >
                                <Card data={item} showContent={i===index} />
                            </Animated.View>
                        )
                    })
                }
                </GestureRecognizer>

                {/* Pagination */}
                <Animated.View style={
                    [
                        styles.pagination,
                        {
                            transform: [ {translateY : paginationY} ],
                            opacity: paginationOpacity
                        }
                    ]
                    }>
                    {data.map ( (item, i) => {
                        return(
                            <TouchableWithoutFeedback onPress={() => { goToCard(i) }} key={item.id}>
                                <View style={{width: 40, height:40, display:'flex', justifyContent:'center'}}>
                                    <View style={{width:10, height:10, 
                                        backgroundColor: i === index ? '#424A93' : '#A0A9B8', 
                                        borderRadius:10, alignSelf:'center'}} >
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </Animated.View>

            </View>
        
    )

}

const styles = StyleSheet.create({
    carrousel:{
        position: 'absolute',
        bottom: bottom_area * height ,
        zIndex: 2,
        height: carrousel_area * height,
        width: width,
        justifyContent:'flex-start',
        alignSelf: 'center',
        overflow: 'hidden'
    },
    pagination:{
        position: 'absolute', 
        alignSelf:'center', 
        bottom:20, 
        flexDirection:'row'
    }
});


export default Carrousel;