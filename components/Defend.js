import React from 'react';
import { AppState, Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';





export default class Defend extends React.Component {

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }


    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            console.log('refetching')
            this.props.refetch()
            console.log('network only notifications server fetch')
        }
    };


    runCron = () => {
        const start = new Date()
        const date1 = new Date('June 19, 2019 00:00:00 (EST)');

    }


    render() {
        return (
            <AppNavigator />
        )
    };
}

