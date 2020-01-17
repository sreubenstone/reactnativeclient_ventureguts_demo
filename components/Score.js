import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Image, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';



export default class Score extends React.Component {

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <ScrollView style={{ maxWidth: 500 }}>
                    <View style={styles.container1}>
                        <Image source={require('../assets/images/guts_droid.png')} style={{ width: 65, height: 65, marginTop: 20 }} />
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 15 }}>Guts Score:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'normal', marginTop: 8, marginLeft: 15, lineHeight: 19 }}>The Yearly Guts Score measures how the community is reacting to your commentary.</Text>

                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', marginTop: 11 }}>
                            <Image source={require('../assets/images/exercise.png')} style={{ width: 30, height: 30 }} />
                            <Text style={{ fontSize: 12, marginTop: 10, marginLeft: 13 }}>This got Guts. (5+ guts)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 11 }}>
                            <Image source={require('../assets/images/positive-vote.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                            <Text style={{ fontSize: 12, marginTop: 10, marginLeft: 13 }}>Great Question. (3+ guts)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 11 }}>
                            <Image source={require('../assets/images/heart.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                            <Text style={{ fontSize: 12, marginTop: 10, marginLeft: 13 }}>Nice Comment. (1+ guts)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 11 }}>
                            <Image source={require('../assets/images/confused.png')} style={{ width: 30, height: 30, marginTop: 0 }} />
                            <Text style={{ fontSize: 12, marginTop: 10, marginLeft: 13 }}>Re-Evaluate That. (-1 guts)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 35 }}>
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 15,
                                width: 30,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 10.5, color: 'green', fontWeight: 'bold' }}>M</Text>
                            </View>
                            <Text style={{ fontSize: 12, marginTop: 10, marginLeft: 13 }}>Moderator: ~2x above</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 15 }} />
                </ScrollView>
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
