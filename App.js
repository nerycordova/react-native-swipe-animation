import React from 'react';
import { StyleSheet } from 'react-native';

import SwipeAnimation from './src/SwipeAnimation';


export default function App() {

  return <SwipeAnimation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
