import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Avatar = (props) => {

    return <Image source={props.source} style={styles.image}/>

}

const styles = StyleSheet.create({
    image: {
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        overflow: "hidden",
    }
});

export default Avatar;