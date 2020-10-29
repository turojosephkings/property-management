import React, { Component } from 'react';
import { Text, View, ScrollView, Picker, Switch, Button, StyleSheet, FlatList } from 'react-native';
import { Card, Icon, Rating, Input, ListItem, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import DateTimePicker from '@react-native-community/datetimepicker';
import HouseDirectory from './HouseDirectoryComponent';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        workorders: state.workorders,
        paymentorders: state.paymentorders
    };
};

let id, add;

function RenderHouses({houses}) {

    
    const renderHouseItem = ({item}) => {

        return (
            <ListItem
                leftAvatar={{ source: {uri: baseUrl + item.image}}}
                title={item.address}
                subtitle={item.owner}
                featured  
                onPress={() =>
                    this.setState({houseId: item.houseId,
                                    address: item.address 
                               })
                }
            />
        );
    }


    
    return (
        <Card title='Select Property'>

            <FlatList
                data={houses}
                renderItem={renderHouseItem}
                keyExtractor={item => item.id}
            />
        </Card>
    )
}




class NewOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderType: "Maintenance Order",
            houseId: '',
            address: '',
            dateReported: new Date(),
            dateCompleted: new Date(),
            completed: false,
            description: '',
            showmodal: false
        };
    }

    handleNewOrder() {
        console.log(JSON.stringify(this.state));
       // this.toggleModal();
    }

    resetForm() {
        this.setState({
            orderType: "Maintenance Order",
            houseId: '',
            address: '',
            dateReported: new Date(),
            dateCompleted: new Date(),
            completed: false,
            description: '',
            showmodal: false
        });
    }

    toggleModal() {
        this.setState({showModal: !this.setState.showModal});
    }


    render() {

        const { navigate } = this.props.navigation;
        const houses = this.props.houses.houses
        return (
            <ScrollView>
                <View>
                    <RenderHouses houses={houses}/>
                </View>
            </ScrollView>
        )
    }

}






export default connect(mapStateToProps)(NewOrder);