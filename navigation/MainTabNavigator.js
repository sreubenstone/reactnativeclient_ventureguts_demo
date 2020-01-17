import React from 'react';
import { Notifications } from 'expo';
import { Query } from "react-apollo";
import { NOTIFICATIONS } from "../queries";
import { ScrollView, StyleSheet, Image, Platform, View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import NotificationScreen from '../screens/Notifications';
import Main from '../screens/MainChat';
import MyThreads from '../screens/MyThreads';
import ChatControl from '../components/ChatControl';
import Profile from '../components/MyProfile';
import UserProfile from '../components/Profile';
import Credo from '../components/Credo';
import Leaderboard from '../components/Leaderboard';
import Thread from '../components/Thread';
import Score from '../components/Score';
import Discover from '../screens/Discover';
import Destiny from '../components/Boost/Destiny';
import Challenges from '../screens/Challenges';
import Experiments from '../screens/Experiments';
import TutContainer from '../components/experiments/Tutorials/TutContainer';






const ExperimentStack = createStackNavigator(
  {
    Experiments: Experiments,
    exp_thread: Thread,
    smoke: TutContainer,
    ExpProfile: UserProfile

  },
  {
    initialRouteName: 'Experiments',
  }
);

ExperimentStack.navigationOptions = {
  tabBarLabel: 'Interviews',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flask' : 'md-globe'}
    />
  ),
};




const MainChatStack = createStackNavigator(
  {
    Main: Main,
    Profile: UserProfile,
    Credo: Credo,
    Thread: Thread,
    Leaderboard: Leaderboard,
    Score: Score,
    Destiny: Destiny
  },
  {
    initialRouteName: 'Main',
  }
);

MainChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-analytics' : 'md-globe'}
    />
  ),
};



const NotificationsStack = createStackNavigator({
  Notifications: NotificationScreen,
  NotificationProfile: UserProfile
},
  {
    initialRouteName: 'Notifications',
  });


NotificationsStack.navigationOptions = {
  // CUSTOMIZE TabBarIcon and connect it to Apollo Local State
  tabBarLabel: 'My Alerts',
  tabBarIcon: ({ focused }) => (
    <Query query={NOTIFICATIONS} fetchPolicy="cache-only">
      {({ loading, error, data, refetch, client }) => {
        if (loading) return <Text>Loading...</Text>;
        if (error) return <Text>There is error in GraphQL Query</Text>;
        const filter = data.getNotifications.filter(item => {
          return !item.read
        })

        const badgeCount = filter.length

        { Platform.OS === 'ios' && Notifications.setBadgeNumberAsync(badgeCount) }


        return (
          <View style={{ width: 24, height: 24, margin: 5 }}>
            <TabBarIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
            />
            {badgeCount > 0 && (
              <View style={{
                // If you're using react-native < 0.57 overflow outside of the parent
                // will not work on Android, see https://git.io/fhLJ8
                position: 'absolute',
                right: -6,
                top: -3,
                backgroundColor: 'red',
                borderRadius: 6,
                width: 16.5,
                height: 16.5,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
              </View>
            )}
          </View>
        )
      }}
    </Query>
  )
};



const ProfileStack = createStackNavigator(
  {
    Profile: Profile
  },
  {
    initialRouteName: 'Profile',
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  ),
};



const ThreadStack = createStackNavigator(
  {
    Threads: MyThreads,
    Thread_View: Thread,
    ThreadProfile: UserProfile
  },
  {
    initialRouteName: 'Threads',
  }
);

ThreadStack.navigationOptions = {
  tabBarLabel: 'Experiments',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flask' : 'md-chatbubbles'}
    />
  ),
}


const DiscoverStack = createStackNavigator(
  {
    Discover: Discover,
    Thread_Discover: Thread,
    DiscoverProfile: UserProfile,
    Destiny_Discover: Destiny
  },
  {
    initialRouteName: 'Discover',
  }
);

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Discover',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
}


const ChallengeStack = createStackNavigator(
  {
    Challenges: Challenges,
    Thread_Challenges: Thread,
    Credo: Credo,
    Leaderboard: Leaderboard,
    Score: Score,
    User: UserProfile,

  },
  {
    initialRouteName: 'Challenges',
  }
);

ChallengeStack.navigationOptions = {
  tabBarLabel: 'FundaMentals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pulse' : 'md-pulse'}
    />
  ),
}




export default createBottomTabNavigator({
  ChallengeStack,
  ExperimentStack,
  // DiscoverStack,
  // NetworkStack,
  // ThreadStack,
  NotificationsStack,
  ProfileStack,
  // MainChatStack,
});
