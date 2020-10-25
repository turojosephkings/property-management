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

function RenderHouse(props) {

    const {house} = props;

    if (house) {
        return (
            <Card 
                featuredTitle={house.address}
                image={{ uri: baseUrl + house.image}}>
                <Text style={{margin:10}}>
                <Text style={styles.boldTxt}>Owner:</Text> {house.owner}
                    {"\n"}
                    <Text style={styles.boldTxt}>Sqft:</Text> {house.sqft}, <Text style={styles.boldTxt}>Bathrooms: </Text>{house.bathrooms}, <Text style={styles.boldTxt}>Bedrooms: </Text>{house.bedrooms}
                    {"\n"}
                   <Text style={styles.boldTxt}>Status:</Text>  {house.status}                    
                </Text>
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='Payment Overview' 
                />
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='Home Overview' 
                />
                
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='View Appliances' 
                />
            </Card>
        )
    };
    return <View />;
}

function RenderWorkorders({workorders}) {

    const renderWorkorderItem = ({item}) => {

        let wko = [];

        if (!(item.completed)) {
            wko = [...wko, {item}]
            if (wko.length !== 0) {
                return (
                    <View style={{margin: 10}}>                                           
                        <Text style={{fontSize: 14}}>{item.description}</Text>        
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





class HouseInfo extends Component {
    
    static navigationOptions = {
        title: 'House Information'
    }
    
    render() {
        const houseId = this.props.navigation.getParam('houseId');
        const house = this.props.houses.houses.filter(house => house.id === houseId)[0];
        const workorders = this.props.workorders.workorders.filter(workorder => workorder.houseId === houseId);

        return (
            <ScrollView>
                <RenderHouse house={house} />
                <RenderWorkorders workorders={workorders} />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    boldTxt: {
      fontWeight: 'bold'
      
    }
});

export default connect(mapStateToProps)(HouseInfo);