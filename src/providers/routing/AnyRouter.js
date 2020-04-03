import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../navbar/header';

export const AnyRoute = ({
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => {
            return (
                <div className="bodyComponent">
                    <Header />
                    <Component {...props} />
                </div>
            )
        }} />
    );

export default AnyRoute;