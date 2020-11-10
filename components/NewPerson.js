import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { Modal, Text, View, StyleSheet, ScrollView, Image, Picker, Card } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-navigation';
import { color } from 'react-native-reanimated';
import { fetchOwners } from '../redux/ActionCreators';
import { fetchTenants } from '../redux/ActionCreators';
import { postTenant } from '../redux/ActionCreators';
import { postOwner } from '../redux/ActionCreators';
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
    fetchOwners,
    fetchTenants,
    postTenant: (fullname, imageUrl, dln, phonenumber, email, role ) => (postTenant(fullname, imageUrl, dln, phonenumber, email, role)),
    postOwner: (fullname, imageUrl, dln, phonenumber, email, role ) => (postOwner(fullname, imageUrl, dln, phonenumber, email, role))
}

class NewPerson extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showConfirmationModal: false,
            fullname: '',
            imageUrl: baseUrl + 'images/person.png',
            dln: '',
            phonenumber: '',
            email: '',
            role: 'Tenant'

        }
    }

    static navigationOptions = {
        title: 'Create a New Person'
    };


    
    handleNewTenant() {
        this.props.postTenant(this.state.fullname, this.state.imageUrl, this.state.dln, this.state.phonenumber, this.state.email, this.state.role);
        console.log(this.state.fullname, this.state.imageUrl, this.state.dln, this.state.phonenumber, this.state.email, this.state.role)
    }   

    handleNewOwner() {
        this.props.postOwner(this.state.fullname, this.state.imageUrl, this.state.dln, this.state.phonenumber, this.state.email, this.state.role);
        console.log(this.state.fullname, this.state.imageUrl, this.state.dln, this.state.phonenumber, this.state.email, this.state.role)
    } 
    
    resetForm() {
        this.setState({
            showConfirmationModal: false,
            fullname: '',
            imageUrl: baseUrl + 'images/person.png',
            dln: '',
            phonenumber: '',
            email: '',
            role: 'Tenant'
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
    
    toggleConfirmationModal() {
        this.setState({showConfirmationModal: !this.state.showConfirmationModal});
    } 

    refreshTenants() {
        this.props.fetchTenants();
    }

    refreshOwners() {
        this.props.fetchOwners();
    }

    render() {

        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.sections}>
                        <Text style={styles.modalText}>Profile Picture</Text>
                            <View style={styles.imageContainer}>                   
                                <Image 
                                    source={{uri: this.state.imageUrl}}
                                    // loadingIndicatorSource={require('./images/icon-person')}
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
                    </View>
                    <View style={styles.sections}>
                    <Text style={styles.modalText}>Personal Data</Text>                        
                        <Input
                            placeholder='Full Name'
                            leftIcon={{type: 'font-awesome', name: 'user'}}
                            onChangeText={fullname => this.setState({fullname})}
                            value={this.state.fullname}
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
                        <Input
                            placeholder='E-mail'
                            leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />  
                        <Text style={styles.modalText}>Role of this person:</Text>
                        <View style={{padding: 5, margin: 10}}>
                            <Picker
                                selectedValue={this.state.role}
                                onValueChange={itemValue => this.setState({role: itemValue})}
                                style={{ flex: 1, height: 150, width: 250, alignSelf: 'center' }}
                            >
                                <Picker.Item label='Tenant' value='Tenant' />
                                <Picker.Item label='Owner' value='Owner' />
                            </Picker>                                                                                                               
                        </View>
                    </View>                                            
    
                    <View style={{margin: 10}} >
                        <Button 
                            title='Create Person!'
                            onPress={() => {
                                this.toggleConfirmationModal()
                            }}
                            
                                buttonStyle={styles.Buttons}
                        /> 
                    </View>     
   
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showConfirmationModal}
                    onRequestClose={() => this.toggleConfirmationModal()}
                >
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.modal}>
                                <Text style={styles.modalTitle}>Confirm Person Details</Text>                                             
                            </View>
                            <View>
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Full Name:  {this.state.fullname}</Text>
                                    <Text style={styles.modalText}>Driver License Number:  {this.state.dln}</Text>                                                            
                                    <Text style={styles.modalText}>Phone Number {this.state.phonenumber}</Text>   
                                    <Text style={styles.modalText}>Email: {this.state.email}</Text>
                                    <Text style={styles.modalText}>Role: {this.state.role}</Text>                                
                                </View>
                            </View>
                            
                                                    
                            <View style={styles.modal}> 
                
                                <Button 
                                    title='Back to Edit Person'
                                    buttonStyle={{backgroundColor: 'red', margin: 10}}
                                    onPress={() => {this.toggleConfirmationModal(), console.log("Canceled Confirm Person")}}
                                />
                                <Button 
                                    title='Confirm'
                                    buttonStyle={{margin: 10}}
                                    onPress={() => {
                                        if (this.state.role === 'Tenant'){
                                            this.handleNewTenant(), this.resetForm(), this.refreshTenants(), this.toggleConfirmationModal()
                                        }
                                        else {
                                            this.handleNewOwner(), this.resetForm(), this.refreshTenants(), this.toggleConfirmationModal()
                                        }
                                    }}
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
    sections: {
        borderWidth: 0.5, 
        borderColor: 'blue', 
        borderStyle: 'solid',
        padding: 2,
        marginBottom: 5
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPerson)