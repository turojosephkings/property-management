import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function HouseDirectory(props) {

    const renderHouseDirectoryItem = ({item}) => {
        return (
            <ListItem 
                title={item.address}
                subtitle={item.status}                    
                leftAvatar={{ source: require('./images/generichouse.jpg') }}
            />
        )
    }
    return (
        <FlatList 
            data={props.houses}
            renderItem={renderHouseDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default HouseDirectory;