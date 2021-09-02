import { gql } from "@apollo/client";
const ROOMS_SUBSCRIPTION = gql`
  subscription rooms($userId: String) {
    rooms(userId: $userId) {
      roomId
  users{
    id
    img
  }
      roomName
      img
      messages{
        message
        id
        timeStamp
        type
      }
    }
  }
`;
const SEND_MESSAGE = gql`
mutation SendMessage($sender: String, $receiver: String, $type: String, $roomId: String, $message: String){
  SendMessage(SendMessage:{sender: $sender, receiver: $receiver, type: $type, roomId: $roomId, message: $message}) 
}
`
const SUBSCRIBE_MESSAGES = gql`
subscription messages($roomId: String){
  messages(roomId: $roomId){
    message
      }
}
`
const SUBSCRIBE_USERS = gql`
subscription getUsers($userId: String){
  allUsers(userId: $userId){
    id
    name
    img
      }
}
`
const GET_MESSAGES = gql`
mutation getMessages($roomId: String){
  getMessages(roomId:$roomId){
   messages{
    id
    message
    roomId
    timeStamp
  }
  }
}
`
const UPLOAD_FILE = gql`
mutation singleUpload($file: Upload!){
  singleUpload(file: $file){
    url
  }
}
`
const REFRESH_ROOMS = gql`
  mutation getRooms($userId: String) {
    getRooms(getRooms: { userId: $userId }) {
      rooms {
        roomId
        users{
          id
          img
        }
      }
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String) {
    login(inputTaker: { email: $email, password: $password }) {
      id
      email
      password
      name
    }
  }
`;
const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $password: String, $name: String, $username: String) {
    signUp(inputTaker: { name: $name, email: $email, password: $password, username: $username}) {
      id
      name
      email
      password
    }
  }
`;
const ADD_FRIEND = gql`
mutation SendRequest($sender:String, $receiver: String){
  SendRequest(SendRequest:{sender:$sender, receiver:$receiver}){
    roomId
  }
}
`
const GET_USERS = gql`
  mutation getUsers($userId: String) {
  getUsers(userId: $userId){
    img
    name
    id
  }
}
`;
export {
  LOGIN_MUTATION,
  GET_USERS,
  SUBSCRIBE_USERS,
  SIGNUP_MUTATION,
  ROOMS_SUBSCRIPTION,
  REFRESH_ROOMS,
  GET_MESSAGES,
  SEND_MESSAGE,
  SUBSCRIBE_MESSAGES,
  ADD_FRIEND,
  UPLOAD_FILE
};
