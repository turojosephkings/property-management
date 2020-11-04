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



function RenderHouses({houses}) {

    
    const renderHouseItem = ({item}) => {

        return (
            <ListItem
                leftAvatar={{ source: {uri: baseUrl + item.image}}}
                title={item.address}
                subtitle={item.owner}
                featured  
                onPress={() => 
                    //this.props.chooseHouse(item.id, item.address)
                    console.log('aqui')//(JSON.stringify(this.props.houseId))
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

    static navigationOptions = {
        title: 'Create a New Workorder'
    };

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

    chooseHouse(hId, add) {
        this.setState({
            houseId: hId,
            address: add
        })
    }

 

    


    render() {

        const { navigate } = this.props.navigation;
        const houses = this.props.houses.houses
        return (
            <ScrollView>
                <View>
                    <RenderHouses houses={houses}/>
                </View>
                <View>
                    <Input
                        placeholder='Description'
                        leftIcon={{type: 'font-awesome', name: 'commenting'}}
                        onChangeText={description => this.setState({description})}
                        value={this.state.description}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
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




export default connect(mapStateToProps)(NewOrder);