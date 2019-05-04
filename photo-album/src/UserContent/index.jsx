import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from './components/Tabs';
import Photos from './components/Photos';
import { photos, users } from './../data';

const UserContent = (props) => {
    const path = props.location.pathname;
    const activeTab = /albums/.test(path) ? 1 : (/friends/.test(path) ? 2 : 0);

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} />
            <Switch>
                <Route exact path="/user" render={(props) => <Photos {...props} photos={photos} user={users[0]} />} />
                <Route path="/user/albums" render={() => 'albums'} />
                <Route path="/user/friends" render={() => 'friends'} />
            </Switch>
        </div>
    );
};

export default UserContent;
