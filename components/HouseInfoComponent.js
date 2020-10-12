import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

function RenderHouse({house}) {
    if (house) {
        return (
            <Card 
                featuredTitle={house.address}
                image={require('./images/generichouse.jpg')}>
                <Text style={{margin:10}}>
                    Owner: {house.owner} {house.bedrooms}
                    {"\n"}
                    <Text style={styles.boldTxt}>Sqft:</Text> {house.sqft}, <Text style={styles.boldTxt}>Bathrooms: </Text>{house.bathrooms}, <Text style={styles.boldTxt}>Bedrooms: </Text>{house.bedrooms}
                    {"\n"}
                   <Text style={styles.boldTxt}> Status:</Text>  {house.status} 
                </Text>
            </Card>
        )
    };
    return <View />;
}

function HouseInfo(props) {
    return <RenderHouse house={props.house} />;

}

const styles = StyleSheet.create({
    boldTxt: {
      fontWeight: 'bold'
      
    }
});

export default HouseInfo;