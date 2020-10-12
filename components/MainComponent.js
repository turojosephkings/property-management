import React, { Component } from 'react';
import HouseDirectory from './HouseDirectoryComponent';
import HouseInfo from './HouseInfoComponent';
import { View } from 'react-native';
import { HOUSES } from '../shared/houses';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: HOUSES,
            selectedHouse: null
        };
    }

    onHouseSelect(houseId) {
        this.setState({selectedHouse: houseId});
    }

    render() {
        return ( 
            <View style={{flex: 1}}>
                <HouseDirectory 
                    houses={this.state.houses}
                    onPress={houseId => this.onHouseSelect(houseId)} 
                />
                <HouseInfo
                    house={this.state.houses.filter(house => house.id === this.state.selectedHouse)[0]}
                />
            </View>
        )
    }
}

export default Main;