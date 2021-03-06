import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Modal } from 'react-native';
import { Card, Button, CheckBox, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchWorkorders } from '../redux/ActionCreators';
import { SafeAreaView } from 'react-navigation';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        workorders: state.workorders
    };
};

const mapDispatchToProps = {
    fetchWorkorders  
}

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
                    <ListItem                                        
                        title={item.description} 
                        subtitle={item.description + ' - ' + item.location} 
                         //onPress={() => console.log (item.id)} 
                        //chevron    
                    />
                )
            } 
        }
    }
    
    return (
        <Card title='Active Workorders'>

            <FlatList
                data={workorders}
                renderItem={renderWorkorderItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}





class HouseInfo extends Component {
    
    static navigationOptions = {
        title: 'House Information'
    }

    constructor(props) {
        super(props);

        this.state = {
            showApplianceModal: false,
            showHouseDetailsModal: false,
            activeworkorders: []
        }
    }

    toggleApplianceModal() {
        this.setState({showApplianceModal: !this.state.showApplianceModal});
    }

    toggleHouseDetailsModal() {
        this.setState({showHouseDetailsModal: !this.state.showHouseDetailsModal});
    }
    
    render() {

        const { navigate } = this.props.navigation;


        const houseId = this.props.navigation.getParam('houseId');
        const house = this.props.houses.houses.filter(house => house.id === houseId)[0];
        const workorders = this.props.workorders.workorders.filter(workorder => workorder.houseId === houseId);

        return (
            <ScrollView>
                <RenderHouse house={house} />

                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='House Details' 
                    onPress={() => this.toggleHouseDetailsModal()}
                /> 
                



                
                <Button 
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
                    title='View Appliances' 
                    onPress={() => this.toggleApplianceModal()}
                />


                <RenderWorkorders workorders={workorders} />



                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showHouseDetailsModal}
                    onRequestClose={() => this.toggleHouseDetailsModal()}
                >
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.modal}>
                                <Text style={styles.modalTitle}>House Details</Text>                                             
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>House Information</Text>     
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Address:  {house.address}</Text>
                                    <Text style={styles.modalText}>sqft:  {house.sqft}</Text>                        
                                    <Text style={styles.modalText}>HOA:  {house.hoa ? '✅' : '❌'}</Text>     
                                    <Text style={styles.modalText}>Electric Provider: {house.electricprovider}</Text>   
                                    <Text style={styles.modalText}>Water Provider: {house.waterprovider}</Text>
                                    <Text style={styles.modalText}>Fuel Provider: {house.fuelprovider}</Text>                                
                                </View>
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>House Spaces</Text>
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Number of Bedrooms:  {house.bedrooms}</Text>       
                                    <Text style={styles.modalText}>Number of Bathrooms:  {house.bathrooms}</Text> 
                                    <Text style={styles.modalText}>Half Bathroom: {house.halfbathroom ? '✅' : '❌'}</Text>   
                                </View>
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>House Miscellaneous</Text>
                            </View>
                            <View style={styles.modal}>
                                <Text style={styles.modalText}>Sewer Type: {house.sewertype}</Text> 
                                <Text style={styles.modalText}>Pet Friendly: {house.petfriendly ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Pool: {house.pool ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Notes: {house.notes}</Text>                                                                                            
                            </View>             
                                                    
                            <View style={styles.modal}> 
                

                                <Button 
                                    title='Close'
                                    buttonStyle={{margin: 10}}
                                    onPress={() => {this.toggleHouseDetailsModal()}}
                                />
                            </View>  
                        </ScrollView>                        
                    </SafeAreaView>
                </Modal>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showApplianceModal}
                    onRequestClose={() => this.toggleApplianceModal()}
                >
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.modal}>
                                <Text style={styles.modalTitle}>Included Appliances</Text>                                             
                                <View style={styles.modal}>
                                <Text style={styles.modalText}>Water Heater:{house.appliances.waterheater ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>A/C: {house.appliances.airconditioner ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Furnace: {house.appliances.furnace ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Washer: {house.appliances.washer ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Dryer: {house.appliances.dryer ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Dishwasher: {house.appliances.dishwasher ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Stove: {house.appliances.stove ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Range Hood: {house.appliances.rangehood ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>MicrowaveRange Hood: {house.appliances.microwaverangehood ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Refrigerator: {house.appliances.refrigerator ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Garage Door Opener: {house.appliances.garagedooropener ? '✅' : '❌'}</Text> 
                            </View>
                                                                                                                                                                          
                            </View>
                            <View style={styles.modal}>
                                <Button 
                                    title='Confirm'
                                    onPress={() => {this.toggleApplianceModal()}}
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
    boldTxt: {
      fontWeight: 'bold'
      
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseInfo);