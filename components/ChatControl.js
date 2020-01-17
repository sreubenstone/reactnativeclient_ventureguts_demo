import React from 'react';
import { Query } from "react-apollo";
import { ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { GET_CHAT } from "../queries.js";
import { SUBSCRIBE_CHAT } from "../queries.js";
import Chat from "./Chat";

export default class ChatControl extends React.Component {



    render() {

        return (
            <Query query={GET_CHAT} variables={{ milestone: this.props.milestone }} fetchPolicy="network-only">
                {({ loading, error, data, client, subscribeToMore, fetchMore, refetch }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in get chat query: ${error}</Text>;
                    //console.log('DATA HERE:', data)
                    return (
                        <Chat data={data.getChat} challenge={this.props.challenge} boost={this.props.boost} refetch={refetch} client={client} nav={this.props.nav} milestone={this.props.milestone} thread={this.props.thread} post={this.props.post} experiment={this.props.experiment} chat_id={this.props.chat_id}
                            subscribeToNewComments={() =>
                                subscribeToMore({
                                    document: SUBSCRIBE_CHAT,
                                    variables: { milestone: this.props.milestone },
                                    updateQuery: (prev, { subscriptionData }) => {
                                        if (!subscriptionData.data) return prev;
                                        const chatItem = subscriptionData.data.chatSent;
                                        return Object.assign({}, prev, {
                                            getChat: [...prev.getChat, chatItem]
                                        });
                                    }
                                })
                            }

                            onLoadMore={() =>
                                fetchMore({
                                    variables: {
                                        cursor: data.getChat[0].id
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                        if (!fetchMoreResult) return prev;
                                        return Object.assign({}, prev, {
                                            getChat: [...fetchMoreResult.getChat, ...prev.getChat,]
                                        });
                                    }
                                })
                            }


                        />
                    )
                }}
            </Query>
        )
    }
}

