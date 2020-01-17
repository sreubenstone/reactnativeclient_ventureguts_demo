import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Hyperlink from 'react-native-hyperlink'



export default class Credo extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Guts Credo',

        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ maxWidth: 500 }}>
                    <View style={styles.container1}>
                        <Image source={require('../assets/images/guts_droid.png')} style={{ width: 65, height: 65, marginTop: 20 }} />
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 15 }}>guts [guhts] • noun:</Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 15, marginRight: 15 }}>The courage to test one's startup ideas.</Text>


                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 15 }}>Guts Credo:</Text>
                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                        <Text style={{ marginRight: 15, fontSize: 15, }}>• You have to go above and beyond the call of duty to succeed as an entrepreneur. And sometimes it takes others to help us get there.</Text>
                        <Text style={{ marginTop: 15, marginRight: 15, fontSize: 15, }}>• It takes serious Guts to overcome entrepreneurial obstacles; this is how nature filters out entrepreneurs from wantrepreneurs.</Text>
                        <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9' }} >
                            <Text style={{ marginTop: 15, marginRight: 15, fontSize: 15 }}>• Having Guts, isn't just about physical action. It's about being strong enough to break down your own mental barriers, test your ideas, and act on real market data.</Text>
                        </Hyperlink>
                    </View>
                </View>
            </View>

        )
    };
}

const styles = StyleSheet.create({
    container1: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flex: 1
    },
    card: {
        backgroundColor: '#fff',
        borderColor: '#7B7979',
        // borderWidth: .5,
        borderRadius: 9,
        //marginRight: 15,
        // marginLeft: 15,
        //marginTop: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
})
