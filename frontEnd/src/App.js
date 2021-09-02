import React,{useState, createContext, useMemo} from "react";
import AuthStack from "./authStack/AuthStack";
import UnAuthStack from './unAuthStack/unAuthStack'
import PrivateRoute from './PrivateRoute' 
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'
export const context = createContext()
function App() {
const [value, setValue] = useState({user: {}, rooms: [], authorized: false, messages: []})
const store = useMemo(()=> ({value, setValue}), [value, setValue])
// const local = JSON.parse(window.localStorage.getItem('getUser'))
  return (
    <context.Provider value={store}>
      <Router>
      <div className="App">
        <PrivateRoute exact path="/" component={AuthStack}/>
        <UnAuthStack/>
      </div>
        </Router>
    </context.Provider>
  );
}

export default App;

