// import { gql } from "apollo-boost";
import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
   id
   First_Name
   Last_Name
   goal
   about_me
   email
   moderator
   trophy
   user_avatar
   alias_name
   onboarded
   reaction1
   reaction2
   reaction3
   reaction4
   score
   muted
   discussions {
    id
    body
    anony
    thread_chats
    destiny_type
    category
    admin_tag
    project
    experiment {
      title
      description
      phase
      direction
      market
    }
    reactions {
      type
      user_id
    }
    user {
      First_Name
      Last_Name
      id
      user_avatar
      moderator
      trophy
      alias_name
      alias_avatar
      muted
    }
    last_updated {
      stamp
    }
    created_at
    time_stamp {
      stamp
    }
   }
   daily_reaction
   tags {
     id
     body
   }
}
`


export const EXPERIMENT_FRAGMENT = gql`
  fragment experimentFragment on Experiment {
    id
    title
    description
    hypothesis
    chat_id
    phase
    conversation_id
    type
    data
    conclusion
    direction
    market
    user {
      First_Name
      Last_Name
    }
    moderator {
      First_Name
      Last_Name
    }
}
`


export const AUTH = gql`{
  getAuth {
   ...userFragment
  }
}
${USER_FRAGMENT}
`;

export const CHAT_FRAGMENT = gql`
  fragment chatFragment on Chat {
    id
    body
    anony
    thread_chats
    destiny_type
    category
    admin_tag
    reactions {
      type
      user_id
    }
    user {
      First_Name
      Last_Name
      id
      user_avatar
      moderator
      trophy
      alias_name
      alias_avatar
      muted
    }
    last_updated {
      stamp
    }
    created_at
    time_stamp {
      stamp
    }
    is_boosted
    mod_boosted
    b_id
    b_body
    b_First_Name
    b_Last_Name
    b_user_avatar
    b_alias_avatar
    b_alias_name
    b_anony
    b_thread_chats
    alert
    project
    experiment {
      title
      description
      phase
      direction
      market
    }

}
`


export const GET_CHAT = gql`
query getChat($milestone: Int!, $cursor: Int) {
  getChat(milestone: $milestone, cursor: $cursor) {
   ...chatFragment
  }
}
${CHAT_FRAGMENT}
`;




export const SEND_CHAT = gql`
  mutation sendChat($milestone: Int!, $body: String!, $group: Boolean, $preset: Boolean, $mention: Int, $anony: Boolean, $destiny_type: Int, $category: Int, $interviewee: String, $learn: String) {
    sendChat(milestone: $milestone, body: $body, group: $group, preset: $preset, mention: $mention, anony: $anony, destiny_type: $destiny_type, category: $category, interviewee: $interviewee, learn: $learn) {
      id
    }
  }
`;

export const SUBSCRIBE_CHAT = gql`
subscription chatSent($milestone: Int!) {
  chatSent(milestone: $milestone) {
    ...chatFragment
  }
}
${CHAT_FRAGMENT}
`;


export const USER_PROFILE = gql`
query getProfile($user_id: Int!) {
  getProfile(user_id: $user_id) {
    ...userFragment
  }
}
${USER_FRAGMENT}
`;

export const SUBMIT_REACTION = gql`
  mutation submitReaction($type: Int, $chat_id: Int) {
    submitReaction(type: $type, chat_id: $chat_id) {
      id
    }
  }
`;


export const TAG_LIST = gql`{
  tagList {
    id
    body
  }
}
`;


export const SAVE_PROFILE = gql`
  mutation saveProfile($about_me: String, $goal: String, $onboard: Boolean) {
    saveProfile(about_me: $about_me, goal: $goal, onboard: $onboard) {
      id
    }
  }
`;



export const USER_TAGS = gql`
  mutation userTags($input: tagInput) {
    userTags(input: $input) {
      id
    }
  }
`;


export const SEND_ALIAS = gql`
  mutation saveAlias($alias_name: String) {
    saveAlias(alias_name: $alias_name) {
      id
    }
  }
`;


export const MUTE = gql`
  mutation muteUser ($id: Int) {
    muteUser(id: $id) {
      id
    }
  }
`;




export const PUSH_TOKEN = gql`
  mutation set_pushToken ($push_token: String!) {
    set_pushToken(push_token: $push_token) {
      id
    }
  }
`;




export const NOTIFICATIONS = gql`{
  getNotifications {
   id
   user
   type
   milestone
   post
   body
   read
   is_boosted
   image
   time_stamp {
      stamp
    }

  }
}
`;



export const ONBOARD = gql`
  mutation { 
    onBoard {
      id
    }
  }
`;




export const MARK_READ = gql`
  mutation { 
    markRead {
      id
    }
  }
`;


export const GET_CHALLENGES = gql`{
  getChallenges {
  ...chatFragment
  }
}
${CHAT_FRAGMENT}
`;

export const GET_EXPERIMENTS = gql`{
  getExperiments {
  ...chatFragment
  }
}
${CHAT_FRAGMENT}
`;


export const GET_EXPERIMENT = gql`
query getExperiment($chat_id: Int!) {
  getExperiment(chat_id: $chat_id) {
    ...experimentFragment
  }
}
${EXPERIMENT_FRAGMENT}
`;


export const GET_CHAT_CARD = gql`
query getChatCard($chat_id: Int!) {
  getChatCard(chat_id: $chat_id) {
    ...chatFragment
  }
}
${CHAT_FRAGMENT}
`;


export const GET_STARRED = gql`{
  getStarred {
  ...chatFragment
  starrer {
      First_Name
      Last_Name
      id
      user_avatar
  }
  }
}
${CHAT_FRAGMENT}
`;


export const LEADER_BOARD = gql`{
  leaderBoard {
    ...userFragment
  }
}
${USER_FRAGMENT}
`;


export const LEADER_BOARD_INFO = gql`{
  leaderBoardInfo 
}
`;



export const MY_THREADS = gql`{
  myThreads {
    ...chatFragment
  }
}
${CHAT_FRAGMENT}
`;



export const MOD_BOOST = gql`
  mutation modBoost ($id: Int!) {
    modBoost(id: $id) {
      id
    }
  }
`;














