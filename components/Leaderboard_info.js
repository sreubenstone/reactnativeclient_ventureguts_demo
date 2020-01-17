import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Query } from "react-apollo";
import { LEADER_BOARD_INFO } from "../queries";
import CountDown from 'react-native-countdown-component';





export default class Leaderboardinfo extends React.Component {

    render() {
        return (
            <Query query={LEADER_BOARD_INFO} fetchPolicy="cache-and-network">
                {({ loading, error, data, }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in get chat query: ${error}</Text>;
                    const info = JSON.parse(data.leaderBoardInfo)
                    const start = new Date()
                    const date1 = new Date(info.info);
                    const diff = (date1 - start) / 1000
                    return (
                        <View style={styles.card}>
                            <View style={styles.container1}>
                                <Text style={{ marginTop: 4, marginBottom: 15, fontSize: 15, color: '#4C56A6', fontWeight: 'bold' }}>Time Remaining..</Text>
                            </View>
                            <CountDown
                                until={diff}
                                digitStyle={{ backgroundColor: '#4C56A6' }}
                                digitTxtStyle={{ color: '#fff' }}
                                timeLabelStyle={{ color: '#4C56A6' }}
                                size={20}
                            />
                            <View style={styles.container1}>
                                <Text style={{ fontSize: 10, color: '#4C56A6', marginTop: 15 }}>Yearly Leaders are awarded The Gut Moderator Trophy 🏆.</Text>
                            </View>
                            <View style={styles.container1}>
                                <TouchableOpacity onPress={() => this.props.nav('Score')}>
                                    <Text style={{ fontSize: 10, color: '#EE956F', marginTop: 15 }}>See how the Guts Score is calculated.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.container1}>
                                <TouchableOpacity onPress={() => this.props.refetch()}>
                                    <Text style={{ fontSize: 8, color: '#737373', marginTop: 15 }}>refresh leaderboard 🔄</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            </Query>
        )
    }
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
        borderRadius: 9,
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
    }
})


