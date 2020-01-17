import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, Modal, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Mutation } from "react-apollo";
import { SEND_CHAT } from "../queries.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Tips from './Tips';



export default class AddChat extends React.Component {


    state = {
        body: this.props.mention,
        modal: false,
        preset: false,
    }

    tip = (tip) => {
        this.setState({ body: tip, preset: true })
    }

    modal = () => {
        this.setState({ modal: !this.state.modal })
    }



    render() {
        const body = this.state.body
        const milestone = this.props.milestone
        return (

            <Mutation mutation={SEND_CHAT}>
                {sendChat => (
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 11, marginBottom: 3 }}>You are replying to {this.props.mention}</Text>
                            <TouchableOpacity onPress={() => this.props.clear()}>
                                <Text style={{ fontSize: 11, marginLeft: 15, marginRight: 5, marginBottom: 3 }}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#fff', borderWidth: .5, borderColor: '#50CDF5' }}>
                            <TextInput
                                ref={input => { this.textInput = input }} style={{ backgroundColor: '#fff', height: 60, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, paddingLeft: 5 }}
                                multiline={true} placeholder='type your chat' onChangeText={(text) => this.setState({ body: text })} value={this.state.body}
                            />
                            <View style={{ marginRight: 7, marginBottom: 4, flexDirection: "row", justifyContent: 'flex-end' }}>
                                <TouchableHighlight onPress={() => {
                                    sendChat({ variables: { mention: this.props.mention_id, milestone: milestone, body: body, group: this.props.group, preset: this.state.preset } });
                                    this.setState({ preset: false })
                                    this.textInput.clear()
                                    this.props.clear()
                                }}>
                                    <Text style={{ color: "#606B95", marginRight: 5, marginBottom: 3 }}>SEND</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                )}
            </Mutation>

        )
    }
}

