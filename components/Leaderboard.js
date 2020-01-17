import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Query } from "react-apollo";
import { LEADER_BOARD, AUTH } from "../queries";
import LeaderBoardInfo from './Leaderboard_info';
import Avatar from '../components/avatar';


export default class Leaderboard extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Guts Leaders',
        }
    }
    render() {
        return (
            <Query query={LEADER_BOARD} fetchPolicy="cache-and-network">
                {({ loading, error, data, refetch, client }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in get chat query: ${error}</Text>;
                    console.log('LEADERS', data)


                    const user = client.readQuery({ query: AUTH })


                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <ScrollView style={{ maxWidth: 500 }}>
                                <LeaderBoardInfo nav={this.props.navigation.navigate} refetch={refetch} />
                                {data.leaderBoard.map((item, index) => {
                                    const styler = {
                                        position: 'absolute',
                                        right: -1,
                                        top: 37,
                                        backgroundColor: 'white',
                                        borderRadius: 6,
                                        width: 12,
                                        height: 12,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: -.5,
                                        text: 6.5
                                    }
                                    return <TouchableOpacity onPress={() => this.props.navigation.navigate('User', { user_id: item.id })}>
                                        <View style={(item.id === user.getAuth.id) ? styles.mycard : styles.card}>
                                            <View style={styles.container1}>
                                                <Text style={{ color: '#494848', fontSize: 17, fontWeight: 'bold', marginLeft: 14, marginTop: 13 }}>{index + 1}</Text>

                                                <View style={{ marginLeft: 20 }}>
                                                    <Avatar anony={false} nav={this.props.navigation.navigate} user={item} size={50} type={'card'} styler={styler} />
                                                </View>



                                                <Text style={{ width: 150, color: '#494848', fontSize: 12, fontWeight: 'bold', marginLeft: 14, marginTop: 14 }}>{item.First_Name} {item.Last_Name}</Text>
                                                <Text style={{ color: '#494848', fontSize: 12, marginLeft: 14, marginTop: 14 }}>{item.score} Guts</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                })}
                                <View style={{ marginBottom: 20 }} />
                            </ScrollView>
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
    }
})


