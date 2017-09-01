/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainView from 'app/MainView';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const TradeBoard = StackNavigator({
  Home: {screen: MainView}
},
{
  headerMode:'none',
  initialRouteName:'Home'
}
);

AppRegistry.registerComponent('TradeBoard', () => TradeBoard);
