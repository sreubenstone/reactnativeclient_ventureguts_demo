import React from 'react';
import { Query } from "react-apollo";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MY_THREADS } from "../queries";
import My from '../components/Discovery/My';



export default class MyThreads extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Threads',

        }
    }
    render() {
        return (
            <Query query={MY_THREADS} fetchPolicy="cache-and-network">
                {({ loading, error, data, client, subscribeToMore, fetchMore, refetch }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>There is error in threads query: ${error}</Text>;
                    // console.log('data:', data)
                    return (
                        <ScrollView style={{ height: '100%' }}>
                            {/* <View style={{ height: '30%' }}>
                                <Feature />
                            </View> */}
                            <View style={styles.container1}>
                                <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 10, }}>Any threads you've participated in will show up here.</Text>
                            </View>
                            <My data={data.myThreads} nav={this.props.navigation.navigate} />
                            <View style={{ marginBottom: 15 }} />
                        </ScrollView>
                    )
                }}
            </Query>

        )
    };
}


const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#fff',
        fontSize: 11,
        borderRadius: 3,
        width: '20%',
        marginRight: 11,


    },
    core: {
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 9,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
    },

    card1: {
        backgroundColor: '#fff',
        //borderWidth: .5,
        borderRadius: 9,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        //borderColor: '#1D73A1',
        paddingBottom: 12,
    },

    mycard: {
        backgroundColor: '#fff',
        borderColor: '#4C56A6',
        borderRadius: 9,
        borderWidth: .5,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
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
    text1: {
        fontSize: 8,
        marginLeft: 3,
        color: '#fff'
    },
})

