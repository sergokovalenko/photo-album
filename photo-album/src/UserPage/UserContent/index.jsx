import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from "../../components/Tabs";
import Albums from "../Albums";
import Friends from "../Friends";

const UserContent = ({ item, path, ...parentProps }) => {
    const activeTab = /albums/.test(path) ? 1 : 2;

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} itemId={item.id} isUser={true} />
            <Switch>
                <Route exact path="/user/:itemId" render={() => <Albums item={item} {...parentProps} />} />
                <Route path="/user/:itemId/albums" render={() => <Albums item={item} {...parentProps} />} />
                <Route path="/user/:itemId/friends" render={() => <Friends item={item} {...parentProps} />} />
            </Switch>
        </div>
    );
};

export default UserContent;
