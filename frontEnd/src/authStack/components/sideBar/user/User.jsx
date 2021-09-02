import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    display: "block",
    width: "100%",
    padding: "14.5px 0",
  },
  text: {
    color: "#f3f2ff",
  },
  text2: {
    color: "#918dc0",
    whiteSpace: 'nowrap',
    maxWidth: "90%",
  overflow: 'hidden',
  textOverflow: 'ellipsis'
  },
  listItem: {
    position: "relative",
  },
  avatar: {
    height: "65px",
    borderRadius: "50%",
    width: "65px",
    marginRight: "18px",
  },
}));

export default function User({user, context, selected, notifications, img}) {
  const classes = useStyles();
  const {value, setValue} = useContext(context)
    useEffect(() => {
      if(selected) setValue({...value, messages: user.messages})
    }, [user])
    const latest =  user.messages[user.messages.length -1] ? user.messages[user.messages.length -1]: undefined
  return (
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar className={classes.avatar} src={img}/>
        </ListItemAvatar>
        <div className="text">
          <ListItemText primary={user.roomName} className={classes.text} />
          <ListItemText
            primary={latest ? latest.type!='text'? 'file': latest.message : ''}
            className={classes.text2}
          />
        </div>
        {notifications>0? <div className="notification">{notifications}</div>: ""}
      </ListItem>
  );
}
