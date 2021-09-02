import React, { useContext, useState, useEffect, useCallback } from "react";
import { SEND_MESSAGE, UPLOAD_FILE } from "../../../graphQL";
import { useMutation } from "@apollo/client";
import Messege from "./message/Messege";
import { Typography } from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { uploader } from "../../../firebase/Firebase";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";
import "./chat.css";
import Emoji from "./emoji/emoji";
const useStyles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
    height: "100%",
    padding: 0,
  },
  icon: {
    fontSize: "35px",
    color: "#c7c6f2",
  },
}));
export default function Chat({ context }) {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const { value, setValue } = useContext(context);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [text, setText] = useState("");
  const handleSend = async (e) => {
    e.preventDefault();
    if (e.keyCode == 13 && value.currentRoom) {
      const currentRoom = value.currentRoom;
      const sender = value.user.id;
      const receiver = currentRoom.roomName;
      const roomId = currentRoom.roomId;
      const isAll = sender && receiver && roomId;
      if (isAll && text.length)
        sendMessage({
          variables: { roomId, sender, receiver, message: text, type: "text" },
        });
      if (file) {
        const type = file.type.split("/")[0];
        const url = await uploader(type, file);
        sendMessage({
          variables: { roomId, sender, receiver, message: url, type },
        });
      }
      setText("");
    }
  };
  return (
    <div className="chat">
      <div className="chat_content">
        <div className="top">
          <div className="back_button">
          <IconButton onClick={()=> setValue({...value, currentRoom:null, messages:[]})}>
            <ArrowBackIcon/>
          </IconButton>
          </div>
          <div className="username">
            <Typography variant="h3">
              {value["currentRoom"] ? value["currentRoom"].roomName : "Select"}
            </Typography>
          </div>
        </div>
        <div className="messeges">
          <div className="messeges_top">
            <Typography variant="h4">Welcome</Typography>
            <Typography>
              {" "}
              <p>s
                Start chating with your friends and feel free to send pictures,
                videos and audios
              </p>{" "}
            </Typography>
          </div>
          <div className="messeges_content">
            {value.messages.length ? (
              value.messages.map((message, i) => (
                <Messege
                  timeStamp={message.timeStamp}
                  messege={message.message}
                  id={message.id}
                  type={message.type}
                  itter={i}
                  img={value.currentRoom.img}
                />
              ))
            ) : (
              <Typography variant={"h5"}>Please select a room</Typography>
            )}
          </div>
        </div>
        <div className="send">
          <input
            placeholder="Type something to send"
            value={text}
            onChange={(e) => {
              e.preventDefault();
              setText(e.target.value);
            }}
            onKeyUp={(e) => handleSend(e)}
          />
          <div className="send_icon_wrapper">
            <div className="icon_wrapper">
              <Button className={classes.button}>
                <input
                  id="uploader"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <AttachmentIcon />
              </Button>
            </div>
            <div className="icon_wrapper">
              <Emoji
                text={text}
                Button={Button}
                classes={classes}
                setText={setText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
