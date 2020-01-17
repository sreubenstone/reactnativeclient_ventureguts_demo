import React from 'react';
import { Platform, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import ChatControl from '../components/ChatControl';




export default class MainChat extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Guts Main Chat',
            headerTitleStyle: {
                color: '#fff'
            },
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Credo')}>
                    <Text style={{ marginRight: 15, marginTop: 3.5, fontSize: 8, color: '#fff' }}>Guts Credo</Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
                    <Text style={{ marginLeft: 15, marginTop: 3.5, fontSize: 8, color: '#fff', fontWeight: 'bold' }}>{(Platform.OS === 'ios') ? 'Weekly Rankings' : 'Rankings'}</Text>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#606B95',
            },
        }
    }
    render() {
        return (
            <ChatControl nav={this.props.navigation.navigate} milestone={1} />
        )
    };
}

