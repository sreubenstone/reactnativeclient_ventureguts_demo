import React, { Component } from 'react';
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import EmailLogin from './EmailLogin';
import {
    Image,
    Modal,
    Linking,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    TouchableHighlight
} from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../styles';


export default class Login extends Component {

    state = {
        user: undefined,
        modal: false,
    }

    modal = () => {
        this.setState({ modal: !this.state.modal })
    }

    async fbLogIn() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('518652302261704', {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                console.log('info here:', token)
                const toker = await SecureStore.getItemAsync("fbToken")
                console.log('here:', toker)
                const result = await SecureStore.setItemAsync("fbToken", token);
                console.log('RESULT:', result)

                this.props.refetch();

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    render() {
        return (
            <View>
                <View style={[Styles.center, { marginTop: 170 }]}>
                    <Image source={require('../assets/images/strength.png')} style={{ width: 115, height: 115, marginBottom: 20 }} />
                </View>
                <Text style={styles.header}>Welcome to Venture Guts.</Text>
                <Text style={styles.text}>Please log in to continue {'\n'} to the awesomness.</Text>
                {/* <Text style={styles.text1}>(We use FB purely for account security.)</Text> */}
                <View style={styles.buttons}>
                    <Button
                        onPress={() => {
                            this.fbLogIn()
                        }}
                        title="Facebook"
                        buttonStyle={{
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            width: 150,
                            height: 50,
                            borderColor: "#676767",
                            borderWidth: 0.5,
                            borderRadius: 5,
                        }}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        onPress={() => {
                            this.modal()
                        }}
                        title="Email"
                        buttonStyle={{
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            width: 150,
                            height: 50,
                            borderColor: "#676767",
                            borderWidth: 0.5,
                            borderRadius: 5,
                        }}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <EmailLogin modal={this.modal} refetch={this.props.refetch} />
                </Modal>

            </View>
        );
    }
}

const iconStyles = {
    borderRadius: 10,
    iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20,
        marginTop: 33,
        marginBottom: 0,
    },

    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        margin: 20,
    },
    avatarImage: {
        borderRadius: 50,
        height: 100,
        width: 100,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
    },
    text1: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
        marginTop: 3,
        fontSize: 9
    },

});