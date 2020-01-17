import React from 'react';
import { Mutation } from "react-apollo";
import { USER_TAGS } from "../queries";
import { CheckBox } from 'react-native-elements'

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    KeyboardAvoidingView,
    View,
} from 'react-native';



export default class SendUserTags extends React.Component {
    state = {
        tags: [],
    }

    handleClick = (tag_id) => {
        // push that tag id to the state array
        let array = [...this.state.tags];
        // check if item exists in array
        if (!array.includes(tag_id)) {
            // it doesn't existing...adding check mark
            array.push(tag_id);
            this.setState({ tags: array })

        } else {
            // it does exist (removing check mark)
            const updatedArray = array.filter(item => {
                return item !== tag_id
            })
            this.setState({ tags: updatedArray })
        }
    }

    render() {
        // contruct array of objects based on updated state
        let tagsArray = []
        this.state.tags.forEach(item => {
            const entry = {
                id: item
            }
            tagsArray.push(entry)
        })

        const input = {
            tags: tagsArray
        }

        console.log('input:', input)



        return (
            <Mutation mutation={USER_TAGS}>
                {(userTags, { error, loading, data }) => {
                    console.log('error:', error)
                    if (error) return <Text style={{ marginTop: 50 }}>Error in User Tags: {error[0]}</Text>
                    return (
                        <View style={{ backgroundColor: '#fff' }}>
                            <Text style={{ fontSize: 23, color: '#737373', marginTop: 50, marginLeft: 15 }}>My Skills</Text>
                            <Text style={{ fontSize: 16, color: '#737373', marginLeft: 15, marginBottom: 10, marginTop: 5 }}>Select atleast one skill relevant to you..</Text>
                            {
                                this.props.data.tagList.map(item => {
                                    return <View style={styles.card}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ marginLeft: 15, color: '#737373', }}>{item.body}</Text>
                                            <CheckBox
                                                containerStyle={{ backgroundColor: '#e1dfdf', borderWidth: 0, padding: 0, margin: 0 }}
                                                //size="19"
                                                checked={(this.state.tags.includes(item.id)) ? true : false}
                                                onPress={() => this.handleClick(item.id)}
                                                checkedColor="#606B95"
                                            />
                                        </View>
                                    </View>
                                })
                            }

                            <View style={styles.container1}>
                                <View style={{ width: '34%', borderWidth: .5, borderColor: '#606B95', backgroundColor: '#606B95', shadowColor: '#000', margin: 1, borderRadius: 17, padding: 15, paddingTop: 7, paddingBottom: 7, marginTop: 24 }}>
                                    <TouchableOpacity onPress={async () => {
                                        if (input.tags.length === 0) { return }
                                        await userTags({ variables: { input: input } });
                                        this.props.refetch()

                                    }} >
                                        <View style={styles.container1}>
                                            <Text style={{ fontWeight: 'bold', color: '#fff', }}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }}
            </Mutation>
        )


    }
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#e1dfdf',
        borderColor: '#7B7979',
        // borderWidth: .5,
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
        //flex: 1,
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