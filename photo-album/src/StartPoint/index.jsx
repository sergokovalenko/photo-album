import React from 'react';
import { Route } from 'react-router-dom';
import Content from '../UserAlbumPage';
import Index from './../Index/index';

const curUserId = 1;

const MainApp = () => {
    return (
        <div className="container">
            <Route path="/" exact component={Index} />
            <Route path='/user/:itemId' render={props => <Content {...props} curUserId={curUserId} isUser={true} />} />
            <Route path='/album/:itemId' render={props => <Content {...props} curUserId={curUserId} isUser={false} />} />
        </div>
    );
};

export default MainApp;
