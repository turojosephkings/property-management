import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        workorders: state.workorders
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
            <View>

            </View>
        </Card>
    )
}



class WorkOrder extends Component {


    render() {

        const { navigate } = this.props.navigation;
        const workorders = this.props.workorders.workorders.filter(workorder => !(workorder.completed));

        return (
            <ScrollView>
                <RenderWorkorders 
                    workorders={workorders} 
                />
                <View>
                <Button
                    title="New Order"
                    onPress={() => navigate('NewOrder')}
                />
                </View>


                

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent:'center',
        margin: 20
    }
})

export default connect(mapStateToProps)(WorkOrder);
