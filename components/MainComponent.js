import React, { Component } from 'react';
import Home from './HomeComponent';
import HouseDirectory from './HouseDirectoryComponent';
import HouseInfo from './HouseInfoComponent';
import WorkOrder from "./WorkOrderComponent";
import NewOrder from './NewOrderComponent';
import Login from './LoginComponent';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchHouses, fetchWorkorders, fetchPaymentorders } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';
import PropertiesTab from './PropertiesTabComponent';
import PeopleTab from './PeopleTabComponent';
import NewProperty from './NewProperty';
import NewOrderComponent from './NewOrderComponent';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NewPerson from './NewPerson';

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
                    name='folder-open'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
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
                            />
            }) 
        },
        NewOrder: { screen: NewOrder,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                            name='file-text'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                                                    
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
            />
        })
    } 
);

const NewPropertyNavigator = createStackNavigator(
    {
        NewProperty: { screen: NewProperty }
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
                name='plus-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}

            />
        })
    } 
);

const PropertiesTabNavigator = createStackNavigator(
    {
        PropertiesTab: { screen: PropertiesTab},
        HouseDirectory: { 
            screen: HouseDirectory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='folder-open'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                />
            }) 
        }, 
        HouseInfo: 
        { screen: HouseInfo },       
        NewProperty: { screen: NewProperty,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='folder-open'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                />
            })  }
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
                name='building'
                type='font-awesome'
                iconStyle={styles.stackIcon}
            />
        })
    } 
    
);

const PeopleTabNavigator = createStackNavigator(
    {
        PeopleTab: { screen: PeopleTab},
        NewPerson: { 
            screen: NewPerson,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='user-plus'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                />
            }) 
        },     
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
                name='users'
                type='font-awesome'
                iconStyle={styles.stackIcon}
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
            />
        })
    } 
);


const MainNavigator = createBottomTabNavigator(
    {
        Overview: { screen: HomeNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon
                    name='dashboard'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },        
        Properties: { screen: PropertiesTabNavigator, 
            navigationOptions: {
                tabBarIcon:({tintColor}) => (
                    <Icon
                    name='building-o'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            } 
        },
        People: { screen: PeopleTabNavigator, 
            navigationOptions: {
                tabBarIcon:({tintColor}) => (
                    <Icon
                    name='users'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            } 
        },
        Login: { screen: LoginNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon
                    name='sign-in'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        WorkOrder: { screen: WorkOrderNavigator, 
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon
                    name='building-o'
                    type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            } 
        }
        
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