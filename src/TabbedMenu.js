import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';

const menu_height = 70;

const TabbedMenu = (props) => {

    const [display, setDisplay] = React.useState(false);

    /**
     * Used to animate Y transform
     */
    const yAnim = React.useRef(new Animated.Value(menu_height)).current;

    const show = () => Animated.timing(yAnim, {
            toValue: 0,
            easing: Easing.inOut(Easing.exp),
            duration: 1000,
            delay: 500
        })

    const hide = () =>  Animated.timing(yAnim, {
            toValue: menu_height,
            easing: Easing.inOut(Easing.exp),
            duration: 1000
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