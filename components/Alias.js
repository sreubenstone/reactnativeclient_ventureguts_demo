import React from 'react';
import { Modal, Keyboard, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Mutation } from "react-apollo";
import { SEND_ALIAS } from "../queries";


export default class Alias extends React.Component {

    state = {
        body: ''
    }

    render() {
        return (
            <Mutation mutation={SEND_ALIAS}>
                {saveAlias => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ marginTop: 100, height: 700, backgroundColor: '#fff' }}>
                            <View style={{ borderWidth: .5, borderRadius: 6, margin: 10, padding: 10, borderColor: '#E7E7E7' }}>
                                <View style={styles.container1}>
                                    <Text style={{ fontSize: 17, color: '#737373', fontWeight: 'bold' }}>...One more thing: Anonymous Posting.</Text>
                                </View>

                                <Text style={{ color: '#737373', marginLeft: 25, marginRight: 15, marginBottom: 9, marginTop: 15 }}>• Enter an alias (a disguised name for yourself) for anonymous posting.</Text>
                                <Text style={{ color: '#737373', marginLeft: 25, marginRight: 15, marginBottom: 19 }}>• When giving brutally honest feedback, sometimes people don't want to expose their identity.</Text>

                                <View style={styles.container1}>
                                    <TextInput
                                        ref={input => { this.textInput = input }} style={{ width: '50%', borderColor: '#737373', borderWidth: .5, backgroundColor: '#E7E7E7', height: 30, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, paddingLeft: 5 }}
                                        multiline={true} onChangeText={(text) => this.setState({ body: text })} value={this.state.body} placeholder=' ...enter your alias'
                                    />
                                </View>

                                <TouchableOpacity onPress={async () => {
                                    await saveAlias({ variables: { alias_name: this.state.body } })
                                    this.props.refetch()

                                }} >
                                    <View style={styles.container1}>
                                        <View style={{ width: '24%', borderWidth: .5, borderColor: '#606B95', backgroundColor: '#606B95', shadowColor: '#000', margin: 1, borderRadius: 17, padding: 10, paddingTop: 4, paddingBottom: 4, marginTop: 10 }}>
                                            <View style={styles.container1}>
                                                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 11 }}>Save</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </Mutation>
        )
    };
}


const styles = StyleSheet.create({

    card: {
        backgroundColor: '#e1dfdf',
        borderColor: '#7B7979',
        // borderWidth: .5,
        borderRadius: 3,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
    },
    main: {
        marginTop: 10,
        // backgroundColor: '#fff'
    },
    container1: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    refresh: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    flexer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

