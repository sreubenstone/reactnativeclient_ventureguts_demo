import { Component } from 'react'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { PUSH_TOKEN } from "../queries.js";



export default class Push extends Component {

    push = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        this.props.client.mutate({ mutation: PUSH_TOKEN, variables: { push_token: token } })

    }

    componentDidMount = () => {
        this.push();
    }


    render() {
        return (
            null
        )
    }
}
