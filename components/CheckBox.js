import React from 'react';
import { Modal, SafeAreaView, ScrollView, Platform, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements'


export default class CheckBoxer extends React.Component {

    render() {
        return (
            (Platform.OS === 'ios') ?
                <CheckBox
                    containerStyle={{ backgroundColor: '#e9e9ef', borderWidth: 0, padding: 0, margin: 0, marginBottom: 1 }}
                    size='15'
                    checked={this.props.anonymous}
                    onPress={() => this.props.anon()}
                    checkedColor="#606B95"
                    title="Post Anonymous"
                    iconRight
                    textStyle={{ fontSize: 9, fontWeight: 'normal', marginBottom: 1.5, color: '#606B95' }}
                />
                :
                <CheckBox
                    containerStyle={{ backgroundColor: '#e9e9ef', borderWidth: 0, padding: 0, margin: 0, marginBottom: 1 }}
                    // size='15'
                    checked={this.props.anonymous}
                    onPress={() => this.props.anon()}
                    checkedColor="#606B95"
                    title="Post Anonymous"
                    iconRight
                    textStyle={{ fontSize: 9, fontWeight: 'normal', marginBottom: 1.5, color: '#606B95' }}
                />

        )
    };
}

