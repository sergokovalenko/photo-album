import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from './components/Tabs';
import PhotosContainer from './components/Photos';
import { photos } from './../data';

const UserContent = ({ user, ...props }) => {
    const path = props.location.pathname;
    const activeTab = /albums/.test(path) ? 1 : (/friends/.test(path) ? 2 : 0);

    return (
        <div className="wrapper">
            <Tabs userId={user.id} activeTab={activeTab} />
            <Switch>
                <Route path="/user/:userId" render={props => <PhotosContainer {...props} photos={photos} user={user} />} />
                <Route path="/user/:userId/albums" render={() => 'albums'} />
                <Route path="/user/:userId/friends" render={() => 'friends'} />
            </Switch>
        </div>
    );
};

export default UserContent;
