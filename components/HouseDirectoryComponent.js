import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        houses: state.houses
    };
};

class HouseDirectory extends Component {

    static navigationOptions = {
        title: 'House Directory'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderHouseDirectoryItem = ({item}) => {
            return (
                <ListItem
                
                    title={item.address}
                    subtitle={`Owner: ${item.owner}, Tenant: ${item.tenant}`}
                    featured  
                    onPress={() => navigate('HouseInfo', { houseId: item.id })}               
                    leftAvatar={{ source:{ uri: baseUrl + item.image}}}
                    chevron
                />
            );
        };
        if (this.props.houses.isLoading) {            
            return(
                <View>
                    <Text>
                        Y ahora que?
                    </Text>
                </View>
            )
        }
        if (this.props.houses.errMess) {
            return (
                <View>
                    <Text>{this.props.houses.errMess}</Text>
                </View>
            );
        }
        return (
            <View>
                <View>
                    <Button 
                        title='Create New Property'
                        onPress={() => navigate('NewProperty')}
                        buttonStyle={styles.Buttons}
                    />
                    <FlatList 
                        data={this.props.houses.houses}
                        renderItem={renderHouseDirectoryItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    Buttons: {
        margin: 40
    }
})

export default connect(mapStateToProps)(HouseDirectory);