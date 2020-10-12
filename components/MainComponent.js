import React, { Component } from 'react';
import HouseDirectory from './HouseDirectoryComponent';
import { HOUSES } from '../shared/houses';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: HOUSES
        };
    }

    render() {
        return <HouseDirectory houses={this.state.houses} />;
    }
}

export default Main;