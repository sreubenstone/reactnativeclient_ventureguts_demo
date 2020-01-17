import React from 'react';
import { Mutation } from "react-apollo";
import { CREATE_CHALLENGE, GET_CHALLENGES, HELPING } from "../queries";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';




export default class RenderReactions extends React.Component {

    render() {

        //console.log('THREAD:', this.props.thread)

        const type1 = this.props.data.filter(item => {
            return item.type === 1
        })
        const type2 = this.props.data.filter(item => {
            return item.type === 2
        })
        const my_likes_1 = this.props.data.filter(item => {
            return item.user_id === this.props.user.getAuth.id & item.type === 1
        })
        const my_likes_2 = this.props.data.filter(item => {
            return item.user_id === this.props.user.getAuth.id & item.type === 2
        })

        const type3 = this.props.data.filter(item => {
            return item.type === 3
        })
        const type4 = this.props.data.filter(item => {
            return item.type === 4
        })
        const my_likes_3 = this.props.data.filter(item => {
            return item.user_id === this.props.user.getAuth.id & item.type === 3
        })
        const my_likes_4 = this.props.data.filter(item => {
            return item.user_id === this.props.user.getAuth.id & item.type === 4
        })



        const mention = `@${this.props.name}`
        const alias = `@${this.props.alias}`



        // if user has a like we need to know which one and then set a condition on the view

        return (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                {(type1.length !== 0)
                    ? (!my_likes_1.length) ?
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>
                            <Image source={require('../assets/images/exercise.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type1.length}</Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10, borderWidth: .5, borderColor: "#606B95" }}>
                            <Image source={require('../assets/images/exercise.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type1.length}</Text>
                        </View>

                    : null
                }
                {(type2.length !== 0)
                    ? (!my_likes_2.length) ?
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>
                            <Image source={require('../assets/images/positive-vote.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type2.length}</Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10, borderWidth: .5, borderColor: "#606B95" }}>
                            <Image source={require('../assets/images/positive-vote.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type2.length}</Text>
                        </View>
                    : null
                }

                {(type3.length !== 0)
                    ? (!my_likes_3.length) ?
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>
                            <Image source={require('../assets/images/heart.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type3.length}</Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10, borderWidth: .5, borderColor: "#606B95" }}>
                            <Image source={require('../assets/images/heart.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type3.length}</Text>
                        </View>
                    : null
                }

                {(type4.length !== 0)
                    ? (!my_likes_4.length) ?
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>
                            <Image source={require('../assets/images/confused.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type4.length}</Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', padding: 5, borderRadius: 10, borderWidth: .5, borderColor: "#606B95" }}>
                            <Image source={require('../assets/images/confused.png')} style={{ width: 15, height: 15, marginRight: 4 }} />
                            <Text style={{ fontSize: 12, marginTop: 1 }}>{type4.length}</Text>
                        </View>
                    : null
                }

                {(this.props.user.getAuth.id === this.props.commenter_id) ? null :
                    <TouchableOpacity onPress={() => {
                        if (!this.props.anony) {
                            this.props.reply(mention, this.props.commenter_id)
                        } else {
                            this.props.reply(alias, this.props.commenter_id)
                        }
                    }
                    }>
                        <Image source={require('../assets/images/reply.png')} style={{ width: 11, height: 11, marginRight: 4, marginTop: 7.5 }} />
                    </TouchableOpacity>
                }

                {(!this.props.is_thread) ? <TouchableOpacity onPress={() => {
                    if (!this.props.boosted) {
                        this.props.nav('Thread', { thread: this.props.thread, post: this.props.post })
                    } else {
                        this.props.nav('Thread', { thread: this.props.thread, post: this.props.post, boost: true })
                    }
                }
                }>


                    <View>
                        {(this.props.boosted) ? <Image source={require('../assets/images/bolt.png')} style={{ width: 17, height: 17, marginRight: 4, marginTop: 5.0, marginLeft: 10 }} />
                            : <Image source={require('../assets/images/chat.png')} style={{ width: 17, height: 17, marginRight: 4, marginTop: 5.0, marginLeft: 10 }} />
                        }

                        {(this.props.count) ? <View style={{
                            position: 'absolute',
                            right: 0,
                            top: 15,
                            backgroundColor: 'white',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: .5
                        }}>
                            <Text style={{ fontSize: 6.5, color: '#737373', fontWeight: 'bold', color: '#606B95' }}>{this.props.count}</Text>
                        </View> : null}
                    </View>

                </TouchableOpacity> : null}


            </View>
        )
    };
}

