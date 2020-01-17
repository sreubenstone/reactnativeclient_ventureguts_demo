import React from 'react';
import { Query } from "react-apollo";
import { GET_CHALLENGE_BOARD_REQUESTS } from "../../queries";
import { ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import TabBarIcon from '../../components/TabBarIcon';

export default class CBRequestsLoader extends React.Component {

    render() {



        return (
            <Query query={GET_CHALLENGE_BOARD_REQUESTS} fetchPolicy="cache-only">
                {({ loading, error, data, refetch, client }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in GraphQL Query</Text>;
                    const badgeCount = this.props.notifications.length + this.props.requests.getRequests.length + data.getChallengeBoardRequests.length
                    const focused = this.props.focused
                    return (
                        <View style={{ width: 24, height: 24, margin: 5 }}>
                            <TabBarIcon
                                focused={focused}
                                name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
                            />
                            {badgeCount > 0 && (
                                <View style={{
                                    // If you're using react-native < 0.57 overflow outside of the parent
                                    // will not work on Android, see https://git.io/fhLJ8
                                    position: 'absolute',
                                    right: -6,
                                    top: -3,
                                    backgroundColor: 'red',
                                    borderRadius: 6,
                                    width: 16.5,
                                    height: 16.5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
                                </View>
                            )}
                        </View>


                    )
                }}
            </Query>
        )
    };
}













