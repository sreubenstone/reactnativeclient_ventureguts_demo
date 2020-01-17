import React from 'react';
import { Mutation } from "react-apollo";
import { SUBMIT_REACTION, CHAT_FRAGMENT, AUTH } from "../queries";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import ModBoost from './Boost/ModBoost';


export default class Reactions extends React.Component {

    state = {
        count: this.props.user.getAuth.daily_reaction
    }

    fragger = (type) => {
        const old_chat = this.props.client.readFragment({
            id: `Chat:${this.props.chat_id}`,
            fragment: CHAT_FRAGMENT
        })
        const new_chat = old_chat
        const reaction = {
            __typename: "Reaction",
            type: type,
            user_id: this.props.user.getAuth.id
        }
        new_chat.reactions.push(reaction)
        this.props.client.writeFragment({
            id: `Chat:${this.props.chat_id}`,
            fragment: CHAT_FRAGMENT,
            data: new_chat
        })
    }

    updateDaily = () => {
        const auth = this.props.client.readQuery({ query: AUTH })
        //console.log('USERA:', auth.getAuth)
        let user = auth.getAuth
        user.daily_reaction = 1
        //console.log('USERB', user)
        this.props.client.writeQuery({
            query: AUTH,
            data: {
                getAuth: user,
            },
        });
    }

    refresh_count = async () => {
        const correct_count = await this.props.client.query({ query: AUTH, fetchPolicy: "network-only" })
        //console.log('dog here:', correct_count)
        const auth = this.props.client.readQuery({ query: AUTH })
        let user = auth.getAuth
        user.daily_reaction = correct_count.data.getAuth.daily_reaction
        // console.log('userrrr:', user)
        this.props.client.writeQuery({
            query: AUTH,
            data: {
                getAuth: user,
            },
        });

        if (!correct_count.data.getAuth.daily_reaction) {
            this.setState({ count: 0 })
        }


    }


    render() {

        return (
            <View>
                {(this.props.my_chat) ?
                    <View style={{ marginLeft: 20, marginTop: 50 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 20, color: '#737373', marginLeft: 0 }}>React to this comment</Text>
                            <TouchableOpacity onPress={() => this.props.modal()}>
                                <Text style={{ marginTop: 3, color: '#737373', marginRight: 20, fontSize: 15 }}>x</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#737373', marginTop: 5 }}>(You can not react to your own comment)</Text>
                        <View style={{ marginTop: 25 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/images/exercise.png')} style={{ width: 30, height: 30 }} />
                                <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>This got Guts.</Text>
                            </View>
                            <View style={{ marginTop: 35 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/images/positive-vote.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Great Question.</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 35 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/images/heart.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Nice Comment</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 35 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/images/confused.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Re-Evaluate That.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    (!this.props.user_reacted) ?
                        <Mutation mutation={SUBMIT_REACTION}>
                            {submitReaction => (
                                <View style={{ marginLeft: 20, marginTop: 50 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text style={{ fontSize: 20, color: '#737373', marginLeft: 0 }}>React to this comment</Text>
                                        <TouchableOpacity onPress={() => this.props.modal()}>
                                            <Text style={{ marginTop: 3, color: '#737373', marginRight: 20, fontSize: 15 }}>x</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 25 }}>
                                        {(!this.state.count) ?
                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    submitReaction({ variables: { type: 1, chat_id: this.props.chat_id } });
                                                    this.props.pause();
                                                    this.fragger(1);
                                                    this.updateDaily();
                                                    this.props.modal();
                                                }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image source={require('../assets/images/exercise.png')} style={{ width: 30, height: 30 }} />
                                                        <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>This got Guts.</Text>
                                                    </View>
                                                    <Text style={{ color: '#737373', fontSize: 10, marginTop: 10, marginLeft: 0, marginRight: 15 }}>For the gutsiest, ballsiest advice. (can do 1x per day)</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Image source={require('../assets/images/exercise.png')} style={{ width: 30, height: 30 }} />
                                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13, }}>This got Guts. (You can only do 1x per day).</Text>
                                                </View>

                                                <TouchableOpacity onPress={() => this.refresh_count()}>
                                                    <Text style={{ fontSize: 9, color: '#4C56A6', marginLeft: 46 }}>New day and still seeing this? Click to refresh.</Text>
                                                </TouchableOpacity>

                                            </View>
                                        }

                                        <View style={{ marginTop: 35 }}>
                                            <TouchableOpacity onPress={() => {
                                                submitReaction({ variables: { type: 2, chat_id: this.props.chat_id } });
                                                this.props.pause()
                                                this.fragger(2)
                                                this.props.modal();
                                            }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require('../assets/images/positive-vote.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Great Question.</Text>
                                                </View>
                                                <Text style={{ color: '#737373', fontSize: 10, marginTop: 10, marginLeft: 0, marginRight: 15 }}>For insightful questions that deserve credit.</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginTop: 35 }}>
                                            <TouchableOpacity onPress={() => {
                                                submitReaction({ variables: { type: 3, chat_id: this.props.chat_id } });
                                                this.props.pause()
                                                this.fragger(3)
                                                this.props.modal();
                                            }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require('../assets/images/heart.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Nice Comment.</Text>
                                                </View>
                                                <Text style={{ color: '#737373', fontSize: 10, marginTop: 10, marginLeft: 0, marginRight: 15 }}>For insightful comments.</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginTop: 35 }}>
                                            <TouchableOpacity onPress={() => {
                                                submitReaction({ variables: { type: 4, chat_id: this.props.chat_id } });
                                                this.props.pause()
                                                this.fragger(4)
                                                this.props.modal();
                                            }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require('../assets/images/confused.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Re-Evaluate That.</Text>
                                                </View>
                                                <Text style={{ color: '#737373', fontSize: 10, marginTop: 10, marginLeft: 0, marginRight: 15 }}>Warn a user to re-evaluate their thought process. (This is always anonymous!).</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </Mutation>
                        :
                        <View style={{ marginLeft: 20, marginTop: 50 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={{ fontSize: 20, color: '#737373', marginLeft: 0 }}>React to this comment</Text>
                                <TouchableOpacity onPress={() => this.props.modal()}>
                                    <Text style={{ marginTop: 3, color: '#737373', marginRight: 20, fontSize: 15 }}>x</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#737373', marginTop: 5 }}>(You have already reacted to this comment)</Text>
                            <View style={{ marginTop: 25 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/images/exercise.png')} style={{ width: 30, height: 30 }} />
                                    <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>This got Guts.</Text>
                                </View>
                                <View style={{ marginTop: 35 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../assets/images/positive-vote.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                        <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Great Question.</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 35 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../assets/images/heart.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                        <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Nice Comment</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 35 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../assets/images/confused.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                                        <Text style={{ color: '#737373', fontSize: 12, marginTop: 10, marginLeft: 13 }}>Re-Evaluate That.</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                }


                {(this.props.user.getAuth.moderator || this.props.user.getAuth.trophy) ?
                    (!this.props.data.is_boosted) ?
                        <ModBoost chat_id={this.props.chat_id} modal={this.props.modal} /> : null : null

                }



                {(this.props.user.getAuth.moderator) ? <Text style={{ marginTop: 10, fontSize: 8, marginLeft: 45 }}>CHAT ID: {this.props.chat_id} </Text> : null}



            </View>
        )
    };
}