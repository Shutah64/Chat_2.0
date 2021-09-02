import React, {useState} from 'react'
import Picker from 'emoji-picker-react';
import Button from "@material-ui/core/Button";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

function Emoji({text, classes, setText}) {
    const [emojiOpen, setEmojiOpen] = useState(false)
    return (
        <>
            <Button className={classes.button}  onClick={(e)=>{
                  if(emojiOpen) setEmojiOpen(false)
                  else setEmojiOpen(true)
                }}>
                <InsertEmoticonIcon/>
            </Button>
            <div style={emojiOpen ? {display:'block'} :{display:'none'}} className="emoji_wrapper">
            <Picker onEmojiClick={(event, emojiObject)=> setText(text+emojiObject.emoji)} />
            </div>
        </>
    )
}

export default Emoji
