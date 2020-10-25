import React, { Component } from 'react';
import { Card, Button, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HOUSES } from '../shared/houses';
import { WORK_ORDERS } from "../shared/workorders";



class WorkOrder extends Component {

    constructor(props) {
        super(props);
        this.state ={
            houses: HOUSES,
            workorders : WORK_ORDERS
        }
    }
  
    render() {
        const renderOrders = ({item}) => {
        return (
            <ListItem                
                title={`${item.orderType} - ${item.description}` }                
                subtitle={`${item.address}`}             
            />
        );
    };

    return (
        <View>
            <Card>
            <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='Pa' 
                />
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='Home Overview' 
                />
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='View Work Orders' 
                />
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='View Appliances' 
                />
            </Card>

            <FlatList 
                data={this.state.workorders}
                renderItem={renderOrders}
                keyExtractor={item => item.orderId.toString()}
                />
        </View>
    );
}

}

export default WorkOrder;
