import React from 'react';
import { Query } from "react-apollo";
import Defend from './Defend';
import { NOTIFICATIONS } from "../queries";

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    KeyboardAvoidingView,
    View,
} from 'react-native';



export default class Control extends React.Component {

    render() {
        return (
            <Query query={NOTIFICATIONS} fetchPolicy="network-only">
                {({ loading, error, data, refetch }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) {
                        console.log('notifications error:', error)
                        return <View style={{ marginTop: 100 }}>
                            <Text style={{ fontSize: 14, margin: 15, color: '#317CA4' }}>There is a network connection error. Please close and re open the app. We are working on patching this issue.</Text>
                        </View>
                    }
                    // console.log('reloading notifs...')
                    return (
                        <Defend refetch={refetch} />
                    )
                }}
            </Query>
        )
    }
}





