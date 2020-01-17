import React from 'react';
import { Query } from "react-apollo";
import { TAG_LIST } from "../queries";
import SendUserTags from './SendUserTags';
import { CheckBox } from 'react-native-elements'

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



export default class UserTagger extends React.Component {


    render() {
        return (
            <Query query={TAG_LIST} fetchPolicy="cache-and-network">
                {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in GraphQL Tag Query: ${error}</Text>;
                    return (
                        <SendUserTags data={data} refetch={this.props.refetch} />
                    )
                }}
            </Query>
        )
    }
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