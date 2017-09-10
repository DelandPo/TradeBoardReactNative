/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainView from 'app/MainView';
import SetCompany from 'app/UI/SetCompany';
import DropShift from 'app/UI/DropShift';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const TradeBoard = StackNavigator({
  Home: {screen: MainView}, 
  Company:{screen:SetCompany},
  DropShift:{screen:DropShift},
},
{
  headerMode:'none',
  initialRouteName:'Home'
}
);

AppRegistry.registerComponent('TradeBoard', () => TradeBoard);
