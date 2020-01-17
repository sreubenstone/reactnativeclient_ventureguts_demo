import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MyCard from '../components/Discovery/MyCard';
import MyExpCard from '../components/Discovery/MyExpCard';


export default class MyDiscussions extends React.Component {

    render() {
        const { data, client, nav } = this.props

        return (
            <View style={{ width: '100.8%' }}>
                <Text style={{ marginLeft: 15, color: '#474747', fontWeight: 'bold', marginTop: 13, marginBottom: 4 }}>{(data.length === 0 || data.length === 1) ? 'My Progress' : `My Progress (${data.length - 1} Steps Completed)`}</Text>
                <Text style={{ marginLeft: 15, color: '#474747', fontSize: 11 }}>This is a list of users Problem and Interview steps.</Text>
                {data.map((item, index) => {
                    if (item.category === 1) {
                        return (
                            <TouchableOpacity onPress={() => nav('Thread_Challenges', { thread: item.id, post: item, boost: item.is_boosted, chat_id: item.id })}>
                                <MyCard item={item} client={client} profile={true} index={data.length - index} stopav={true} />
                            </TouchableOpacity>
                        )
                    }
                    if (item.category === 2) {
                        return (
                            <TouchableOpacity onPress={() => nav('exp_thread', { thread: item.id, post: item, boost: item.is_boosted, experiment: true, chat_id: item.id })}>
                                <MyExpCard item={item} client={client} profile={true} index={data.length - index} stopav={true} />
                            </TouchableOpacity>
                        )
                    }
                })}
            </View>
        )
    };
}