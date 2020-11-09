import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Animated } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { paymentorders } from '../redux/paymentorders';
//import NewProperty from './NewProperty';

class PeopleTab extends Component {


    static navigationOptions = {
        title: 'People (Owners & Tenants)'
    }

    render() {

        const { navigate } = this.props.navigation;


        return (
            <ScrollView>
                
                
                <View>

                    <Button 
                        title='Owners'
                        //onPress={() => navigate('HouseDirectory')}
                        buttonStyle={styles.Buttons}
                    />
                    <Button 
                        title='Tenants'
                        //onPress={() => navigate('NewProperty')}
                        buttonStyle={styles.Buttons}
                    />
                    <Button 
                        title='Create New Person'
                        onPress={() => navigate('NewPerson')}
                        buttonStyle={styles.Buttons}
                    />                    
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    Buttons: {
        margin: 40
    }
})

export default (PeopleTab);