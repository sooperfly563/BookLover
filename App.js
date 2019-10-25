import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { cacheAssets, cacheFonts } from "./helpers/AssetsCaching";
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from 'expo-font';
import Swipes from './screens/Swipes';


const AppNavigator = createStackNavigator({
  SwipeScreen: { screen: Swipes,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  }
});

const App = createAppContainer(AppNavigator);

export default App;