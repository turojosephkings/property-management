import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { paymentorders } from '../redux/paymentorders';
import WorkOrder from "./WorkOrderComponent";

const mapStateToProps = state => {
    return {
        houses: state.houses,
        workorders: state.workorders,
        paymentorders: state.paymentorders
    };
};

function RenderWorkorders({workorders}) {

    const renderWorkorderItem = ({item}) => {

        let wko = [];

        if (!(item.completed)) {
            wko = [...wko, {item}]
            if (wko.length !== 0) {
                return (
                    <View style={{margin: 10}}>                                           
                        <Text style={{fontSize: 16, fontWeight: 'bold' }}>{item.description}</Text>
                        <Text style={{fontSize: 14}}>{item.address}</Text>           
                    </View>
                )
            } 
        }
    }
    
    return (
        <Card title='Active Workorders'>

            <FlatList
                data={workorders}
                renderItem={renderWorkorderItem}
                keyExtractor={item => item.id}
            />
            <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='View Work Orders' 
                />
        </Card>
    )
}

function RenderPaymentorders({paymentorders}) {

    const renderPaymentorderItem = ({item}) => {

        let wko = [];

        if (!(item.completed)) {
            wko = [...wko, {item}]
            if (wko.length !== 0) {
                return (
                    <View style={{margin: 10}}>                                           
                        <Text style={{fontSize: 16, fontWeight: 'bold' }}>{item.address}</Text>
                        <Text style={{fontSize: 14}}>{item.amount}</Text>           
                    </View>
                )
            } 
        }
    }
    
    return (
        <Card title='Upcoming Payments Orders'>

            <FlatList
                data={paymentorders}
                renderItem={renderPaymentorderItem}
                keyExtractor={item => item.id}
            />
            <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='View Payments' 
                />
        </Card>
    )
}

class Home extends Component {


    static navigationOptions = {
        title: 'Overview'
    }

    render() {

        const workorders = this.props.workorders.workorders.filter(workorder => !(workorder.completed));
        const paymentorders = this.props.paymentorders.paymentorders.filter(paymentorder => !(paymentorder.completed));

        return (
            <ScrollView>
                <RenderWorkorders workorders={workorders} />
                <RenderPaymentorders paymentorders={paymentorders} />
            </ScrollView>
        )
    }
}


export default connect(mapStateToProps)(Home)
