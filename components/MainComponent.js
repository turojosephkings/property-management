import React, { Component } from 'react';
import Home from './HomeComponent';
import HouseDirectory from './HouseDirectoryComponent';
import HouseInfo from './HouseInfoComponent';
import WorkOrder from "./WorkOrderComponent";
import NewOrder from './NewOrderComponent';
import Login from './LoginComponent';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchHouses, fetchWorkorders, fetchPaymentorders } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';

const mapDispatchToProps = {
    fetchHouses,
    fetchWorkorders,
    fetchPaymentorders
    
};

const HouseDirectoryNavigator = createStackNavigator(
    {
        HouseDirectory: { 
            screen: HouseDirectory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='navicon'
                    type='evilicon'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            }) 
        }, 
        HouseInfo: 
        { screen: HouseInfo }
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
        WorkOrder: { screen: WorkOrder,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                                name='wrench'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => navigation.toggleDrawer()}
                            />
            }) 
        },
        NewOrder: { screen: NewOrder,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                            name='file-text'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}                            
                        />
            })  
        }

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
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                color: '#fff'
            },
            headerLeft: <Icon
                name='dashboard'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    } 
);

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    } 
);

const MainNavigator = createDrawerNavigator(
    {
        Login: { screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                    name='sign-in'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Overview: { screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                    name='dashboard'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        HouseDirectory: { screen: HouseDirectoryNavigator, 
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                    name='list-ul'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        WorkOrder: { screen: WorkOrderNavigator, 
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                    name='wrench'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            } }
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
        this.props.fetchPaymentorders();
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
        fontSize: 34
    }
})

export default connect(null, mapDispatchToProps)(Main);