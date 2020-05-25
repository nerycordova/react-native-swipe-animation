import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';

const menu_height = 70;

const TabbedMenu = (props) => {

    const yAnim = React.useRef(new Animated.Value(menu_height)).current;

    const fadeIn = () => {

        Animated.timing(yAnim, {
            toValue: 0,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
            delay: 1500
        }).start();

    }

    const fadeOut = () => {

        Animated.timing(yAnim, {
            toValue: menu_height,
            easing: Easing.inOut(Easing.exp),
            duration: 1000
        }).start();

    }

    React.useEffect( () => {

        if (props.visible){
            fadeIn();
        }else{
            fadeOut();
        }

    } , [props.visible])

    return (
        <Animated.View style={[styles.menu, {transform: [{translateY: yAnim}]}] }>
            <View style={styles.menuItem}>
                <IconC name="diamond-stone" size={25} style ={{alignSelf:'center'}} />    
                <Text style={{textAlign:'center', marginTop:5}}>Wearables</Text>
            </View>
            <View style={styles.menuItem}>
                <Icon name="face" size={25} style={{alignSelf:'center'}}/>
                <Text style={{textAlign: 'center', marginTop:5}}>Profile</Text>
            </View>
            <View style={styles.menuItem}>
                <Icon name="help-outline" size={25} style={{alignSelf:'center'}}/>
                <Text style={{textAlign: 'center', marginTop:5}}>Help</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    menu: {
        position:'absolute', 
        bottom: 0, 
        width:'100%', 
        height: menu_height, 
        backgroundColor:'white',
        flexDirection: 'row',
    },
    menuItem:{
        width: '33%',
        alignSelf: 'center',
    }
})

export default TabbedMenu;