import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { HOUSES } from '../shared/houses';

class HouseDirectory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            houses: HOUSES
        };
    }

    static navigationOptions = {
        title: 'houseDirectory'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderHouseDirectoryItem = ({item}) => {
            return (
                <ListItem 
                    title={item.address}
                    subtitle={item.status}     
                    onPress={() => navigate('HouseInfo', { houseId: item.id })}               
                    leftAvatar={{ source: require('./images/generichouse.jpg')}}
                />
            )
        }
        return (
            <FlatList 
                data={this.state.houses}
                renderItem={renderHouseDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default HouseDirectory;