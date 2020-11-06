import React, { Component } from 'react';

import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { Modal, Text, View, StyleSheet, ScrollView, Image, Picker} from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-navigation';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        workorders: state.workorders
    };
};

class NewProperty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showRoomsModal: false,
            showApplianceModal: false,
            showUtilitiesModal: false,
            showMiscellaneousModal: false,
            id: '',
            address: '',
            imageUrl: baseUrl + './images/iconHouse.jpg',
            sqft: '',
            hoa: false,
            electricprovider: '',
            waterprovider: '',
            fuelprovider: '',
            bedrooms: '',
            bathrooms: '',
            halfbathroom: false,
            appliances: {
                waterheater: false,
                airconditioner: false,
                furnace: false,
                washer: false,
                dryer: false,
                dishwasher: false,
                stove: false,
                rangehood: false,
                microwaverangehood: false,
                refrigerator: false,
                garagedooropener: false
            },
            sewertype: '',
            petfriendly: false,
            pool: false,
            notes: ''
        }
    }

    static navigationOptions = {
        title: 'Create a New Property'
    };


    toggleRoomsModal() {
        this.setState({showRoomsModal: !this.state.showRoomsModal});
    }

    toggleApplianceModal() {
        this.setState({showApplianceModal: !this.state.showApplianceModal});
    }

    toggleUtilitiesModal() {
        this.setState({showUtilitiesModal: !this.state.showUtilitiesModal});
    }

    toggleMiscellaneousModal() {
        this.setState({showMiscellaneousModal: !this.state.showMiscellaneousModal});
    }        

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1,1]
            });
            if(!capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri})
            }
        }
    }

    render() {

        const { modalVisible } = this.state.showRoomsModal;        

        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/iconHouse.jpg')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                    </View>
                    <Input
                        placeholder='Address'
                        leftIcon={{type: 'font-awesome', name: 'map-marker'}}
                        onChangeText={address => this.setState({address})}
                        value={this.state.address}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    /> 
                    <Input
                        placeholder='sqft'
                        leftIcon={{type: 'font-awesome', name: 'map-signs'}}
                        onChangeText={sqft => this.setState({sqft})}
                        value={this.state.sqft}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />                                                           
                    <View style={{margin: 10}} >
                        <Button 
                            title='Rooms'
                            onPress={() => this.toggleRoomsModal()}
                            buttonStyle={styles.Buttons}
                        />  
                    </View>                                        
                    <View style={{margin: 10}} >
                        <Button 
                            title='Appliances'
                            onPress={() => this.toggleApplianceModal()}
                            buttonStyle={styles.Buttons}
                        /> 
                      </View>     
                      <View style={{margin: 10}} >
                        <Button 
                            title='Miscellaneous'
                            onPress={() => this.toggleMiscellaneousModal()}
                            buttonStyle={styles.Buttons}
                        /> 
                      </View>   
                      <View style={{margin: 10}} >
                        <Button 
                            title='Utilities'
                            onPress={() => this.toggleUtilitiesModal()}
                            buttonStyle={styles.Buttons}
                        /> 
                      </View>                                                                                 
    
               
                </View>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showRoomsModal}
                    onRequestClose={() => this.toggleRoomsModal()}
                >
                    <SafeAreaView>

                    <View style={styles.modal}>
                    <Text style={styles.modalTitle}>How Many Bedrooms?</Text>                                             
                    <Picker
                        
                        selectedValue={this.state.bedrooms}
                        onValueChange={itemValue => this.setState({bedrooms: itemValue})}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                        <Picker.Item label='7' value='7' />
                        <Picker.Item label='8' value='8' />
                        <Picker.Item label='9' value='9' />
                        <Picker.Item label='10' value='10' />
                    </Picker>  
                    <Text style={styles.modalTitle}>How Many Bathrooms</Text>
                        <Picker
                            selectedValue={this.state.bathrooms}
                            onValueChange={itemValue => this.setState({bathrooms: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                            <Picker.Item label='7' value='7' />
                            <Picker.Item label='8' value='8' />
                            <Picker.Item label='9' value='9' />
                            <Picker.Item label='10' value='10' />
                        </Picker> 
                        <CheckBox 
                            title='Half Bathroom?'
                            center
                            checked={this.state.halfbathroom}
                            onPress={() => this.setState({halfbathroom: !this.state.halfbathroom})}
                            containerStyle={styles.formCheckbox}
                        />  
                    </View>
                        <View style={styles.modal}>
                            <Text style={styles.formLabel}></Text>      
                            <View>
                                 
                            </View>
                            <View>
                                <Button 
                                    title='Confirm'
                                    onPress={() => {console.log(JSON.stringify(this.state)),this.toggleRoomsModal()}}
                                />
                            </View> 
                        </View>
                    </SafeAreaView>
                </Modal>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showApplianceModal}
                    onRequestClose={() => this.toggleApplianceModal()}
                >
                    <SafeAreaView>

                    <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Appliances Included</Text>                                             
                    
                        <CheckBox 
                            title='Water Heater'
                            center
                            checked={this.state.waterheater}
                            onPress={() => this.setState({waterheater: !this.state.waterheater})}
                            containerStyle={styles.formCheckbox}
                        />  
                        <CheckBox 
                            title='Air Conditioner'
                            center
                            checked={this.state.airconditioner}
                            onPress={() => this.setState({airconditioner: !this.state.airconditioner})}
                            containerStyle={styles.formCheckbox}
                        />                          
                        <CheckBox 
                            title='Furnace'
                            center
                            checked={this.state.furnace}
                            onPress={() => this.setState({furnace: !this.state.furnace})}
                            containerStyle={styles.formCheckbox}
                        /> 
                        <CheckBox 
                            title='Washer'
                            center
                            checked={this.state.washer}
                            onPress={() => this.setState({washer: !this.state.washer})}
                            containerStyle={styles.formCheckbox}
                        /> 
                        <CheckBox 
                            title='Dryer'
                            center
                            checked={this.state.dryer}
                            onPress={() => this.setState({dryer: !this.state.dryer})}
                            containerStyle={styles.formCheckbox}
                        />           
                        <CheckBox 
                            title='Dishwasher'
                            center
                            checked={this.state.dishwasher}
                            onPress={() => this.setState({dishwasher: !this.state.dishwasher})}
                            containerStyle={styles.formCheckbox}
                        />            
                        <CheckBox 
                            title='Stove'
                            center
                            checked={this.state.stove}
                            onPress={() => this.setState({stove: !this.state.stove})}
                            containerStyle={styles.formCheckbox}
                        />    
                        <CheckBox 
                            title='Range Hood'
                            center
                            checked={this.state.rangehood}
                            onPress={() => this.setState({rangehood: !this.state.rangehood})}
                            containerStyle={styles.formCheckbox}
                        /> 
                        <CheckBox 
                            title='Microwave Range Hood'
                            center
                            checked={this.state.microwaverangehood}
                            onPress={() => this.setState({microwaverangehood: !this.state.microwaverangehood})}
                            containerStyle={styles.formCheckbox}
                        />  
                        <CheckBox 
                            title='Refrigerator'
                            center
                            checked={this.state.refrigerator}
                            onPress={() => this.setState({refrigerator: !this.state.refrigerator})}
                            containerStyle={styles.formCheckbox}
                        />         
                        <CheckBox 
                            title='Garage Door Opener'
                            center
                            checked={this.state.garagedooropener}
                            onPress={() => this.setState({garagedooropener: !this.state.garagedooropener})}
                            containerStyle={styles.formCheckbox}
                        />                                                                                                                                                 
                    </View>
                        <View style={styles.modal}>
                            <Text style={styles.formLabel}></Text>      
                            <View>
                                 
                            </View>
                            <View>
                                <Button 
                                    title='Confirm'
                                    onPress={() => {console.log(JSON.stringify(this.state)),this.toggleApplianceModal()}}
                                />
                            </View> 
                        </View>

                    </SafeAreaView>
                </Modal>	

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showMiscellaneousModal}
                    onRequestClose={() => this.toggleMiscellaneousModal()}
                >
                    <SafeAreaView>

                        <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Miscellaneous Maria?</Text>                                             
                        </View>

                        <CheckBox 
                        title='Pool'
                        center
                        checked={this.state.pool}
                        onPress={() => this.setState({pool: !this.state.pool})}
                        containerStyle={styles.formCheckbox}
                    />    
                    <CheckBox 
                        title='HOA'
                        center
                        checked={this.state.hoa}
                        onPress={() => this.setState({hoa: !this.state.hoa})}
                        containerStyle={styles.formCheckbox}
                    />                       
                    <CheckBox 
                        title='Pet Friendly'
                        center
                        checked={this.state.petfriendly}
                        onPress={() => this.setState({petfriendly: !this.state.petfriendly})}
                        containerStyle={styles.formCheckbox}
                    />                          

                        <View>
                            <Button 
                                title='Confirm'
                                onPress={() => {console.log(JSON.stringify(this.state)),this.toggleMiscellaneousModal()}}
                            />
                        </View>                          
                    </SafeAreaView>
                </Modal>   

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showUtilitiesModal}
                    onRequestClose={() => this.toggleUtilitiesModal()}
                >
                    <SafeAreaView>

                        <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Utilities Maria?</Text>                                             
                        </View>

                        <Input
                            placeholder='Electric Provider'
                            leftIcon={{type: 'font-awesome', name: 'plug'}}
                            onChangeText={electricprovider => this.setState({electricprovider})}
                            value={this.state.electricprovider}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />   
                        <Input
                            placeholder='Water Provider'
                            leftIcon={{type: 'font-awesome', name: 'tint'}}
                            onChangeText={waterprovider => this.setState({waterprovider})}
                            value={this.state.waterprovider}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />          
                        <Input
                            placeholder='Fuel Provider'
                            leftIcon={{type: 'font-awesome', name: 'flash'}}
                            onChangeText={fuelprovider => this.setState({fuelprovider})}
                            value={this.state.fuelprovider}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />                          

                        <View>
                            <Button 
                                title='Confirm'
                                onPress={() => {console.log(JSON.stringify(this.state)),this.toggleUtilitiesModal()}}
                            />
                        </View>                         
                    </SafeAreaView>
                </Modal>                    

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent:'center',
        margin: 20
    },
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formInput: {
        padding: 8
    },
    formIcon: {
        marginRight: 10
    },
    formCheckbox: {
        margin: 7,
        backgroundColor: null
    },    
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
        borderColor: '#808080'
    },    
    image: {
        width: 60,
        height: 60
    },     
    formItem: {
        flex: 10
    },
    formLabel: {
        fontSize: 18,
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
})

export default (NewProperty)