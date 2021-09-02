const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer,PubSub } = require("apollo-server-express");
const {typeDefs} = require("./graphql/schema.js")
const {
  usersPromise,
  messagesPromise,
  roomsPromise,
  addData,
} = require("./fireBase");
const { helper_initCustomFunctions } = require("./helperFunctions");
const { GraphQLUpload } = require("graphql-upload");
const server = async () => {
  const users = await usersPromise.then((u) => u);
  const messages = await messagesPromise.then((u) => u);
  const rooms = await roomsPromise.then((u) => u);
  helper_initCustomFunctions();
  const pubsub = new PubSub();


  const GET_USERS = "GET_USERS";
  const GET_ROOMS = "GET_ROOMS";
  const resolvers = {
    Upload: GraphQLUpload,
    Subscription: {
      user: {
        subscribe: (_, __) => pubsub.asyncIterator(NEW_LOGIN),
      },
      allUsers: {
        resolve: async (_, { userId }, ___) => {
          console.log(users)
          return users;
        },
        subscribe: (_, __, ___) => pubsub.asyncIterator(GET_USERS),
      },
      rooms: {
        resolve: async (_, { userId }) => {
          const modified = JSON.parse(
            JSON.stringify(
              rooms.custom_filterObj(rooms, "users", userId, "", "id")
            )
          );
          if (modified == null) return [];
          else {
            for (let i = 0; i < modified.length; i++) {
              const roomMessages = [];
              let roomName;
              let otherUser;
              let img;
              for (let j = 0; j < modified[i]["users"].length; j++) {
                if (modified[i]["users"][j].id !== userId) {
                  img = modified[i]["users"][j].img;
                  roomName = modified[i]["users"][j].id;
                }
              }
              for (let j = 0; j < messages.length; j++) {
                if (messages[j].roomId == modified[i].roomId) {
                  roomMessages.push(messages[j]);
                }
              }
              modified[i]["messages"] = roomMessages;
              modified[i]["roomName"] = roomName;
              modified[i]["img"] = img;
              console.log(modified[i].users)
            }
            return modified;
          }
        },
        subscribe: (_, __, ___) => {
          return pubsub.asyncIterator(GET_ROOMS);
        },
      },
    },
    Query: {
      users: async () => await usersPromise.then((e) => e),
      messages: async () => await messagesPromise.then((e) => e),
    },
    Mutation: {
      login: async (parent, { inputTaker: { email, password } }, context) => {
        const user = users.custom_checkProp(
          users,
          ["email", "password"],
          [email, password],
          "all"
        );

        if (user != null) return user;
        return { error: "Wrong email or password", status: "error" };
      },
      getUsers: (_, { id }, ___) => {
        pubsub.publish(GET_USERS, {
          users: users,
        });
        return users;
      },
      signUp: async (
        _,
        { inputTaker: { email, password, name, username } },
        ___
      ) => {
        const exists = await users.custom_checkProp(
          users,
          ["email", "password"],
          [email, password],
          "all"
        );
        if (exists == null) {
          const newUser = {
            id: username,
            email,
            password,
            passwordHash: password.custom_encrypt(password),
            name,
            timeStamp: new Date(),
          };
          addData("users", newUser);
          users.push(newUser);
          return newUser;
        } else return { error: "User already exist", status: "error" };
      },

      SendRequest: async (_, { SendRequest: { sender, receiver, token } }) => {
        const exist = rooms.custom_filterObj(
          rooms,
          "users",
          [sender, receiver],
          "all",
          "id"
        );
        const receive = users.custom_filterObj(users, "id", receiver)[0];
        const send = users.custom_filterObj(users, "id", sender)[0];
        if (exist != null)
          return { error: "Request already sent", status: "error" };
        else if (receive != null && receive.id != sender) {
          const newRoom = {
            roomId: (Math.random() * 999).toString(),
            users: [
              { id: send.id, img: send.img ? send.img : "" },
              { id: receive.id, img: receive.img ? receive.img : "" },
            ],
            timeStamp: new Date(),
          };
          addData("rooms", newRoom);
          rooms.push(newRoom);
          pubsub.publish(GET_ROOMS, {
            rooms: rooms,
          });
        }
        return rooms[rooms.length - 1];
      },
      SendMessage: async (
        _,
        { SendMessage: { sender, type, message, receiver, roomId } }
      ) => {
        const id = [roomId, sender, receiver, Math.random() * 999].join("_");
        const newMessage = {
          id,
          message,
          receiver,
          roomId,
          type,
          timeStamp: new Date(),
          seenBy: [],
        };
        addData("messages", newMessage);
        messages.push(newMessage);
        pubsub.publish(GET_ROOMS, {
          rooms: rooms,
        });
        return "updated";
      },
      getRooms: async (_, { getRooms: { userId } }) => {
        let filteredRooms;
        userId;
        if (userId)
          filteredRooms = rooms.custom_filterObj(rooms, "users", userId);
        pubsub.publish(GET_ROOMS, {
          rooms: rooms,
        });
        return { rooms: filteredRooms };
      },
    },
  };
  const initiate = async function () {
    const app = express();
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    const server = new ApolloServer({
      schema,
    });
    await server.start();
    server.applyMiddleware({ app });
    SubscriptionServer.create(
      { schema, execute, subscribe },
      { server: httpServer, path: server.graphqlPath }
    );
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT);
  };
  initiate();
};

server();
