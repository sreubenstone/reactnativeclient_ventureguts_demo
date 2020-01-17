import React from 'react';
import { ApolloProvider } from "react-apollo";
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { Query } from "react-apollo";
import { AUTH } from "./queries.js";
import { Platform, StatusBar, StyleSheet, View, Text, } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Login from './components/Login';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import Onboarder from './components/Onboarding';
import Control from './components/Control.js';
import UserTagger from './components/UserTagger';
import Alias from './components/Alias';
import GoalOnboarder from './components/GoalOnboarder';
import Env from './config';




const httpLink = new HttpLink({
  uri: Env.server,
  credentials: 'include'
});


const authLink = setContext(async (_, { headers }) => {
  const toker = await SecureStore.getItemAsync("fbToken");
  //console.log('toker here', toker)
  return {
    headers: {
      ...headers,
      fbtoken: toker ? `${toker}` : ""
    }
  }
});


const wsLink = new WebSocketLink({
  uri: Env.socket,
  options: {
    reconnect: true
  }
});


const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);


const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    onboarded: false,
  };


  // componentDidMount = () => {
  //   this.clearSecureStore();
  // }

  clearSecureStore = async () => {
    const result = await SecureStore.deleteItemAsync("fbToken")
    return null
  }

  done = () => {
    this.setState({ onboarded: true })
  }


  render() {

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={client}>
          <Query query={AUTH} fetchPolicy="network-only">
            {({ loading, error, data, refetch }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) {
                console.log('error:', error)
                return <Text style={{ marginTop: 200 }}>There is error with getAuth: {error}</Text>;
              }
              console.log('OFFICIAL AUTH---', data.getAuth)
              return (
                (data.getAuth.id === null) ? <Login refetch={refetch} /> :
                  (data.getAuth.onboarded === false) ? <Onboarder refetch={refetch} /> :
                    (data.getAuth.goal === null) ? <GoalOnboarder refetch={refetch} /> :
                      (data.getAuth.tags.length === 0) ? <UserTagger refetch={refetch} /> :
                        (!data.getAuth.alias_name) ? <Alias refetch={refetch} /> :
                          <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                            <Control />
                          </View>
              )
            }}
          </Query>
        </ApolloProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        //require('./assets/images/robot-dev.png'),
        //require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
