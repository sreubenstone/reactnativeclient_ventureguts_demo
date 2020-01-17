import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';




export default class Avatar extends React.Component {

    render() {
        const { anony, nav, user, size, type, styler, challenge, stop } = this.props

        return (
            (anony) ?
                <Image
                    style={{ width: size, height: size, borderRadius: size / 2, }}
                    source={{ uri: `${user.alias_avatar}` }}
                />
                :
                <TouchableOpacity onPress={() => {
                    if (stop) { return }
                    if (type === 'profile') { return }
                    if (type === 'post') { return }
                    if (challenge) {
                        nav('User', { user_id: user.id })
                    } else {
                        nav('ExpProfile', { user_id: user.id })
                    }

                }
                }>
                    <View>
                        <Image
                            style={{ width: size, height: size, borderRadius: size / 2 }}
                            source={{ uri: `${user.user_avatar}` }}
                        />
                        {(user.moderator || user.trophy) ?
                            <View style={styler}>
                                {(user.trophy) ?
                                    <Text style={{ fontSize: styler.text, color: 'green', fontWeight: 'bold' }}>🏆</Text>
                                    :
                                    <Text style={{ fontSize: (type === 'chat') ? 6.5 : (type === 'profile') ? 10.5 : 6.5, color: 'green', fontWeight: 'bold' }}>M</Text>
                                }
                            </View>
                            : null}
                    </View>
                </TouchableOpacity >
        )
    };
}
