import React from 'react';
import { Platform, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, Modal, TouchableOpacity } from 'react-native';
import { Mutation } from "react-apollo";
import { SEND_CHAT } from "../queries.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Tips from './Tips';
import CheckBox from './CheckBox'





export default class AddChat extends React.Component {

    state = {
        body: '',
        modal: false,
        preset: false,
        anonymous: false,
        selectedTag: null
    }

    addTag = (tag) => {
        if (this.state.selectedTag === tag) {
            this.setState({ selectedTag: null })
        } else {
            this.setState({ selectedTag: tag })
        }
    }

    anon = () => {
        this.setState({ anonymous: !this.state.anonymous })
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
                            <CheckBox anon={this.anon} anonymous={this.state.anonymous} />
                        </View>
                        <View style={{ backgroundColor: '#fff' }}>
                            <TextInput
                                ref={input => { this.textInput = input }} style={{ backgroundColor: '#fff', paddingTop: 2, height: 60, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, paddingLeft: 5, textAlignVertical: "top" }}
                                multiline={true} placeholder={(this.props.experiment) ? 'Be a rockstar and help the entrepreneur structure their interview!' : `Help the entrepreneur with their problem, or help them re-evaluate their startup goal.`} onChangeText={(text) => this.setState({ body: text })} value={this.state.body}
                            />
                            <View style={{ marginRight: 7, marginBottom: 4, flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.boosted) {
                                        this.props.nav('Destiny')
                                    } else {
                                        this.modal()
                                    }
                                }}>
                                </TouchableOpacity>
                                <TouchableHighlight onPress={() => {
                                    if (milestone === 1) { sendChat({ variables: { milestone: milestone, body: body, preset: this.state.preset, anony: this.state.anonymous, category: this.state.selectedTag } }); }
                                    if (milestone !== 1) { sendChat({ variables: { milestone: milestone, body: body, preset: this.state.preset, anony: this.state.anonymous, destiny_type: this.state.selectedTag } }); }
                                    this.setState({ preset: false })
                                    this.textInput.clear()
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

