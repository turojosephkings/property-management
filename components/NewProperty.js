import React, { Component } from 'react';

import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { View, StyleSheet, ScrollView, Image} from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class NewProperty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            address: '',
            bedrooms: '',
            bathrooms: '',
            pool: false,
            imageUrl: baseUrl + './images/iconHouse.jpg'
        }
    }

    static navigationOptions = {
        title: 'Create a New Property'
    };

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
                    <CheckBox 
                        title='Pool'
                        center
                        checked={this.state.pool}
                        onPress={() => this.setState({pool: !this.state.pool})}
                        containerStyle={styles.formCheckbox}
                    />           
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
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
    }
})

export default NewProperty