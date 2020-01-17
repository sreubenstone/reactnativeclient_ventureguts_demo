import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Query } from "react-apollo";
import { GET_CHAT_CARD } from '../queries';
import Avatar from './avatar';


export default class ChatCard extends React.Component {

    render() {
        const styler = {
            position: 'absolute',
            right: -2,
            top: 15,
            backgroundColor: 'white',
            borderRadius: 5,
            width: 10,
            height: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: -.5,
            text: 4.0
        }
        return (
            <Query query={GET_CHAT_CARD} variables={{ chat_id: this.props.chat_id }} fetchPolicy="cache-and-network">
                {({ loading, error, data, refetch }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) {
                        console.log('error with chat card', error)
                        return <Text style={{ marginTop: 200 }}>There is error with this </Text>;
                    }

                    return (
                        <View style={styles.card}>
                            <ScrollView>
                                <Text style={styles.text1}>FundaMental Post</Text>
                                <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                    <Text style={styles.text1}>posted by: {(!data.getChatCard.anony) ? `${data.getChatCard.user.First_Name} ${data.getChatCard.user.Last_Name}` : `${data.getChatCard.user.alias_name} (alias)`}</Text>
                                    <Avatar anony={false} nav={this.props.nav} user={data.getChatCard.user} size={20} type={'post'} styler={styler} />
                                </View>
                                <Text style={{ lineHeight: 19 }}>{data.getChatCard.body}</Text>
                            </ScrollView>
                        </View>
                    )
                }}
            </Query>
        )
    };
}

const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#fff',
        fontSize: 11,
        borderRadius: 3,
        width: '20%',
        marginRight: 11,


    },
    core: {
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#fff',
        overflow: "hidden",
        borderRadius: 9,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
        maxHeight: 90
    },

    card1: {
        backgroundColor: '#fff',
        //borderWidth: .5,
        borderRadius: 9,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        //borderColor: '#1D73A1',
        paddingBottom: 12,
    },

    mycard: {
        backgroundColor: '#fff',
        borderColor: '#4C56A6',
        borderRadius: 9,
        borderWidth: .5,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
    },
    main: {
        marginTop: 10,
        // backgroundColor: '#fff'
    },
    container1: {
        // flex: 1,
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
    },
    question: {
        //width: 90,
        alignSelf: 'flex-start',
        //marginTop: 5,
        // borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#f3f1f9',
        shadowColor: '#000',
        // margin: 0,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginTop: 10
        // marginBottom: 0,
        // marginTop: 0
    },

    text1: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#605C9A',
        marginBottom: 8,
        marginRight: 5

    },

    text2: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1389EB',
        marginLeft: 6
    },
})
