import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

const card_width_area = 3/5;

/**
 * Y distance that components will move during fade-in and fade-out animations
 */
const y_distance = 15;

const Card = (props) => {

    /**
     * Product image scaling animation
     */
    const imageScale = React.useRef(new Animated.Value(0)).current;

    /**
     * Card content opacity animation
     */
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    /**
     * Card content Y translationo
     */
    const titleY = React.useRef(new Animated.Value(y_distance)).current;
    const descriptionY = React.useRef(new Animated.Value(y_distance)).current;
    const buttonY = React.useRef(new Animated.Value(y_distance)).current;

    const contentFadeIn = (delay = 300) => {

        Animated.parallel(
            [
            //Image scale animation
              Animated.timing(imageScale, {
                toValue: 1,
                easing: Easing.inOut(Easing.exp),
                delay,
                duration: 700
              }),

              //Content opacity animation
              Animated.timing(opacityAnim, {
                toValue: 1,
                easing: Easing.inOut(Easing.exp),
                delay,
                duration: 1000
              }),

              //Y position
              Animated.timing(titleY, {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                delay: delay + 50,
                duration: 800
              }),

              Animated.timing(descriptionY, {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                delay: delay + 100,
                duration: 800
              }),

              Animated.timing(buttonY, {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                delay: delay + 150,
                duration: 800
              }),

            ]
          ).start();
    
    }

    const contentFadeOut = () => {

        Animated.parallel(
            [
                //Image scale animation
              Animated.timing(imageScale, {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                duration: 1000
              }),
              //Content opacity animation
              Animated.timing(opacityAnim, {
                toValue: 0,
                easing: Easing.inOut(Easing.exp),
                duration: 1000
              }),

              //Y position
              Animated.timing(titleY, {
                toValue: y_distance,
                easing: Easing.inOut(Easing.exp),
                delay: 50,
                duration: 800
              }),

              Animated.timing(descriptionY, {
                toValue: y_distance,
                easing: Easing.inOut(Easing.exp),
                delay: 100,
                duration: 800
              }),

              Animated.timing(buttonY, {
                toValue: y_distance,
                easing: Easing.inOut(Easing.exp),
                delay: 150,
                duration: 800
              }),
            ]
        ).start();

    }

    React.useEffect( () => {

        if (props.showContent){
            contentFadeIn();
        }else{
            contentFadeOut();
        }

    } , [props.showContent])

    React.useEffect( () => {
        if (props.showContent) {
            contentFadeIn(1500);
        }
    } , [])

    return (
        <View style={styles.card}>
            {props.data.type === 'product' &&
                <Animated.View style={{marginTop:-50, transform: [{scale: imageScale }]}}>
                    <Image source={props.data.img} style={styles.img} />
                </Animated.View>
            }
            
            <Animated.View style={{width:'80%', alignSelf:'center', opacity: opacityAnim, transform: [{translateY: titleY }]}}>
                {props.data.type === 'action' && 
                    <View style={{backgroundColor:'#424A93', borderRadius:50, width:50, height:50, alignSelf:'center', marginTop: 20, marginBottom: 10}}>
                        <Text selectable={false} style={{color:'white', fontSize:45, textAlign:'center', lineHeight:48}}>+</Text>
                    </View>
                }
                <Text selectable={false} style={{textAlign:'center', color:'#4E5B76', fontSize:25, fontWeight:'bold'}}>
                    {props.data.title}
                </Text>
            </Animated.View>

            <Animated.View style={{marginTop: 15, opacity: opacityAnim, transform: [{translateY: descriptionY }]}}>
                <Text selectable={false} style={{color:'#A0A9B8', fontSize:14, textAlign:'center', width:'80%', alignSelf:'center', lineHeight:22}}>
                    {props.data.description}
                </Text>
            </Animated.View>

            {props.data.type === 'product' &&
            <Animated.View style={{marginTop: 20, opacity: opacityAnim, transform: [{translateY: buttonY }]}}>
                <View style={{backgroundColor:'#303371', width: 100, borderRadius:50, alignSelf:'center'}}>
                    <Text selectable={false} style={{color:'white', fontSize:15, fontWeight:'bold', marginVertical: 12, marginHorizontal: 20, textAlign:'center' }}>
                        View
                    </Text>
                </View>
            </Animated.View>
            }
    
        </View>
    )

}

const styles = StyleSheet.create({
    card:{
        marginTop: 25,
        display:'flex', 
        alignSelf:'center', 
        backgroundColor:'white', 
        width: card_width_area * width, 
        height:'75%', 
        borderRadius:20,
        shadowColor : '#d2d2d2',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 20
    },
    img:{
        width: 150,
        height:100,
        alignSelf: 'center'
    }
});


export default Card;