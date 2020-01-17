import React from 'react';
import styles from '../styles';
import { Image, View, Text, } from 'react-native';



export default class MyStats extends React.Component {

    render() {
        const { data } = this.props
        return (
            <View style={[styles.space_evenly, { marginTop: 15, marginBottom: 10 }]}>
                <View style={[styles.column_center]}>
                    <Text style={styles.stat_digit_text}>{data.reaction1 ? data.reaction1 : 0}</Text>
                    <Text style={styles.stat_title_text}>Got Guts</Text>
                    <Image source={require('../assets/images/exercise.png')} style={styles.stat_graphics} />
                </View>

                <View style={[styles.column_center]}>
                    <Text style={styles.stat_digit_text}>{data.reaction2 ? data.reaction2 : 0}</Text>
                    <Text style={styles.stat_title_text}>Great Question</Text>
                    <Image source={require('../assets/images/positive-vote.png')} style={styles.stat_graphics} />
                </View>

                <View style={styles.column_center}>
                    <Text style={styles.stat_digit_text}>{data.reaction3 ? data.reaction3 : 0}</Text>
                    <Text style={styles.stat_title_text}>Nice Comment</Text>
                    <Image source={require('../assets/images/heart.png')} style={styles.stat_graphics} />
                </View>

                <View style={styles.column_center}>
                    <Text style={styles.stat_digit_text}>{data.reaction4 ? data.reaction4 : 0}</Text>
                    <Text style={styles.stat_title_text}>Re-Evaluate That</Text>
                    <Image source={require('../assets/images/confused.png')} style={styles.stat_graphics} />
                </View>

            </View>

        )
    };
}

