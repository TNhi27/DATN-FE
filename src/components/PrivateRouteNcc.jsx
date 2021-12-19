import React from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';



function PrivateRouteNcc({ component: Component, ...rest }) {
    const user = useSelector((state)=>state.login);
    
    return (
        <Route
            {...rest}
            render={props =>
                user.role==="[ROLE_NCC]" ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}



export default PrivateRouteNcc;