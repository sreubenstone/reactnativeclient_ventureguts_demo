import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import ChatControl from '../components/ChatControl';




export default class Thread extends React.Component {
    static navigationOptions = ({ navigation }) => {
        if (navigation.getParam('boost')) {
            return {
                title: 'Boosted Thread',
                headerRight: (
                    <Image source={require('../assets/images/bolt.png')} style={{ width: 21, height: 21, marginRight: 20, marginTop: 0, marginBottom: 2 }} />
                ),
            }
        } else if (!navigation.getParam('experiment')) {
            return {
                title: 'Conversation',
            }
        }

        else {
            return {
                title: 'Experiment',

            }

        }

    }
    render() {
        console.log('route here:', this.props.navigation.state.routeName)
        let challenge = true
        if (this.props.navigation.state.routeName !== 'Thread_Challenges') { challenge = false }
        const milestone = this.props.navigation.getParam('thread')
        const post = this.props.navigation.getParam('post')
        const boost = this.props.navigation.getParam('boost')
        const experiment = this.props.navigation.getParam('experiment')
        const chat_id = this.props.navigation.getParam('chat_id')


        return (
            <ChatControl challenge={challenge} nav={this.props.navigation.navigate} milestone={milestone} post={post} thread={true} boost={boost} experiment={experiment} chat_id={chat_id} />
        )
    };
}

