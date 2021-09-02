const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query {
      hello(name: String): String
      users: [users]
      messages: [messages]
    }
    type users {
      id: String
      name: String
      username: String
      email: String
      password: String
      passwordHash: String
      rooms: [String]
      status: String
      error: String
      img: String
    }
    type friends {
      room: String
      id: String
      name: String
      pending: Boolean
      accepted: Boolean
    }
    type messages {
      id: String
      roomId: String
      reciever: String
      timeStamp: String
      message: String
      send: Boolean
      reply: String
      seenBy: [String]
      type: String
    }
    type shutah {
      username: String
      id: Int
      data: [User]
    }
    type User {
      id: ID!
      username: String
      firstLetterOfUsername: String
    }

    type Error {
      field: String!
      message: String!
    }
    type request {
      token: String
      pending: Boolean
      accepted: Boolean
      sender: String
      receiver: String
    }
    type accepted {
      token: String
      pending: Boolean
      accepted: Boolean
      sender: String
      receiver: String
    }
    type RegisterResponse {
      errors: [Error!]!
      messages: [messages]
      user: User
      friends: [friends]
      login: users
      rooms: [rooms]
      request: messages
      accepted: [accepted]
    }

    input UserInfo {
      id: String
      name: String
      username: String
      email: String
      password: String
      hash: String
    }
    input SendMessage {
      sender: String
      type: String
      message: String
      receiver: String
      roomId: String
    }
    input addFriend {
      id: String
      username: String
      friendId: String
    }
    input SendRequest {
      sender: String
      receiver: String
      token: String
    }
    input getRooms {
      userId: String
    }
    scalar Upload
    type File {
      url: String
    }
    type Mutation {
      singleUpload(file: Upload!): File
      seen(roomId: String): String
      getUsers(userId: String): [users]
      login(inputTaker: UserInfo): users
      signUp(inputTaker: UserInfo): users
      SendMessage(SendMessage: SendMessage): String
      getRooms(getRooms: getRooms): RegisterResponse
      getMessages(roomId: String): RegisterResponse
      SendRequest(SendRequest: SendRequest): rooms
      AcceptRequest(AcceptRequest: SendRequest): RegisterResponse
      # addFriend(addFriend: addFriend): RegisterResponse
    }
    type rooms {
      roomId: String
      users: [users]
      roomName: String
      otherUser: String
      messages: [messages]
      newMessages: Int
      seen: [String]
      img: String
    }
    type Subscription {
      newUser: User!
      allUsers(userId: String): [users]
      rooms(userId: String): [rooms]
      user: users
    }
  `;
module.exports = {typeDefs}