import React from 'react';
import { Mutation } from "react-apollo";
import { SUBMIT_REACTION, CHAT_FRAGMENT, AUTH } from "../queries";;
import { View, Text, TouchableOpacity, Platform } from 'react-native';



export default class Upvote extends React.Component {

    fragger = () => {
        const user = this.props.client.readQuery({ query: AUTH })
        const old_chat = this.props.client.readFragment({
            id: `Chat:${this.props.chat_id}`,
            fragment: CHAT_FRAGMENT
        })
        const new_chat = old_chat
        const reaction = {
            __typename: "Reaction",
            type: 5,
            user_id: user.getAuth.id
        }
        new_chat.reactions.push(reaction)
        this.props.client.writeFragment({
            id: `Chat:${this.props.chat_id}`,
            fragment: CHAT_FRAGMENT,
            data: new_chat
        })
    }

    render() {
        const user = this.props.client.readQuery({ query: AUTH })
        const { category, reactions } = this.props
        const upvotes = reactions.filter(item => item.type === 5)
        const count = upvotes.length
        let user_reacted = false
        for (const upvote of upvotes) {
            if (upvote.user_id === user.getAuth.id) { user_reacted = true }
        }

        return (
            <Mutation mutation={SUBMIT_REACTION}>
                {submitReaction => (
                    !user_reacted ? <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 7 }}>
                        <TouchableOpacity onPress={() => {
                            this.fragger();
                            submitReaction({ variables: { type: 5, chat_id: this.props.chat_id } });
                        }}>
                            <View style={{ borderWidth: .5, padding: 7, paddingRight: 16, paddingLeft: 16, borderRadius: 3, borderColor: '#e8e8e8' }}>
                                <Text style={{ color: '#505050', textAlign: 'center' }}>▲</Text>
                                <Text style={{ color: '#505050', fontWeight: '700', fontSize: 11, textAlign: 'center' }}>{count}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                        :
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 7 }}>
                            <View style={{ borderWidth: .5, padding: 7, paddingRight: 16, paddingLeft: 16, borderRadius: 3, borderColor: (category === 1) ? '#605C9A' : '#1389EB' }}>
                                <Text style={{ color: (category === 1) ? '#605C9A' : '#1389EB', textAlign: 'center' }}>▲</Text>
                                <Text style={{ color: (category === 1) ? '#605C9A' : '#1389EB', fontWeight: '700', fontSize: 11, textAlign: 'center' }}>{count}</Text>
                            </View>
                        </View>
                )}
            </Mutation>
        )
    }
}