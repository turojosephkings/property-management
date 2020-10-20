import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { HOUSES } from '../shared/houses';

function RenderHouse({house}) {
    if (house) {
        return (
            <Card 
                featuredTitle={house.address}
                image={require('./images/generichouse.jpg')}>
                <Text style={{margin:10}}>
                <Text style={styles.boldTxt}>Owner:</Text> {house.owner}
                    {"\n"}
                    <Text style={styles.boldTxt}>Sqft:</Text> {house.sqft}, <Text style={styles.boldTxt}>Bathrooms: </Text>{house.bathrooms}, <Text style={styles.boldTxt}>Bedrooms: </Text>{house.bedrooms}
                    {"\n"}
                   <Text style={styles.boldTxt}>Status:</Text>  {house.status} 
                </Text>
            </Card>
        )
    };
    return <View />;
}



class HouseInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            houses: HOUSES
        };
    }

    static navigationOptions = {
        title: 'House Information'
    }
    
    render() {
        const houseId = this.props.navigation.getParam('houseId');
        const house = this.state.houses.filter(house => house.id === houseId)[0];
        return <RenderHouse house={house} />;
    }
}


const styles = StyleSheet.create({
    boldTxt: {
      fontWeight: 'bold'
      
    }
});

export default HouseInfo;