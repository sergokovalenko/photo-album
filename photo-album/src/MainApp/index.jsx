import React from 'react';
import { Route } from 'react-router-dom';
import Content from './../Content';
import Index from './../Index/index';

const MainApp = () => {
    return (
        <div className="container">
            <Route path="/" exact component={Index} />
            <Route path='/user/:itemId' render={props => <Content {...props} isUser={true} />} />
            <Route path='/album/:itemId' render={props => <Content {...props} isUser={false} />} />
        </div>
    );
};

export default MainApp;
