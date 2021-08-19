const { ApolloServer, gql, PubSub } = require("apollo-server");
const {users, messages} = require('./data')
const {helper_initCustomFunctions} = require('./helperFunctions')
helper_initCustomFunctions()
const typeDefs = gql`
  type Query {
    hello(name: String): String
    users: [users]
    messages: [messages]
  }
  type users {
    id: String
    name: String
    email: String
    password: String
    passwordHash: String
    rooms: [String]
    status: String
    error: String
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
    timeStamp: String
    message: String
    send: Boolean
    reply: String
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

  type RegisterResponse {
    errors: [Error!]!
    messages: [messages]
    user: User
    friends: [friends]
    login: users
  }

  input UserInfo {
    id: String
    name: String
    email: String
    password: String
    hash: String
  }
  input SendMessage {
    sender: String
    type: String
    message: String
    receiver: String
    room:String
  }
  input addFriend{
    id: String
    friendId: String
  }
input SendRequest{
  id: String
  name: String
  pending: Boolean
  accepted: Boolean
}
input getRooms{
  userId: String
}
  type Mutation {
    login(inputTaker: UserInfo): users
    signUp(inputTaker: UserInfo): users
    SendMessage(SendMessage: SendMessage): RegisterResponse
    getRooms(getRooms: getRooms): RegisterResponse
    SendRequest(SendRequest: SendRequest): RegisterResponse
    AcceptRequest(AcceptRequest: SendRequest) : RegisterResponse
    # addFriend(addFriend: addFriend): RegisterResponse
  }
type rooms{
  id: String
  user1: String
  user2: String
}
  type Subscription {
    newUser: User!
    messages: [messages]
    rooms: [rooms]
    user: users
  }
`;

const NEW_USER = "NEW_USER";
const NEW_MESSAGES = "NEW_MESSAGES"
const resolvers = {
  Subscription: {
   user: {
     subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_LOGIN)
   },
    messages: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGES)
    },
    rooms: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_ROOMS)
    }
  },
  Query: {
    hello: (parent, { name }) => {
      return `hey ${name}`;
    },
    users: () => users,
    messages: () => messages
  },
  Mutation: {
    login: (parent, {inputTaker: {email, password}}, context) => {
      const user = users.custom_checkProp(users, ['email', 'password'], [email, password], 'all')
      if(user != null && password.custom_checkEncrypt(password, user.passwordHash)) return user
      return {error: "Wrong email or password", status: 'error'};
    },
    signUp: (parent, {inputTaker: {email, password, name}}, context) =>{
      let added;
     const exists = users.custom_checkProp(users, ['email', 'password'], [email, password])
     if(exists == null) added = users.push({id:`user-${users.length}`, email, password, passwordHash: password.custom_encrypt(password), name})
     else return {error: 'User already exist', status: 'error'}
     return users[added - 1]
    },
    SendMessage: (_, { SendMessage: {sender, type, message, receiver, room}}, { pubsub }) => {
      const isAllAvalible = sender && type && message && receiver && room;
      const id = [sender, room, receiver, `message-${messages.length.toString()}`].join("_")
      if(isAllAvalible){
        messages.push({id, message, receiver, room, type, timeStamp: new Date()})
        
        pubsub.publish(NEW_MESSAGES, {
          messages: messages.custom_filterObj(messages, 'room', room)
        });
        return {messages: messages.custom_filterObj(messages, 'room', room)}
      }
      else return {messages: [{message:'error'}]}
  },
  getRooms:(_, {getRooms: {userId}}, {pubsub}) =>{
    if(roomId){

    }
  }
}
}
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub })
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));








