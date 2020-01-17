import React from 'react';
import { Platform, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Query } from "react-apollo";
import { GET_STARRED } from "../queries";
import Cool from '../components/Discovery/Cool';
import CoolThreads from '../components/Discovery/CoolThreads';
import Questions from '../components/Discovery/Questions';
import ShareGuts from '../components/Discovery/ShareGuts';
import DestinyBoosted from '../components/Discovery/DestinyBoosted';


export default class RequestsLoader extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Discover',

        }
    }

    render() {

        return (
            <Query query={GET_STARRED} fetchPolicy="cache-and-network">
                {({ loading, error, data, }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in get starred query: ${error}</Text>;
                    //console.log('Starred:', data)
                    const boosted = data.getStarred.filter(item => {
                        return item.is_boosted
                    })
                    const questions = data.getStarred.filter(item => {
                        return item.category === 1 && !item.is_boosted
                    })
                    const shared_guts = data.getStarred.filter(item => {
                        return item.category === 2 && !item.is_boosted
                    })
                    return (
                        <ScrollView style={{ height: '100%' }}>
                            <DestinyBoosted data={boosted} nav={this.props.navigation.navigate} />
                            <Questions data={questions} nav={this.props.navigation.navigate} />
                            <ShareGuts data={shared_guts} nav={this.props.navigation.navigate} />
                        </ScrollView>
                    )
                }}
            </Query>
        )
    }
}

