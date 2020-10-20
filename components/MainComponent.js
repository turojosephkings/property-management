import React, { Component } from 'react';
import HouseDirectory from './HouseDirectoryComponent';
import HouseInfo from './HouseInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const HouseDirectoryNavigator = createStackNavigator(
    {
        HouseDirectory: { screen: HouseDirectory }, 
        HouseInfo: { screen: HouseInfo }
    },
    {
        initialRouteName: 'HouseDirectory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#610B8C'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
            
        }
    }
);

const AppNavigator = createAppContainer(HouseDirectoryNavigator); 

class Main extends Component {

    render() {
        return ( 
            <View 
                style={{
                    flex: 2,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}>
                <AppNavigator />
            </View>
        );
    }
}

export default Main;