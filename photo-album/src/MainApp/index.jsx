import React from 'react';
import { Route } from 'react-router-dom';
import Content from './../Content';

const MainApp = () => {
    return (
        <div className="container">
            <Route path='/user/:userId' component={Content} />
        </div>
    );
};

export default MainApp;
