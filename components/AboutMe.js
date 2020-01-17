import React from 'react';
import { Mutation } from "react-apollo";
import { AUTH, SAVE_PROFILE } from "../queries";
import { ScrollView, StyleSheet, Image, View, Text, TextInput, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import Styles from '../styles';


export default class AboutMe extends React.Component {

    state = {
        about_me: this.props.data.getAuth.about_me,
        goal: this.props.data.getAuth.goal,
        confirmation: false,
    }

    confirm = () => {
        this.setState({ confirmation: true }, this.reset())
    }

    reset = () => {
        setTimeout(() => this.setState({ confirmation: false }), 3000);
    }



    render() {
        const { goal } = this.state
        return (
            <Mutation mutation={SAVE_PROFILE}>
                {saveProfile => (
                    <View>
                        <View style={{ flexDirection: 'row', marginBottom: 6, justifyContent: "space-between", marginTop: 5 }}>
                            <Text style={{ marginLeft: 15, color: '#474747', fontWeight: 'bold', marginTop: 10, marginBottom: 0 }}>About Me</Text>
                            {(this.state.confirmation) ? <Text style={{ marginTop: 10.5, marginRight: 15, fontSize: 12, fontWeight: 'bold', color: '#606B95' }}>✓ Saved</Text> : null}
                        </View>
                        <TextInput
                            style={{ color: '#474747', fontSize: 13, backgroundColor: '#fff', height: 40, borderColor: 'gray', borderWidth: 0, borderRadius: 3, margin: 15, marginTop: 4, height: 60, padding: 9, paddingTop: 9, marginBottom: 6, marginLeft: 5 }}
                            multiline={true} placeholder='...keep it to 100 chars' onChangeText={(text) => this.setState({ about_me: text })} value={this.state.about_me}
                        />
                        <Text style={{ marginLeft: 15, color: '#474747', fontWeight: 'bold', marginTop: 17, marginBottom: 8 }}>My Startup Goal</Text>
                        <TextInput
                            style={{ borderColor: '#F55E5E', color: '#474747', fontSize: 13, backgroundColor: '#fff', height: 40, borderColor: 'gray', borderRadius: 3, margin: 15, marginTop: 1, height: 60, padding: 9, paddingTop: 9, marginBottom: 6, marginLeft: 5 }}
                            multiline={true} placeholder='...keep it to 100 chars. Be clear, and to the point.' onChangeText={(text) => this.setState({ goal: text })} value={this.state.goal}
                        />
                        <Text style={[Styles.char_validation, { marginLeft: 15 }]}>{goal ? goal.length : 0} (100 char max)</Text>
                        <TouchableOpacity onPress={async () => {
                            if (this.state.goal.length > 100) { return }
                            saveProfile({ variables: { about_me: this.state.about_me, goal: this.state.goal } })
                            this.confirm()
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


