import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Content from '../UserAlbumPage';
import Index from './../Index/index';
import Signup from './../Signup/index'
import FileUpload from './../FileUpload/index'

const MainApp = () => {
    const [user, setUser] = useState({});

    return (
        <div className="container">
            <Route path="/" exact render={() => <Index authorize={(val) => setUser(val)} />} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/file" exact component={FileUpload} />
            <Route path='/user/:itemId' render={props => user && user.id ? <Content {...props} curUserId={user.id} isUser={true} /> : <Redirect to="/" />} />
            <Route path='/album/:itemId' render={props => user && user.id ? <Content {...props} curUserId={user.id} isUser={false} /> : <Redirect to="/" />} />
        </div>
    );
};

export default MainApp;
