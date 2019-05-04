import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InformationBlock from './../Information';

const Content = (props) => {
    console.log(props);
    return (
        <Switch>
            <Route path='/user' component={InformationBlock} />
        </Switch>
    );
};

export default Content;
