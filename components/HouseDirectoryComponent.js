import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ListItem, Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        houses: state.houses
    };
};

class HouseDirectory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.houses.houses,
            fullData: this.props.houses.houses,
            query: ''
            
        }
    }

    static navigationOptions = {
        title: 'House Directory'
    };

    renderHeader = () => {    
        return (      
          <Input  
            autoCapitalize='none'
            autoCorrect={false}      
            placeholder="Search Address Here..."                 
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false} 
            inputStyle={{        borderRadius: 25,
                borderColor: '#333',
                backgroundColor: '#fff'}}       
          />    
        );  
    };

    searchFilterFunction = text => {    
        const formattedQuery = text.toLowerCase();

        
        const data = this.state.fullData.filter(address => { 
            return this.contains(address, formattedQuery)
        })

        this.setState({ data, query: text }); 
    }

    contains = ({ address }, query) => {

        if (address.toLowerCase().includes(query)) {
          return true
        }
        return false
    }
        
         


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
                        Loading
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
                    <FlatList                        
                        ListHeaderComponent={this.renderHeader}    
                        data={this.state.data}
                        renderItem={renderHouseDirectoryItem}
                        keyExtractor={item => item.id}
 
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