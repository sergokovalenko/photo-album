import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from './components/Tabs';
import PhotosContainer from './containers/Photos';
import FriendsContainer from './containers/Friends';
import AlbumsContainer from './containers/Albums';

const PageContent = ({ item, isUser = true, ...props }) => {
    const path = props.location.pathname;
    const activeTab = /albums/.test(path) ? 1 : (/friends/.test(path) ? 2 : 0);

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} itemId={item.id} isUser={isUser} />
            <Switch>
                <Route exact path={`/${isUser ? 'user' : 'album'}/:itemId`} render={props => <PhotosContainer {...props} item={item} />} />
                {
                    isUser ?
                        <>
                            <Route path="/user/:itemId/albums" render={() => <AlbumsContainer item={item} />} />
                            <Route path="/user/:itemId/friends" render={() => <FriendsContainer item={item} />} />
                        </> :
                        null
                }
            </Switch>
        </div>
    );
};

export default PageContent;
