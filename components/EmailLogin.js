
import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import Styles from '../styles';
import Env from '../config';


export default class EmailLogin extends React.Component {

    state = {
        first: null,
        last: null,
        email: null,
        pw: null,
        error: null,
    }

    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    login = async () => {
        const { refetch } = this.props
        const url = Env.login
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const server = await response.json();
            if (server.status === 'success') {
                // succcessful log in credentials
                const token = server.token
                const result = await SecureStore.setItemAsync("fbToken", token);
                refetch()
            } else {
                this.setState({ error: server.error })
            }


        } catch (error) {
            console.error('Error here:', error);
        }
    }


    render() {
        const { first, last, email, pw, error } = this.state
        const { modal } = this.props
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ margin: 30, marginTop: (Platform.OS === 'ios') ? 100 : 12 }}>
                    <View style={Styles.row_end}>
                        <TouchableOpacity onPress={() => modal()}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>Log in with an email and password.</Text>
                    <TextInput
                        ref={input => { this.textInput = input }} style={{ backgroundColor: '#fff', paddingTop: (Platform.OS === 'ios') ? 2 : 9, borderWidth: .6, height: 60, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, textAlignVertical: "top" }}
                        placeholder='first name' onChangeText={(text) => this.setState({ first: text })} value={first} placeholderTextColor="#D7D7D7"
                    />
                    <TextInput
                        ref={input => { this.textInput = input }} style={{ backgroundColor: '#fff', paddingTop: 2, borderWidth: .6, height: 60, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, textAlignVertical: "top" }}
                        placeholder='last name' onChangeText={(text) => this.setState({ last: text })} value={last} placeholderTextColor="#D7D7D7"
                    />
                    <TextInput
                        ref={input => { this.textInput = input }} style={{ backgroundColor: '#fff', paddingTop: 2, height: 60, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, textAlignVertical: "top" }}
                        placeholder='email' onChangeText={(text) => this.setState({ email: text })} value={email} autoCapitalize={false} placeholderTextColor="#D7D7D7"
                    />
                    <TextInput
                        ref={input => { this.textInput = input }} style={{ backgroundColor: '#fff', paddingTop: 2, height: 60, borderColor: 'gray', borderWidth: 0, borderRadius: 12, marginBottom: 1, textAlignVertical: "top" }}
                        placeholder='password' onChangeText={(text) => this.setState({ pw: text })} value={pw} autoCapitalize={false} placeholderTextColor="#D7D7D7"
                    />
                    <TouchableOpacity onPress={() => {
                        if (!first || !last || !pw || !email) {
                            this.setState({ error: 'First Name, Last Name, or Password can not be blank!' })
                            return
                        }
                        if (!this.validateEmail(email)) {
                            this.setState({ error: 'Invalid email format.' })
                            return
                        }
                        this.login()
                    }}>
                        <View style={Styles.center}>
                            <Text style={{ color: '#605C9A' }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    {error ? <Text style={[Styles.error, { marginTop: 40 }]}>{error}</Text> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}










