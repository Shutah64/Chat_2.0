import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { useMutation, useSubscription } from "@apollo/client";
import {
  SUBSCRIBE_USERS,
  GET_USERS,
  ROOMS_SUBSCRIPTION,
  REFRESH_ROOMS,
} from "../graphQL";
import SideBar from "./components/sideBar/SideBar";
import Chat from "./components/chat/Chat";
import Top from "./components/top/Top.jsx";
import "./authStack.css";

let initial_call = 0
export default function AuthStack() {
  const { value, setValue } = useContext(context);
  const [getUsers, other] = useMutation(GET_USERS, {variables: {userId: value.user.id}});
  const [getRooms, all] = useMutation(REFRESH_ROOMS);
  const allUserData = useSubscription(SUBSCRIBE_USERS, {
    variables: { userId: value.user.id },
  });
  const { data, loading } = useSubscription(ROOMS_SUBSCRIPTION, {
    variables: { userId: value.user.id },
  });
  const [rooms, setRooms] = useState(data)
  useEffect(() => {
   if(value.user.id){
     getUsers({variables: {userId: value.user.id}})
     getRooms({variables: {userId: value.user.id}})
  }
  }, []);
  useEffect(() => {
  if(allUserData.data) {
    setValue({...value, allUsers: allUserData.data.allUsers})
}
  }, [allUserData.data]);

  useEffect(() => {
    if(all.data){
      setValue({ ...value, data: all.data.getRooms.rooms })
    }
  }, [all.data]);
  useEffect(() => {
    if(data && data != value.data){
      setRooms(data)
      let prev = JSON.parse(JSON.stringify(data))
      const currentIndex = value['currentRoomIndex']
      if(value.prev && currentIndex != undefined){
        let copyPrev = value.prev
        copyPrev.rooms[currentIndex] = data.rooms[currentIndex]
        setValue({ ...value, data: data, prev: copyPrev}) 
      } else if(!initial_call){
        setValue({ ...value, data: data, prev}) 
        initial_call++
      } else {
        setValue({ ...value, data: data})
      }
    }
  }, [data]);
  return (
    <div className="authStack">
      <div class="container">
        <div className="authStack_content">
          <Top />
          <div className="authStack_wrapper">
            <SideBar roomData={rooms} context={context} loading={loading}/>
            <Chat context={context}/>
          </div>
        </div>
      </div>
    </div>
  );
}
