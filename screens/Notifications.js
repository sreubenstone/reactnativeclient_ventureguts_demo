import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import NotificationsRender from '../components/NotificationsRender';
import { NOTIFICATIONS, GET_REQUESTS } from "../queries";


import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    KeyboardAvoidingView,
    View,
} from 'react-native';





export default class Notifications extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Notifications'
        };
    }


    render() {

        return (
            <Query query={NOTIFICATIONS} fetchPolicy="cache-only">
                {({ loading, error, data, refetch, client }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in GraphQL Query</Text>;

                    return (
                        <NotificationsRender data={data} navigation={this.props.navigation} client={client} />
                    )
                }}
            </Query>
        )
    }
}




const styles = StyleSheet.create({
    core: {
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#fff',
        borderColor: '#7B7979',
        borderWidth: .5,
        borderRadius: 3,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 19,
        padding: 15
    },
    main: {
        marginTop: 10,
        // backgroundColor: '#fff'
    },
    container1: {
        flex: 1,
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