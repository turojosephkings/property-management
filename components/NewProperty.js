import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { Modal, Text, View, StyleSheet, ScrollView, Image, Picker, Card } from 'react-native';
import { postHouse } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-navigation';
import { color } from 'react-native-reanimated';
import { fetchHouses } from '../redux/ActionCreators';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        tenants: state.tenants,
        owners: state.owners
    };
};

const mapDispatchToProps = {
    fetchHouses,
    postHouse: (address, owner, tenant, imageUrl, sqft, hoa, electricprovider, waterprovider, fuelprovider, bedrooms, bathrooms, halfbathroom, waterheater, airconditioner, furnace, washer, dryer, dishwasher, stove, rangehood, microwaverangehood, refrigerator, garagedooropener, sewertype, petfriendly, pool, notes) => (postHouse(address, owner, tenant, imageUrl, sqft, hoa, electricprovider, waterprovider, fuelprovider, bedrooms, bathrooms, halfbathroom, waterheater, airconditioner, furnace, washer, dryer, dishwasher, stove, rangehood, microwaverangehood, refrigerator, garagedooropener, sewertype, petfriendly, pool, notes)),
}

class NewProperty extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showRoomsModal: false,
            showApplianceModal: false,
            showUtilitiesModal: false,
            showMiscellaneousModal: false,
            showConfirmationModal: false,
            id: '',
            address: '',
            owner: '',
            tenant: '',
          //  imageUrl: baseUrl + './images/iconHouse.jpg',
            sqft: '',
            hoa: false,
            electricprovider: '',
            waterprovider: '',
            fuelprovider: '',
            bedrooms: '1',
            bathrooms: '1',
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
    
    toggleConfirmationModal() {
        this.setState({showConfirmationModal: !this.state.showConfirmationModal});
    } 

    refreshHouses() {
        this.props.fetchHouses();
    }
    
    handleNewHouse() {
        this.props.postHouse(this.state.address, this.state.owner, this.state.tenant, this.state.imageUrl, this.state.sqft, this.state.hoa, this.state.electricprovider, this.state.waterprovider, this.state.fuelprovider, this.state.bedrooms, this.state.bathrooms, this.state.halfbathroom, this.state.waterheater, this.state.airconditioner, this.state.furnace, this.state.washer, this.state.dryer, this.state.dishwasher, this.state.stove, this.state.rangehood, this.state.microwaverangehood, this.state.refrigerator, this.state.garagedooropener, this.state.sewertype, this.state.petfriendly, this.state.pool, this.state.notes);
    }   
    
    resetForm() {
        this.setState({
            showRoomsModal: false,
            showApplianceModal: false,
            showUtilitiesModal: false,
            showMiscellaneousModal: false,
            showConfirmationModal: false,
            id: '',
            address: '',
            owner: '',
            tenant: '',
        //    imageUrl: baseUrl + './images/iconHouse.jpg',
            sqft: '',
            hoa: false,
            electricprovider: '',
            waterprovider: '',
            fuelprovider: '',
            bedrooms: '1',
            bathrooms: '1',
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
        });
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1,1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage.uri)
                const asset = await MediaLibrary.createAssetAsync(capturedImage.uri);
               this.processImage(capturedImage.uri)
            }
        }
    }

    processImage = async (imgUri) => {

        const processedImage = await ImageManipulator.manipulateAsync(imgUri, [{ resize: { width: 400 } }], { compress: 1, format: ImageManipulator.SaveFormat.PNG});

        if (processedImage){
            console.log(processedImage);
            this.setState({imageUrl: processedImage.uri})
        }
        
    }

    getImageFromGallery = async () => {

        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1,1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage.uri)
               this.processImage(capturedImage.uri)
            }
        }        
    }    

    render() {
   
        const id = this.props.houses.houses.length;

        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{uri: this.state.imageUrl}}
                          //  loadingIndicatorSource={require('./images/iconHouse.jpg')}
                            style={styles.image}
                        />
                        <Button 
                            title={'Camera'}
                            onPress={this.getImageFromCamera}
                        />
                        <Button 
                            title={'Gallery'}
                            onPress={this.getImageFromGallery}
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
                        placeholder='Owner'
                        leftIcon={{type: 'font-awesome', name: 'book'}}
                        onChangeText={owner => this.setState({owner})}
                        value={this.state.owner}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    /> 
                    <Input
                        placeholder='Tenant'
                        leftIcon={{type: 'font-awesome', name: 'handshake-o'}}
                        onChangeText={tenant => this.setState({tenant})}
                        value={this.state.tenant}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />                                                                                            
                    <View style={{margin: 10}} >
                        <Button 
                            title='Spaces'
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
    
                      <View style={{margin: 10}} >
                        <Button 
                            title='Create Property!'
                            onPress={() => {this.toggleConfirmationModal()}}
                            buttonStyle={styles.Buttons}
                        /> 
                      </View>     
                      <View>
                    
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
                    <Text style={styles.modalTitle}>House Spaces</Text> 
                    <Input
                        placeholder='sqft'
                        leftIcon={{type: 'font-awesome', name: 'map-signs'}}
                        onChangeText={sqft => this.setState({sqft})}
                        value={this.state.sqft}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />  
                    
                        <Text style={styles.modalText}>How Many Bedrooms?</Text>   
                                                                
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
                        <Text style={styles.modalText}>How Many Bathrooms</Text>
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
                                    onPress={() => {this.toggleRoomsModal()}}
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
                        <ScrollView>
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
                                <Button 
                                    title='Confirm'
                                    onPress={() => {this.toggleApplianceModal()}}
                                />
                            </View>
                        </ScrollView>
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
                            <Text style={styles.modalTitle}>House Miscellaneous</Text>                                             
                        
                            <Text style={styles.modalText}>Sewer Type: </Text>  
                            <Picker  
                                selectedValue={this.state.sewertype}
                                onValueChange={itemValue => this.setState({sewertype: itemValue})}
                            >
                                <Picker.Item label='Sewer' value='Sewer' />
                                <Picker.Item label='Septic' value='Septic' />
                            </Picker> 
                    
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
                        </View>                  

                        <View style={styles.modal}>
                            <Button 
                                title='Confirm'
                                onPress={() => {this.toggleMiscellaneousModal()}}
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
                        <Text style={styles.modalTitle}>House Utilities</Text>                                             
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

                        <View style={styles.modal}>
                            <Button 
                                title='Confirm'
                                onPress={() => {this.toggleUtilitiesModal()}}
                            />
                        </View>                         
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
                                <Text style={styles.modalTitle}>Confirm House Details</Text>                                             
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>House Information</Text>     
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Address:  {this.state.address}</Text>
                                    <Text style={styles.modalText}>sqft:  {this.state.sqft}</Text>                        
                                    <Text style={styles.modalText}>HOA:  {this.state.hoa ? '✅' : '❌'}</Text>     
                                    <Text style={styles.modalText}>Electric Provider: {this.state.electricprovider}</Text>   
                                    <Text style={styles.modalText}>Water Provider: {this.state.waterprovider}</Text>
                                    <Text style={styles.modalText}>Fuel Provider: {this.state.fuelprovider}</Text>                                
                                </View>
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>House Spaces</Text>
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Number of Bedrooms:  {this.state.bedrooms}</Text>       
                                    <Text style={styles.modalText}>Number of Bathrooms:  {this.state.bathrooms}</Text> 
                                    <Text style={styles.modalText}>Half Bathroom: {this.state.halfbathroom ? '✅' : '❌'}</Text>   
                                </View>
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>Included Appliances</Text>
                            </View>
                            <View style={styles.modal}>
                                <Text style={styles.modalText}>Water Heater:{this.state.waterheater ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>A/C: {this.state.airconditioner ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Furnace: {this.state.furnace ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Washer: {this.state.washer ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Dryer: {this.state.dryer ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Dishwasher: {this.state.dishwasher ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Stove: {this.state.stove ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Range Hood: {this.state.rangehood ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>MicrowaveRange Hood: {this.state.microwaverangehood ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Refrigerator: {this.state.refrigerator ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Garage Door Opener: {this.state.garagedooropener ? '✅' : '❌'}</Text> 
                            </View>
                            <View>
                                <Text style={styles.modalTitle}>House Miscellaneous</Text>
                            </View>
                            <View style={styles.modal}>
                                <Text style={styles.modalText}>Sewer Type: {this.state.sewertype}</Text> 
                                <Text style={styles.modalText}>Pet Friendly: {this.state.petfriendly ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Pool: {this.state.pool ? '✅' : '❌'}</Text> 
                                <Text style={styles.modalText}>Notes: {this.state.notes}</Text>                                                                                            
                            </View>             
                                                    
                            <View style={styles.modal}> 
                
                                <Button 
                                    title='Back to Edit House'
                                    buttonStyle={{backgroundColor: 'red', margin: 10}}
                                    onPress={() => {this.toggleConfirmationModal(), console.log("Canceled Confirm House")}}
                                />
                                <Button 
                                    title='Confirm'
                                    buttonStyle={{margin: 10}}
                                    onPress={() => {this.handleNewHouse(), this.toggleConfirmationModal(), this.resetForm(), this.refreshHouses(), console.log(JSON.stringify(this.state))}}
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
        marginTop: 5,
        marginBottom: 10
    },
    bold: {
        fontWeight: 'bold'
    },
    modalText: {



        fontSize: 18,
        margin: 10
    }	,
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },    
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProperty)