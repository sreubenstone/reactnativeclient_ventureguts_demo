import React from 'react';
import { Mutation } from "react-apollo";
import { SAVE_PROFILE } from '../queries';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import Styles from '../styles';


export default class GoalOnboarder extends React.Component {

    state = {
        goal: null,
    }


    render() {
        const { goal } = this.state
        return (
            <Mutation mutation={SAVE_PROFILE}>
                {saveProfile => (
                    <View>
                        <Text style={{ marginLeft: 15, color: '#474747', fontWeight: 'bold', marginTop: 60, fontSize: 25, marginBottom: 8 }}>My Startup Goal</Text>
                        <TextInput
                            style={{ borderColor: '#F55E5E', color: '#474747', fontSize: 13, backgroundColor: '#fff', borderColor: 'gray', borderRadius: 3, margin: 15, marginTop: 1, height: 120, padding: 9, paddingTop: 9, marginBottom: 6, marginLeft: 5, textAlignVertical: "top" }}
                            multiline={true} placeholder={`..What is your Startup Goal currently? As in, what is the next attainable goal you see? Keep it to 100 chars. Be clear, and to the point. \n\nIF this is not relevant, write n/a.`} onChangeText={(text) => this.setState({ goal: text })} value={this.state.goal}
                        />
                        <Text style={[Styles.char_validation, { marginLeft: 15 }]}>{goal ? goal.length : 0} (100 char max)</Text>
                        <TouchableOpacity onPress={async () => {
                            if (this.state.goal.length > 100) { return }
                            await saveProfile({ variables: { about_me: this.state.about_me, goal: this.state.goal, onboard: true } })
                            this.props.refetch()
                        }}>
                            <View style={styles.container1}>
                                <View style={Platform.OS === 'web' ? styles.button_web : styles.button_native}>
                                    <Text style={{ fontSize: 13, color: '#fff' }}>save</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                }
            </Mutation>
        )
    };
}

// 

const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#fff',
        fontSize: 11,
        borderRadius: 3,
        width: '20%',
        marginRight: 11,
    },

    button_native: {
        marginTop: 4,
        marginBottom: 9,
        borderWidth: .5,
        // borderColor: '#606B95',
        backgroundColor: '#606B95',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 20,
        paddingTop: 3,
        paddingBottom: 4
    },

    button_web: {
        marginTop: 4,
        marginBottom: 9,
        borderWidth: .5,
        borderColor: '#606B95',
        backgroundColor: '#606B95',
        shadowColor: '#000',
        margin: 1,
        borderRadius: 17,
        padding: 20,
        paddingTop: 3,
        paddingBottom: 4
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


