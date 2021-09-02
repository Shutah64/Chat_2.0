import React from 'react'
import {Route} from 'react-router-dom'
import SignUp from './components/signUp/SignUp'
import Login from './components/login/Login'
export default function UnAuthStack() {
    return (
    <>
            <Route path='/SignUp' component={SignUp}/>
            <Route path='/Login' component={Login}/>
    </>
    )
}
