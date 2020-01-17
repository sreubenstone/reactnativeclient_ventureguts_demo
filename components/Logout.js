import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AUTH } from "../queries";
import * as SecureStore from 'expo-secure-store';


export default class Logout extends React.Component {

    logout = async () => {
        const result = await SecureStore.deleteItemAsync("fbToken")
        const refetch = await this.props.client.query({ query: AUTH, fetchPolicy: "network-only" })

    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.logout()}>
                <Text style={{ marginLeft: 15, fontSize: 9, marginTop: 20 }}>Logout</Text>
            </TouchableOpacity>

        )
    };
}

