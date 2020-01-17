import React from 'react';
import { MARK_READ, NOTIFICATIONS, RESPOND, GET_CHALLENGES, HELPING, GET_REQUESTS, MY_PENPALS, GET_CHALLENGE_BOARD_REQUESTS, CHALLENGE_BOARD } from "../queries";
import { NavigationEvents } from "react-navigation";
import moment from 'moment';

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



export default class NotificationsRender extends React.Component {


    render() {
        //console.log('notifs:', this.props.data.getNotifications)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ScrollView style={{ maxWidth: 500 }}>
                    <NavigationEvents
                        onWillFocus={() => {
                            this.props.client.mutate({ mutation: MARK_READ });
                            const data = this.props.client.readQuery({ query: NOTIFICATIONS })
                            let array = data.getNotifications
                            array.forEach((item, index) => {
                                array[index].read = true
                            })
                            // set all notifications in cache to read === true
                            this.props.client.writeQuery({
                                query: NOTIFICATIONS,
                                data: {
                                    getNotifications: array,
                                },
                            });
                        }}
                    />

                    <Text style={{ fontSize: 17, color: '#474747', marginLeft: 15, marginTop: 15 }}>Notifications</Text>
                    <View>
                        {this.props.data.getNotifications.map(item => {
                            const time = JSON.parse(item.time_stamp.stamp)
                            const time_object = new Date(time)
                            const time_stamp = time_object.toDateString()
                            const time_stamp_time = time_object.toLocaleTimeString()
                            const mom = moment(time)
                            console.log('ITEM:', item)
                            return <TouchableOpacity onPress={() => {
                                if (item.type === 1) {
                                    const post = JSON.parse(item.post)
                                    this.props.navigation.navigate('Thread_Challenges', { chat_id: item.milestone, thread: item.milestone, post: post })

                                }
                                if (item.type === 2) {
                                    const post = JSON.parse(item.post)
                                    this.props.navigation.navigate('exp_thread', { thread: item.milestone, post: post, experiment: true, chat_id: item.milestone })
                                }
                                if (item.type === 3) {
                                    const post = JSON.parse(item.post)
                                    this.props.navigation.navigate('Challenges')
                                }
                            }}>

                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 22, height: 22, borderRadius: 11, marginLeft: 15 }}
                                            source={{ uri: `${item.image}` }}
                                        />
                                        <View>
                                            <Text style={{ fontSize: 9, marginLeft: 8, marginBottom: 2.5, color: '#828282', marginTop: 0 }}>{mom.fromNow()}</Text>
                                            <Text style={{ marginLeft: 7.5, marginRight: 45, lineHeight: 19.5 }}>{item.body}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        })}
                        {(Platform !== 'ios') ? <Text style={{ marginBottom: 45 }} /> : <Text style={{ marginBottom: 15 }} />}
                    </View>
                </ScrollView>
            </View>
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