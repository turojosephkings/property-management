import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { HOUSES } from '../shared/houses';
import { WORK_ORDERS } from "../shared/workorders";
import WorkOrder from "./WorkOrderComponent";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state ={
            houses: HOUSES,
            workorders : WORK_ORDERS
        }
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <View>


                <Text style={{margin:10}}>Aqui debe hacerse el render del overview aka cuantas ordenes estan pendientes </Text>
            </View>
        )
    }
}


export default Home
