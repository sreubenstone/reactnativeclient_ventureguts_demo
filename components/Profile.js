import React from 'react';
import { Query } from "react-apollo";
import { USER_PROFILE, AUTH } from "../queries";
import { ImageBackground, ScrollView, StyleSheet, Image, View, Text, TextInput, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import Mute from './Mute';
import Avatar from '../components/avatar';
import MyDiscussions from '../components/MyDiscussions';
import MyStats from './MyStats';


export default class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {

        const user_id = this.props.navigation.getParam('user_id')


        return (
            <Query query={USER_PROFILE} variables={{ user_id: user_id }} fetchPolicy="cache-and-network">
                {({ loading, error, data, refetch, client }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in GraphQL Query</Text>;
                    const user = client.readQuery({ query: AUTH })
                    const styler = {
                        position: 'absolute',
                        right: 0,
                        top: 75,
                        backgroundColor: 'white',
                        borderRadius: 11,
                        width: 22,
                        height: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 0,
                        text: 10
                    }


                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <ScrollView >
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                                        <Avatar anony={false} nav={this.props.nav} user={data.getProfile} size={100} type={'profile'} styler={styler} />
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                                        <Text style={{ fontSize: 17, color: '#474747', }}>{data.getProfile.First_Name} {data.getProfile.Last_Name}</Text>
                                    </View>
                                    {(data.getProfile.moderator) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4, marginBottom: 4 }}>
                                            <Text style={{ fontSize: 12, color: '#474747', }}>Community Moderator</Text>
                                        </View>
                                        : null}
                                    {(data.getProfile.trophy) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                                            <Text style={{ fontSize: 12, color: '#474747', }}>Weekly Guts Winner</Text>
                                        </View>
                                        : null}

                                    {((user.getAuth.moderator || user.getAuth.trophy) && (!data.getProfile.moderator && !data.getProfile.trophy)) ?
                                        <Mute data={data.getProfile} refetch={refetch} /> : null}

                                    {(user.getAuth.moderator) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4, marginBottom: 4 }}>
                                            <Text style={{ fontSize: 12, color: '#474747', }}>{data.getProfile.email}</Text>
                                        </View>
                                        : null}

                                    <MyStats data={data.getProfile} />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 12.5, marginTop: 37, color: '#474747', marginTop: 16.5 }}>About Me</Text>
                                    <Text style={{ marginLeft: 12.5, marginRight: 15, fontSize: 12, color: '#474747', marginTop: 12.5 }}>{data.getProfile.about_me}</Text>
                                    <Text style={{ fontWeight: 'bold', marginLeft: 12.5, marginTop: 21, color: '#474747', }}>My Startup Goal</Text>
                                    <Text style={{ marginLeft: 12.5, marginRight: 15, fontSize: 12, color: '#474747', marginTop: 12.5 }}>{data.getProfile.goal}</Text>
                                    <Text style={{ fontWeight: 'bold', marginLeft: 12.5, marginTop: 23, color: '#474747', }}>My Skills</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 12.5, marginTop: 3.5, marginBottom: 3 }}>
                                        {
                                            data.getProfile.tags.map(tag => {
                                                return <View style={styles.tag}>
                                                    <View style={styles.container1}>
                                                        <Text style={{ fontSize: 11, color: '#474747', }}>{tag.body}</Text>
                                                    </View>
                                                </View>
                                            })
                                        }
                                    </View>
                                </View>
                                <MyDiscussions data={data.getProfile.discussions} client={client} nav={this.props.navigation.navigate} />
                                <View style={{ marginBottom: 20 }} />
                                <ImageBackground source={require('../assets/images/back.png')} style={{
                                    width: '100%', height: '100%', zIndex: -1, position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0
                                }} />
                            </ScrollView>
                        </View>
                    )
                }}
            </Query>
        )
    };
}

const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#474747',
        fontSize: 11,
        borderRadius: 3,
        width: '30%',
        marginRight: 11,
        marginTop: 7.5,
        paddingTop: 1.5,
        paddingBottom: 1.5,

    },
    core: {
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#fff',
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


