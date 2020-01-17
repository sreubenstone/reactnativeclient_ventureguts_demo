import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Mutation } from "react-apollo";
import { MUTE } from "../queries";


export default class Mute extends React.Component {

    render() {
        return (
            <Mutation mutation={MUTE}>
                {muteUser => (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4, marginBottom: 4 }}>
                        <TouchableOpacity onPress={async () => {
                            await muteUser({ variables: { id: this.props.data.id } })
                            this.props.refetch()
                        }
                        }>
                            <Text style={{ fontSize: 12, color: '#474747', }}>{(!this.props.data.muted) ? 'Mute' : 'Unmute'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Mutation>
        )
    };
}

