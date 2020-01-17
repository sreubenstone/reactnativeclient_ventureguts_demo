import React from 'react';
import Hyperlink from 'react-native-hyperlink'
import Reactions from './Reactions';
import RenderReactions from './RenderReactions';
import moment from 'moment';
import { Modal, Platform, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Boosted from '../components/Boost/Boosted';
import { tags, categories } from '../tags';
import Avatar from '../components/avatar';
import ExpNotice from '../components/experiments/ExpNotice';




export default class ChatRender extends React.Component {

    state = {
        modal: false,
    }

    longPress = () => {
        this.setState({ modal: !this.state.modal })
    }

    render() {
        const item = this.props.item
        const user = this.props.user
        const time_stamp = this.props.time_stamp
        const time_stamp_time = this.props.time_stamp_time
        const mom = moment(this.props.time)

        // has the logged in user liked this chat in any capacity?
        let user_reacted = false
        for (const reaction of item.reactions) {
            if (reaction.user_id === user.getAuth.id) { user_reacted = true }
        }
        let my_chat = false
        if (item.user.id === user.getAuth.id) { my_chat = true }
        const name = `${item.user.First_Name}_${item.user.Last_Name}`


        const styler = {
            position: 'absolute',
            right: -4,
            top: 19,
            backgroundColor: 'white',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: -.5,
            text: (item.user.trophy) ? 5 : 6.5
        }

        return (
            (item.alert) ? <ExpNotice item={item} nav={this.props.nav} /> :
                (item.mod_boosted) ? <Boosted item={item} nav={this.props.nav} time_stamp={time_stamp} time_stamp_time={time_stamp_time} /> :
                    <View style={{ marginRight: 5 }} >
                        <TouchableWithoutFeedback onLongPress={() => this.longPress()}>
                            <View style={styles.container1}>
                                <View style={{ marginLeft: 7 }}>
                                    <Avatar anony={item.anony} nav={this.props.nav} user={item.user} size={30} type={'chat'} styler={styler} challenge={this.props.challenge} />
                                </View>
                                <View style={{ paddingLeft: 5, marginRight: 9, }}>
                                    {(!item.anony) ? <Text style={{ fontSize: 9 }}>{`${item.user.First_Name} ${item.user.Last_Name}`} {(item.user.muted) ? '(muted)' : null}</Text> : <Text style={{ fontSize: 9 }}>{item.user.alias_name} (alias) {(item.user.muted) ? '(muted)' : null}</Text>}
                                    <Text style={{ fontSize: 7, marginTop: 2.5, marginBottom: 2.5, color: '#828282' }}>{mom.fromNow()}</Text>
                                    <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9' }} >
                                        <View style={{ marginTop: 3, marginRight: 30, borderWidth: .5, borderColor: '#fff', backgroundColor: '#fff', shadowColor: '#000', margin: 0, borderRadius: 10, padding: 9, paddingTop: 7, paddingBottom: 7, paddingLeft: 10.5 }}>
                                            <Text style={{ fontSize: 14.5, marginRight: 23, lineHeight: 22 }}>{item.body}</Text>
                                        </View>
                                    </Hyperlink>
                                    {(item.destiny_type) ?
                                        <View style={(item.destiny_type === 1) ? styles.selected1 : (item.destiny_type === 2) ? styles.selected2 : styles.selected3}>
                                            <Text style={styles.text1}>{tags[item.destiny_type - 1].name} ⊹</Text>
                                        </View>
                                        : null}

                                    {(item.category) ?
                                        <View style={(item.category === 1) ? styles.question : (item.category === 2) ? styles.wisdom : (item.category === 3) ? styles.article : styles.task}>
                                            <Text style={styles.text1}>{categories[item.category - 1].name}</Text>
                                        </View>
                                        : null}

                                    <RenderReactions boosted={item.is_boosted} anony={item.anony} alias={item.user.alias_name} count={item.thread_chats} is_thread={this.props.thread} nav={this.props.nav} thread={item.id} post={item} data={item.reactions} reply={this.props.reply} name={name} commenter_id={item.user.id} user={user} />
                                    <Text style={{ marginTop: 6 }} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        {Platform.OS === 'web' ? null :
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modal}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <Reactions data={item} pause={this.props.pause} modal={this.longPress} chat_id={item.id} client={this.props.client} user={user} user_reacted={user_reacted} my_chat={my_chat} />
                            </Modal>
                        }

                    </View >

        )
    };
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 10
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

    text: {
        fontSize: 8,
        marginLeft: 3
    },
    text1: {
        fontSize: 8,
        marginLeft: 3,
        color: '#fff'
    },
    view: {
        //width: '9%',
        borderWidth: .5,
        borderColor: '#606B95',
        //backgroundColor: '#606B95',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        marginBottom: 4
    },
    selected1: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        borderWidth: .5,
        borderColor: '#606B95',
        backgroundColor: '#606B95',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10
    },
    selected2: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        //borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#7A92DF',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10,
    },
    selected3: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        // borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#7ADFAD',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10
    },
    question: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        // borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#CF745F',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10
    },
    wisdom: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        // borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#33B2FF',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10
    },
    article: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        // borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#797A79',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10
    },
    task: {
        //width: 90,
        alignSelf: 'flex-start',
        marginTop: 5,
        // borderWidth: .5,
        //borderColor: '#606B95',
        backgroundColor: '#5FCCCF',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 2,
        paddingRight: 7,
        marginBottom: 4,
        marginTop: 10
    },
})

