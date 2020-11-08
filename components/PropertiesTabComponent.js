import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Animated } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { paymentorders } from '../redux/paymentorders';
import NewProperty from './NewProperty';

class PropertiesTab extends Component {


    static navigationOptions = {
        title: 'Properties'
    }

    render() {

        const { navigate } = this.props.navigation;


        return (
            <ScrollView>
                
                
                <View>

                    <Button 
                        title='Properties Directory'
                        onPress={() => navigate('HouseDirectory')}
                        buttonStyle={styles.Buttons}
                    />
                    <Button 
                        title='Create New Property'
                        onPress={() => navigate('NewProperty')}
                        buttonStyle={styles.Buttons}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    Buttons: {
        margin: 40
    }
})

export default (PropertiesTab);