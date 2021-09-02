import { Typography } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { context } from "../../../../App";
import PictureModal from "./PictureModal";
import React, { useContext, useState } from "react";
const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "54px",
    width: "54px",
  },
  avatarHidden: {
    opacity: "0",
    height: "54px",
    width: "54px",
  },
  file: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  message:{
    marginTop: "25px",

  }
}));
export default function Messege({ timeStamp, messege, id, itter, type }) {
  const classes = useStyles();
  const { value } = useContext(context);
  const [openModal, setOpenModal] = useState(false)
  const img = value.otherUserImg 
  const isMe = id.split("_")[1] == value.user.id;
  // const dayDifference = (messages, t, itter) => {
  //   const dayDiffer = 86400000;
  //   if (
  //     messages[itter + 1] &&
  //     messages[itter + 1].timeStamp - timeStamp >= dayDiffer
  //   )
  //     return true;
  //   else return false;
  // };
  const userDifference = (messages) => {
    if (messages[itter - 1] && id) {
      const sender = id.split("_")[2];
      const assume = messages[itter - 1].id.split("_")[2];
      if (assume == sender) return true;
      else return false;
    }
  };
  return (
    <div className="messege">
      {/* {dayDifference(value.messages, timeStamp, itter) ? (
        <Typography variant="span">{new Date(timeStamp).getDate()}</Typography>
      ) : (
        ""
      )} */}
      {isMe ? (
        <div className="messege_content me">
          {!userDifference(value.messages, itter, id) ? (
              <div className="avatar_wrapper">
            <Avatar className={classes.avatar}src={img}>{value.user.id[0]}</Avatar>
              </div>
          ) : (
            <Avatar className={classes.avatarHidden}>H</Avatar>
          )}
          <Typography className={classes.message}>
            {type == "text" ? (
              messege
            ) : type == "image" ? (
              <div className="img_wrapper" onClick={e=> setOpenModal(!openModal)}>
                <PictureModal src={messege} open={openModal} setOpen={setOpenModal}/>
              <img className={classes.file} src={messege} />
              </div>
            ) : type == "audio" ? (
              <audio className={classes.file} src={messege} controls />
            ) : (
              <video className={classes.file} src={messege} controls/>
            )}
          </Typography>
        </div>
      ) : (
        <div className="messege_content other">
          <Typography className={classes.message}>
            {type == "text" ? (
              messege
            ) : type == "image" ? (
              <div className="img_wrapper" onClick={e=> setOpenModal(!openModal)}>
                <PictureModal src={messege} open={openModal} setOpen={setOpenModal}/>
              <img className={classes.file} src={messege} />
              </div>
            ) : type == "audio" ? (
              <audio className={classes.file} src={messege} controls />
            ) : (
              <video className={classes.file} src={messege} controls />
            )}
          </Typography>
          {!userDifference(value.messages, itter, id) ? (
              <div className="avatar_wrapper">
            <Avatar className={classes.avatar}src={img}>{value.currentRoom.roomName[0]}</Avatar>
              </div>
          ) : (
            <Avatar className={classes.avatarHidden}>H</Avatar>
          )}
        </div>
      )}
    </div>
  );
}
