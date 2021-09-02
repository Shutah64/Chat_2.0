import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import User from "./user/User";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddFriends from "./AddFriends/AddFriends";
import "./sideBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 0,
    backgroundColor: "transparent",
  },
  menu: {
    color: "#dfdef6",
    fontSize: "20px",
    transform: "scale(1.5)",
  },
  addIcon: {
    color: "#dfdef6",
    fontSize: "30px",
  },
  searchIcon: {
    fontSize: "30px",
    marginRight: "10px",
  },
  buttonGroup: {
    display: "block",
    width: "324px",
  },
  exitIcon: {
    fontSize: "35px",
    color: "#dfe0ff",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "14.5px 0",
  },
  loading: {
    maxWidth: "100%",
    padding: "20px",
    marginTop: "10px",
  },
  bottomAvatar:{
    marginRight: "12px",
    height: '50px',
    width: '50px'
  }
}));
export default function SideBar({ roomData, context, loading }) {
  const classes = useStyles();
  const { value, setValue } = useContext(context);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modal, setModal] = useState(false);
  const changeRoom = (e, messages, roomId, index, img) => {
    e.preventDefault();
    value["currentRoom"] = roomData.rooms[index];
    value["currentRoomIndex"] = index;
    value["prev"] = value.data;
    value['otherUserImg'] = img
    setValue(value);
    setSelectedRoom(roomId);
    if (messages != null) setValue({ ...value, messages: messages });
  };
  const signOut = (e) => {
    e.preventDefault();
    setValue({ user: {}, rooms: [], authorized: false, messages: [] });
  };
  const getNotifications = (i) => {
    if (value.prev !== null) {
      const notNull =
        value.data != null && value.prev != null && value.data.rooms != null && value.data.rooms[i] && value.prev.rooms[i];
      if (value.prev && notNull) {
        return (
          -value.prev.rooms[i].messages.length +
          value.data.rooms[i].messages.length
        );
      }
    }
  };
  const getImage = (userName) => {
    for(let i = 0; i<value.allUsers.length; i++){
      const el = value.allUsers[i]
        if(el.id == userName){
          return el.img
        }
    }
  };
  return (
    <>
      {value.allUsers ? (
        <AddFriends
          open={modal}
          setOpen={setModal}
          allUsers={value.allUsers}
          currentUserId={value.user.id}
        />
      ) : (
        ""
      )}
      <div style={value.currentRoom ? {left: "-150%"}: {left: "0"}}className="sideBar">
        <div className="sideBar_content">
          <div className="sideBar_top">
            <div className="menu">
              <Typography variant="h2">Chat 2.0</Typography>
              <IconButton>
                <ListIcon className={classes.menu} />
              </IconButton>
            </div>
            <div className="search">
              <SearchIcon className={classes.searchIcon} />
              <input placeholder="Search" />
              <IconButton className={classes.IconButton}>
                <AddIcon
                  className={classes.addIcon}
                  onClick={(e) => setModal(true)}
                />
              </IconButton>
            </div>
          </div>
          <div className="users">
            <List className={classes.root}>
              <ButtonGroup
                aria-label="small outlined button group"
                className={classes.buttonGroup}
              >
                {roomData ? (
                  roomData.rooms.map((room, i) => (
                    <Button
                      className={classes.button}
                      onClick={(e) =>
                        changeRoom(e, room.messages, room.roomId, i, getImage(room.roomName))
                      }
                    >
                      <User
                        user={room}
                        context={context}
                        selected={selectedRoom == room.roomId}
                        notifications={getNotifications(i)}
                        img={getImage(room.roomName)}
                      />
                    </Button>
                  ))
                ) : loading ? (
                  <Typography variant="h5" className={classes.loading}>
                    loading...
                  </Typography>
                ) : (
                  <Typography variant="h5" className={classes.loading}>
                    Add Friends by clicking the + Icon
                  </Typography>
                )}
              </ButtonGroup>
            </List>
          </div>
          <div className="bottom">
            <div className="user_info">
              <Avatar src={value.user.img} className={classes.bottomAvatar}/>
            <Typography variant="h6">{value.user.id}</Typography>
            </div>
            <IconButton>
              <ExitToAppIcon
                className={classes.exitIcon}
                onClick={(e) => signOut(e)}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
