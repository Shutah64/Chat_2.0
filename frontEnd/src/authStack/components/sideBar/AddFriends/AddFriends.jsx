import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation} from "@apollo/client";
import {
    ADD_FRIEND
} from "../../../../graphQL";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Typography, Button } from '@material-ui/core';
import "./AddFriend.css"
import { context } from '../../../../App';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
      width: '100%'
  },
  wrapper: {
      display: "flex",
      flexWrap: "nowrap"
  },
  submit: {
      display: "inline-block",
      maxHeight: "55px"
  }
}));

export default function AddFriends({open, setOpen, allUsers, currentUserId}) {
  const classes = useStyles();
  const {value, setValue} = useContext(context)
  const [search, setSearch] = useState('')
  const [sugges, setSugges] = useState([])
  const [SendRequest, _] = useMutation(ADD_FRIEND) 
  const handleClose = () => {
    setOpen(false);
  };
const suggestions = (e) =>{
    console.log(search)
    const suggested = []
    setSearch(e.target.value)
    const word = e.target.value
    for(let i = 0; i<allUsers.length; i++){
        let fullWord = allUsers[i]['id'].split('')
        let passed = []
        for(let j =0; j<word.length; j++){
            let letter = fullWord[j]
            if(letter == word[j]) passed.push(true)
            else passed.push(false)
        }
        if(!passed.includes(false)) suggested.push(allUsers[i]['id'])
    }
    setSugges(suggested)
}
const handleAdd =(e)=>{
e.preventDefault()
if(search) {
  setValue({...value, prev: value.data})
  SendRequest({variables: {sender: currentUserId, receiver: search}})
}
}
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5">Add friend</Typography>
            <Typography variant="h6">Search by unique-Id to get accurate results</Typography>
            <form autocomplete="off">
                <div className={classes.wrapper}>
                    <div className="feild-suggestions">

            <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={search}
          onChange={(e)=>suggestions(e)}
          className={classes.input}
          />
<div id="result">
<ul>
{search.length ? sugges.map((val)=> <li onClick={e=>setSearch(val)}><Typography variant="h6">{val}</Typography></li>): ""}
</ul>
</div>
          </div>
          <Button variant="contained" color="primary" className={classes.submit} onClick={e=> handleAdd(e)}>
              Submit
</Button>
          </div>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}