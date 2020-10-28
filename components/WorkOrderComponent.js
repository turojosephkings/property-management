import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';

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
        </Card>
    )
}


class WorkOrder extends Component {

    
  
    render() {

        const workorders = this.props.workorders.workorders.filter(workorder => !(workorder.completed));

        return (
            <View>
                <RenderWorkorders workorders={workorders} />
            </View>
        );
    }

}

export default connect(mapStateToProps)(WorkOrder);
