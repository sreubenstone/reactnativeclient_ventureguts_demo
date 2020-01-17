import React from 'react';
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Control from '../components/Challenges/Control';


export default class Challenges extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `FundaMentals`,
            headerTitleStyle: {
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#605C9A',
            },
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Credo')}>
                    <Text style={{ marginRight: 20, marginTop: 3.5, fontSize: 13, color: '#fff', fontWeight: 'bold' }}>💪</Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
                    <Text style={{ marginLeft: 20, marginTop: 3.5, fontSize: 13, color: '#fff', fontWeight: 'bold' }}>🏆</Text>
                </TouchableOpacity>
            ),

        }
    }

    render() {
        console.log('route name:', this.props.navigation.state.routeName)

        return (
            <ScrollView>
                <Control nav={this.props.navigation.navigate} />
            </ScrollView >
        )
    };
}

