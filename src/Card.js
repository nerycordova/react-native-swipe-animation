import React from 'react';
import { View, Text, Dimensions, StyleSheet, ImagePropTypes } from 'react-native';

const { width, height } = Dimensions.get('window');

const card_width_area = 3/5;

const Card = (props) => {

    return (
        <View style={styles.card}>
            <Text style={{textAlign:'center', color:'black'}}>
                Hello world
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    card:{
        display:'flex', 
        alignSelf:'center', 
        backgroundColor:'white', 
        width: card_width_area * width, 
        height:'90%', 
        borderRadius:20,
        shadowColor : '#d2d2d2',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.8,
        shadowRadius: 25,
        elevation: 25
    }
});


export default Card;