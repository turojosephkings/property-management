import React, { Component } from 'react';
import { Text, View, ScrollView, Picker, Switch, StyleSheet, FlatList, Modal } from 'react-native';
import { Card, Icon, Rating, Input, ListItem, Tile, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import DateTimePicker from '@react-native-community/datetimepicker';
import HouseDirectory from './HouseDirectoryComponent';
import { SafeAreaView } from 'react-navigation';
import { fetchWorkorders } from '../redux/ActionCreators';
import { postWorkorder } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        workorders: state.workorders
    };
};

const mapDispatchToProps = {
    fetchWorkorders,
    postWorkorder: ( houseId, address, dateReported, dateAssigned, dateCompleted, completed, location, description, provider ) => (postWorkorder( houseId, address, dateReported, dateAssigned, dateCompleted, completed, location, description, provider ))
    
}






class NewOrder extends Component {

    static navigationOptions = {
        title: 'Create a New Workorder'
    };

    constructor(props) {
        super(props)

        this.state = {
            data: this.props.houses.houses,
            fullData: this.props.houses.houses,
            query: '',
            showSelectPropertyModal: false,
            showConfirmationModal: false,
            orderType: "Maintenance Order",
            houseId: '',
            address: '',
            dateReported: new Date(),
            dateAssigned: '',
            dateCompleted: '',
            completed: false,
            location: '',
            description: '',
            provider: '',
        };
    }

    handleNewOrder() {
        this.props.postWorkorder( this.state.houseId, this.state.address, this.state.dateReported, this.state.dateAssigned, this.state.dateCompleted, this.state.completed, this.state.location, this.state.description, this.state.provider)
    }

    resetForm() {
        this.setState({
            data: this.props.houses.houses,
            fullData: this.props.houses.houses,
            query: '',
            showConfirmationModal: false,
            showSelectPropertyModal: false,
            orderType: "Maintenance Order",
            houseId: '',
            address: '',
            dateReported: new Date(),
            dateAssigned: '',
            dateCompleted: '',
            completed: false,
            location: '',
            description: '',
            provider: '',
        });
    }

    toggleSelectPropertyModal() {
        this.setState({showSelectPropertyModal: !this.state.showSelectPropertyModal});
    }

    toggleConfirmationModal() {
        this.setState({showConfirmationModal: !this.state.showConfirmationModal});
    }
    
    refreshWorkorders() {
        this.props.fetchWorkorders();
    }


    chooseHouse(houseId, address) {
        this.setState({
            houseId,
            address
        })
       // console.log(JSON.stringify(this.state))
    }

 

    


    render() {

        const RenderHouses = ({houses}) => {

            


            const renderHeader = () => {    
                return (      
                  <Input  
                    autoCapitalize='none'
                    autoCorrect={false}      
                    placeholder="Search Address Here..."                 
                    onChangeText={text => searchFilterFunction(text)}
                    autoCorrect={false} 
                    inputStyle={{        borderRadius: 25,
                        borderColor: '#333',
                        backgroundColor: '#fff'}}       
                  />    
                );  
            };
        
            const searchFilterFunction = text => {    
                const formattedQuery = text.toLowerCase();
        
                
                const data = this.state.fullData.filter(address => { 
                    return contains(address, formattedQuery)
                })
        
                this.setState({ data, query: text }); 
            }
        
            const contains = ({ address }, query) => {
        
                if (address.toLowerCase().includes(query)) {
                  return true
                }
                return false
            }




            const renderHouseItem = ({item}) => {
        
                return (
                    <View>
                    <ListItem
                        leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        title={item.address}
                        subtitle={item.owner}
                        featured  
                        onPress={ ()=> {this.chooseHouse(item.id, item.address), this.toggleSelectPropertyModal()  
                        }}
                    />
                    </View>
                );
            }
        
        
            
            return (
                <Card title='Select Property'>
                <SafeAreaView style={{flex: 1}}>
                    <FlatList
                        ListHeaderComponent={renderHeader}    
                        data={this.state.data}
                        renderItem={renderHouseItem}
                        keyExtractor={item => item.id}
                    />
                    </SafeAreaView>
                </Card>
            )
        }

        const { navigate } = this.props.navigation;
        const houses = this.props.houses.houses
        return (
            <ScrollView>
                <View>

                    <View style={{margin: 10}}>
                        <Button 
                            title='Select Property'
                            onPress={() => {this.toggleSelectPropertyModal()}}
                        />
                    </View>    
                </View>
                <Text>Address: {this.state.address}</Text>
                <View>
                <Input
                        placeholder='Location'
                        leftIcon={{type: 'font-awesome', name: 'map-marker'}}
                        onChangeText={location => this.setState({location})}
                        value={this.state.location}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />                    
                    <Input
                        placeholder='Description'
                        leftIcon={{type: 'font-awesome', name: 'commenting'}}
                        onChangeText={description => this.setState({description})}
                        value={this.state.description}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Provider'
                        leftIcon={{type: 'font-awesome', name: 'briefcase'}}
                        onChangeText={provider => this.setState({provider})}
                        value={this.state.provider}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <View style={styles.modal}>
                        <Button 
                            title='Confirm'
                            onPress={() => { this.toggleConfirmationModal(), this.refreshWorkorders(), this.handleNewOrder()}}
                        />
                    </View>                    
                </View>
                
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showSelectPropertyModal}
                    onRequestClose={() => this.toggleSelectPropertyModal()}
                >
                    <SafeAreaView>
                        <ScrollView>
                            <View style={{ height: 500}}>
                                <ScrollView>
                                <RenderHouses houses={houses}/>                                      
                                </ScrollView>
                            </View>
                                                                                                                                                                
                    
                            <View style={styles.modal}>
                                <Button 
                                    title='Confirm'
                                    onPress={() => this.toggleSelectPropertyModal() }
                                />
                            </View>



                        </ScrollView>
                    </SafeAreaView>
                </Modal>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showConfirmationModal}
                    onRequestClose={() => this.toggleConfirmationModal()}
                >
                    <SafeAreaView>
                        <ScrollView>
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>Service Address:  {this.state.address}</Text>
                            <Text style={styles.modalText}>Date Reported:  {this.state.dateReported.toLocaleDateString('en-US')}</Text>                                                            
                            <Text style={styles.modalText}>Location: {this.state.location}</Text>   
                            <Text style={styles.modalText}>Description: {this.state.description}</Text>
                            <Text style={styles.modalText}>Provider: {this.state.provider}</Text>                                
                        </View>
                        <View style={styles.modal}>
                            <Button 
                                title='Dismiss'
                                buttonStyle={{backgroundColor: 'red', margin: 10}}
                            onPress={() => this.resetForm()}
                            />
                            <Button 
                                title='Confirm'
                                buttonStyle={{margin: 10}}
                                onPress={() => {this.toggleConfirmationModal(), this.resetForm()}}

                            />
                        </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
})




export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);