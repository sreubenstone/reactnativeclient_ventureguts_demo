import React from 'react';
import { Query } from "react-apollo";
import { AUTH } from "../queries";
import { ImageBackground, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AboutMe from './AboutMe';
import Avatar from '../components/avatar';
import MyDiscussions from './MyDiscussions';
import MyStats from './MyStats';
import Logout from './Logout';

export default class MyProfile extends React.Component {
    static navigationOptions = {
        title: 'My Profile',
    };



    render() {
        return (
            <Query query={AUTH} fetchPolicy="cache-only">
                {({ loading, error, data, refetch, client }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in GraphQL Query</Text>;
                    // this.props.navigation.navigate
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
                            <ScrollView>
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                                        <Avatar anony={false} nav={this.props.nav} user={data.getAuth} size={100} type={'profile'} styler={styler} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                                        <Text style={{ fontSize: 17, color: '#474747', }}>{data.getAuth.First_Name} {data.getAuth.Last_Name}</Text>
                                    </View>
                                    {(data.getAuth.moderator) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                                            <Text style={{ fontSize: 12, color: '#474747', }}>Community Moderator</Text>
                                        </View>
                                        : null}
                                    {(data.getAuth.trophy) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                                            <Text style={{ fontSize: 12, color: '#474747', }}>Weekly Guts Winner</Text>
                                        </View>
                                        : null}
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                                        <Text style={{ fontSize: 12, color: '#474747', }}>my alias: {data.getAuth.alias_name}</Text>
                                    </View>
                                    <MyStats data={data.getAuth} />
                                    <AboutMe data={data} />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 13.5, marginTop: 20.5, color: '#474747', }}>My Skills</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 13.5, marginBottom: 7.5, marginTop: 4 }}>
                                        {
                                            data.getAuth.tags.map(tag => {
                                                return <View style={styles.tag}>
                                                    <View style={styles.container1}>
                                                        <Text style={{ fontSize: 11, color: '#474747', }}>{tag.body}</Text>
                                                    </View>
                                                </View>
                                            })
                                        }
                                    </View>
                                </View>
                                <MyDiscussions data={data.getAuth.discussions} client={client} nav={this.props.navigation.navigate} />
                                <Logout client={client} />
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
        paddingTop: 3,
        paddingBottom: 12.5,
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

