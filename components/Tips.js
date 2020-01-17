import React from 'react';
import { Query } from "react-apollo";
import { GET_STARRED } from "../queries.js";
import Hyperlink from 'react-native-hyperlink'
import { ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import milestones from '../milestones';


export default class Tips extends React.Component {

    render() {
        const user = this.props.user
        return (

            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, color: '#737373', marginTop: 45, marginLeft: 18 }}>Getting Started..</Text>
                    <TouchableOpacity onPress={() => this.props.modal()}>
                        <Text style={{ fontSize: 18, color: '#737373', marginTop: 45, marginRight: 15 }}>x</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ marginLeft: 10, marginRight: 15, marginTop: 0, padding: 10, paddingTop: 5 }}>



                    <Text style={{ fontSize: 15, color: '#737373', marginTop: 14, fontWeight: 'bold', marginBottom: 8 }}>Presenting Your Startup 💡️</Text>

                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Present your venture, and a few problems *you think* you're facing in the main chat. Be blunt!</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Enable moderators and community members to help analyze the issues you are facing.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Get feedback where the community *decides you need it most*.</Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• • •</Text>
                    </View>

                    <Text style={{ fontSize: 15, color: '#737373', marginTop: 18, fontWeight: 'bold', marginBottom: 8 }}>Getting Boosted ⚡</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Entrepreneurs that have described their concepts clearly (in a post) can be Boosted by Moderators.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Boosts enable users to share critical feedback specifically about Problem Statement and Product Specs.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Boosts help entrepreneurs power through their Distortion Fields to succeed faster.</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• • •</Text>
                    </View>


                    <Text style={{ fontSize: 15, color: '#737373', marginTop: 18, fontWeight: 'bold', marginBottom: 8 }}>Helping Others 💪</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Provide thoughtful, blunt, hard hitting feedback to others. Do not hold back.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Help motivate users to find their real issues -- and inspire them to think of intense, super bold, Gutsy, ideas, to overcome obstacles.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Use anonymous posts when you feel it's needed.</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• • •</Text>
                    </View>


                    <Text style={{ fontSize: 15, color: '#737373', marginTop: 18, fontWeight: 'bold', marginBottom: 8 }}>Community Etiquette 🗣️</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• The Main Chat allows you to post questions and share guts.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Posts to main chat are threaded (💬), keep conversations organized there.</Text>
                    <Text style={{ color: '#737373', marginBottom: 5, lineHeight: 19.5 }}>• Hold down on a comment to react to it.</Text>




                </View>


                <View style={{ marginBottom: 30 }} />

            </ScrollView >

        )
    }
}


const styles = StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 10
    },
    container: {
        flex: 1
    },
    card: {
        backgroundColor: '#7B7979',
        borderColor: '#7B7979',
        // borderWidth: .5,
        borderRadius: 9,
        //marginRight: 15,
        // marginLeft: 15,
        //marginTop: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
})

