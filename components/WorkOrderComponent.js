import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput } from 'react-native';
import { Card, Rating, Input, Button, ListItem } from 'react-native-elements';
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





class WorkOrder extends Component {

    static navigationOptions = {
        title: 'Workorders'
    };


    render() {

        const { navigate } = this.props.navigation;
        const workorders = this.props.workorders.workorders.filter(workorder => !(workorder.completed));

        function RenderWorkorders({workorders}) {

            const renderWorkorderItem = ({item}) => {
        
                let wko = [];
        
                if (!(item.completed)) {
                    wko = [...wko, {item}]
                    if (wko.length !== 0) {
                        return (
                            <ListItem                                        
                            title={item.description} 
                            subtitle={ item.address + ' - ' +  item.location } 
                            onPress={() => navigate('WorkorderInfo', { workorderId: item.id })} 
                            chevron    
                        />
                        )
                    } 
                }
            }
            
            return (
                <Card title='Active Workorders'>
                    <View>
                        <FlatList
                            data={workorders}
                            renderItem={renderWorkorderItem}
                            keyExtractor={item => item.id}
                        />
                        <Button 
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                            title='View Work Orders' 
                        />
                    </View>
                </Card>
            )
        }


        return (
            <ScrollView>
                <RenderWorkorders workorders={workorders} />
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
