import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, } from 'react-native';
import { Subscription } from "react-apollo";
import { SUBSCRIBE_CHAT } from "../queries.js";

export default class ChatScreen extends React.Component {



    render() {

        return (
            <Subscription subscription={SUBSCRIBE_CHAT} variables={{ snippit_id: 42 }} >
                {({ data, loading, error }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error</Text>;
                    return (
                        null
                    )
                }}
            </Subscription>
        )
    }
}

