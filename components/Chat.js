import React from 'react';
import ChatRender from './ChatRender';
import { AUTH, GET_CHALLENGE } from "../queries.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppState, Modal, SafeAreaView, ScrollView, ImageBackground, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, } from 'react-native';
import AddChat from "./AddChat";
import Reply from "./Reply";
import ExperimentCard from '../components/experiments/ExperimentCard';
import ChatCard from '../components/ChatCard';


export default class ChatScreen extends React.Component {


    state = {
        reply: false,
        mention: '',
        mentioned_id: null,
        load_more: false,
    }

    componentDidMount() {
        this.props.subscribeToNewComments();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this.props.refetch()
        }
    };


    reply = (mention, id) => {
        this.setState({ reply: true, mention: mention, mentioned_id: id })
    }

    clear = () => {
        this.setState({ reply: false, mention: '', mentioned_id: null })
    }

    load_more = () => {
        this.setState({ load_more: true }, this.reset())
    }

    reset = () => {
        setTimeout(() => this.setState({ load_more: false }), 10000);
    }


    render() {
        const user = this.props.client.readQuery({ query: AUTH })
        // console.log('EXPERIMENT::', this.props.experiment)
        //console.log('STATE:', this.state.load_more)


        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                    onKeyboardWillShow={() => {
                        this.scrollView.scrollToEnd({ animated: true })
                    }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={82}>
                        {(this.props.thread) ? (!this.props.experiment) ?
                            <ChatCard chat_id={this.props.chat_id} />
                            :
                            <ExperimentCard chat_id={this.props.chat_id} nav={this.props.nav} />
                            : null}
                        <ScrollView ref={ref => this.scrollView = ref}
                            style={{ flex: 1, marginTop: 8, backgroundColor: 'transparent' }} onContentSizeChange={(contentWidth, contentHeight) => {
                                if (this.state.load_more) { return }
                                this.scrollView.scrollToEnd({ animated: true });
                            }}
                        >

                            {(this.props.data.length > 10) ?
                                <TouchableOpacity onPress={() => {
                                    this.props.onLoadMore();
                                    this.load_more();
                                }}>
                                    <View style={styles.container1}>
                                        <View style={{ width: '27%', borderWidth: .5, borderColor: '#606B95', backgroundColor: '#606B95', shadowColor: '#000', borderRadius: 17, padding: 5, marginBottom: 15 }}>
                                            <View style={styles.container1}>
                                                <Text style={{ color: '#fff', fontSize: 11 }}>Load More</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                :
                                null}

                            {this.props.data.map(item => {
                                const time = JSON.parse(item.time_stamp.stamp)
                                const time_object = new Date(time)
                                const time_stamp = time_object.toDateString()
                                const time_stamp_time = time_object.toLocaleTimeString()
                                return <ChatRender time={time} thread={this.props.thread} pause={this.load_more} reply={this.reply} item={item} user={user} time_stamp={time_stamp} time_stamp_time={time_stamp_time} nav={this.props.nav} client={this.props.client} challenge={this.props.challenge} />
                            })}
                            <Text />
                            <Text />
                        </ScrollView>


                        <ImageBackground source={require('../assets/images/back.png')} style={{
                            width: '100%', height: '100%', zIndex: -1, position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }} />

                        <View style={{ justifySelf: 'flex-end' }}>
                            {(!this.state.reply) ?
                                <AddChat nav={this.props.nav} experiment={this.props.experiment} boosted={this.props.boost} milestone={this.props.milestone} group={this.props.group} reply={this.state.reply} mention={this.state.mention} mention_id={this.state.mentioned_id} user={user} />
                                :
                                <Reply milestone={this.props.milestone} group={this.props.group} reply={this.state.reply} mention={this.state.mention} mention_id={this.state.mentioned_id} clear={this.clear} />
                            }
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container1: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    container: {
        flex: 1
    },
    card: {
        backgroundColor: '#fff',
        borderColor: '#7B7979',
        // borderWidth: .5,
        borderRadius: 9,
        //marginRight: 15,
        // marginLeft: 15,
        //marginTop: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
})





