const bcrypt = require('bcrypt');

const user = new function(){
    this.id = 'user-1';
    this.name = 'rehman';
    this.email = 'email';
    this.password = 'khan';
  }
  
  const saltRounds = 10;
  const hash = bcrypt.hashSync(user.password, saltRounds);
  user['passwordHash'] = hash
  const users = [user,user,user]
  
  
  const messege = new function(){
    this.id = 'Room-2_user-1__user-2_message-1';
    this.timeStamp = new Date();
    this.message = 'when r u coming'
    this.seen = false
    this.reply = ''
  }
  const messages = [messege, messege, messege]
  const room = []
  messages.forEach(messege=>{
    if(messege.id.split('_')[0] == 'Room-2'){
      room.push(messege)
    }
  })

  
  module.exports  = {users, messages}