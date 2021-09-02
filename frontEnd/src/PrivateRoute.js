
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import {context} from './App'
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {value, setValue} = useContext(context)
    return (
        <>
    <Route
      {...rest}
      render={(routeProps) => value.authorized ? <RouteComponent {...routeProps} />: <Redirect to='/login'/>
      }
    />
    {value.authorized? <Redirect to='/'/> : ''} 
    </>
    );
};
export default PrivateRoute