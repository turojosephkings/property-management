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
            showModal: false,
            id: '',
            address: '',
            bedrooms: '',
            bathrooms: '',
            halfbathroom: false,
            pool: false,
            imageUrl: baseUrl + './images/iconHouse.jpg'
        }
    }

    static navigationOptions = {
        title: 'Create a New Property'
    };


    toggleModal() {
        this.setState({showModal: !this.state.showModal});
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

        const { modalVisible } = this.state.showModal;        

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
                        leftIcon={{type: 'font-awesome', name: 'address-card'}}
                        onChangeText={address => this.setState({address})}
                        value={this.state.address}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    /> 
                    <Button 
                        title='Rooms'
                        onPress={() => this.toggleModal()}
                        buttonStyle={styles.Buttons}
                    />  
                                                             
                    <CheckBox 
                        title='Pool'
                        center
                        checked={this.state.pool}
                        onPress={() => this.setState({pool: !this.state.pool})}
                        containerStyle={styles.formCheckbox}
                    />    
  
                </View>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
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
                                    onPress={() => {console.log(JSON.stringify(this.state)),this.toggleModal()}}
                                />
                            </View> 
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
        margin: 8,
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
    twoPickers: {
        flex: 1,
        width: 150,
        height: 88,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
        
    },
    twoPickerItems: {
        height: 88,
        color: 'red'
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