import React from 'react';
import { Route } from 'react-router-dom';
import Content from './../Content';

const MainApp = () => {
    return (
        <div className="container">
            <Route path='/user/:itemId' render={props => <Content {...props} isUser={true} />} />
            <Route path='/album/:itemId' render={props => <Content {...props} isUser={false} />} />
        </div>
    );
};

export default MainApp;
