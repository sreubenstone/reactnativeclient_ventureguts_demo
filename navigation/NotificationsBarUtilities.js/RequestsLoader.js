import React from 'react';
import { Query } from "react-apollo";
import { GET_REQUESTS } from "../../queries";
import CBRequestsLoader from './CBRequestsLoader';
import { ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';


export default class RequestsLoader extends React.Component {


    render() {


        return (
            <Query query={GET_REQUESTS} fetchPolicy="cache-only">
                {({ loading, error, data, refetch, client }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in GraphQL Query</Text>;
                    return (
                        <CBRequestsLoader requests={data} notifications={this.props.notifications} focused={this.props.focused} />
                    )
                }}
            </Query>
        )
    }
}

