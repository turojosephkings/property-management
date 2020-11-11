import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Modal, Switch } from 'react-native';
import { Card, Button, CheckBox, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchWorkorders } from '../redux/ActionCreators';
import { SafeAreaView } from 'react-navigation';

const mapStateToProps = state => {
    return {
        workorders: state.workorders
    };
};

const mapDispatchToProps = {
    fetchWorkorders,
  //  postWorkorder: ( houseId, address, dateReported, dateAssigned, dateCompleted, completed, location, description, provider ) => (postWorkorder( houseId, address, dateReported, dateAssigned, dateCompleted, completed, location, description, provider ))
    
}



function RenderWorkorder(props) {

    const {workorder} = props;

    if (workorder) {
        return (
            <View>

                <Text style={styles.boldTxt}>Owner:{WorkOrder.description}</Text> 
                    {"\n"}
                                      
            
            </View>
        )
    };
    return <View />;
}

class WorkorderInfo extends Component {

    static navigationOptions = {
        title: 'Maintenance Order Details'
    };

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            orderType: "Maintenance Order",
            houseId: '',
            address: '',
            dateReported: new Date(),
            dateAssigned: '',
            dateCompleted: '',
            completed: false,
            location: '',
            description: '',
            provider: '',
        };
    }

    handleNewOrder() {
        this.props.postWorkorder( this.state.houseId, this.state.address, this.state.dateReported, this.state.dateAssigned, this.state.dateCompleted, this.state.completed, this.state.location, this.state.description, this.state.provider)
    }



    toggleConfirmationModal() {
        this.setState({showConfirmationModal: !this.state.showConfirmationModal});
    }
    
    refreshWorkorders() {
        this.props.fetchWorkorders();
    }

    markAsCompleted() {

    }




    render() {


        const workorderId = this.props.navigation.getParam('workorderId');
        const workorder = this.props.workorders.workorders.filter(workorder => workorder.id === workorderId)[0];

        console.log(JSON.stringify(this.state))

        
        return (
            <ScrollView>
                <View>
                    <Text>Maintenance Order Details</Text>
                    <Text>Location: {workorder.location}</Text>
                    <Text>Description: {workorder.description}</Text>

                    <Text>Date Reported: {workorder.dateReported}</Text>
                </View>
                <View>
                    <Text>Actions: </Text>
                    <View>
                        <Text>Mark As Completed: </Text>
                        <Switch
                            style={styles.formItem}
                            value={workorder.completed}
                            trackColor={{true: '#5637DD', false: null}}
                            onValueChange={value => this.setState({hikeIn: value})}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
})




export default connect(mapStateToProps, mapDispatchToProps)(WorkorderInfo);