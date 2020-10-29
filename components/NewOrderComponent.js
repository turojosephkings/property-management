import React, { Component } from 'react';
import { Text, View, ScrollView, Picker, Switch, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import DateTimePicker from '@react-native-community/datetimepicker';

class NewOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            completed: false,
            message: '',
            date: new Date()
        }
    }

    static navigationOptions = {
        title: 'New Maintenance Order'
    }

    handleNewOrder() {
        console.log(JSON.stringify(this.state));
        this.setState({
            title: '',
            completed: false,
            message: '',
            date: new Date()
        });
    }

        render() {
            return (
                <ScrollView>
                    <View>
                        <Text>Title of the Maintenance Order</Text>
                            
                        <Text>Message</Text>
                    </View>
                </ScrollView>
            )
        }

}






export default NewOrder;