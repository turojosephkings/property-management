import React, { Component } from 'react';
import Home from './HomeComponent';
import HouseDirectory from './HouseDirectoryComponent';
import HouseInfo from './HouseInfoComponent';
import { WORK_ORDERS } from "../shared/workorders";
import WorkOrder from "./WorkOrderComponent";
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchHouses, fetchWorkorders } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';

const mapDispatchToProps = {
    fetchHouses,
    fetchWorkorders
};

const HouseDirectoryNavigator = createStackNavigator(
    {
        HouseDirectory: { 
            screen: HouseDirectory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            }) }, 
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

const WorkOrderNavigator = createStackNavigator(
    {
        WorkOrder: { screen: WorkOrder }
    },
    {
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

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home } 
    },
    {
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
)

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator},
        HouseDirectory: { screen: HouseDirectoryNavigator },
        WorkOrder: { screen: WorkOrderNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
)

const AppNavigator = createAppContainer(MainNavigator); 

class Main extends Component {

    componentDidMount() {
        this.props.fetchHouses();
        this.props.fetchWorkorders();
    }

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

const styles = StyleSheet.create({

    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
})

export default connect(null, mapDispatchToProps)(Main);