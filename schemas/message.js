import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    created_at: String!
  }

  type Subscription {
    newChannelMessage(channelId: Int!): Message!
  }

  type Query {
    messages(cursor: String, channelId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
