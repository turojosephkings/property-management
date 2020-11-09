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
    postHouse: (address, dln, phonenumber, imageUrl, sqft, hoa, electricprovider, waterprovider, fuelprovider, bedrooms, bathrooms, halfbathroom, waterheater, airconditioner, furnace, washer, dryer, dishwasher, stove, rangehood, microwaverangehood, refrigerator, garagedooropener, sewertype, petfriendly, pool, notes) => (postHouse(address, dln, phonenumber, imageUrl, sqft, hoa, electricprovider, waterprovider, fuelprovider, bedrooms, bathrooms, halfbathroom, waterheater, airconditioner, furnace, washer, dryer, dishwasher, stove, rangehood, microwaverangehood, refrigerator, garagedooropener, sewertype, petfriendly, pool, notes)),
}

class NewPerson extends Component {


    constructor(props) {
        super(props);

        this.state = {

            id: 0,
            fullname: '',
            dln: '',
            phonenumber: '',
            email: '',
            role: ''

        }
    }

    static navigationOptions = {
        title: 'Create a New Person'
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
        this.props.postHouse(this.state.address, this.state.dln, this.state.phonenumber, this.state.imageUrl, this.state.sqft, this.state.hoa, this.state.electricprovider, this.state.waterprovider, this.state.fuelprovider, this.state.bedrooms, this.state.bathrooms, this.state.halfbathroom, this.state.waterheater, this.state.airconditioner, this.state.furnace, this.state.washer, this.state.dryer, this.state.dishwasher, this.state.stove, this.state.rangehood, this.state.microwaverangehood, this.state.refrigerator, this.state.garagedooropener, this.state.sewertype, this.state.petfriendly, this.state.pool, this.state.notes);
    }   
    
    resetForm() {
        this.setState({
            id: 0,
            fullname: '',
            dln: '',
            phonenumber: '',
            email: '',
            role: ''
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
                            loadingIndicatorSource={require('./images/iconHouse.jpg')}
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
                        placeholder='Full Name'
                        leftIcon={{type: 'font-awesome', name: 'user'}}
                        onChangeText={address => this.setState({address})}
                        value={this.state.address}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />       
                    <Input
                        placeholder='Driver License Number'
                        leftIcon={{type: 'font-awesome', name: 'id-card-o'}}
                        onChangeText={dln => this.setState({dln})}
                        value={this.state.dln}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    /> 
                    <Input
                        placeholder='Phone Number'
                        leftIcon={{type: 'font-awesome', name: 'phone'}}
                        onChangeText={phonenumber => this.setState({phonenumber})}
                        value={this.state.phonenumber}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />                                                                                            
                                                                                
    
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPerson)