import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from './components/Tabs';
import PhotosContainer from './components/Photos';
import { photos } from './../data';

const PageContent = ({ item, isUser = true, ...props }) => {
    const path = props.location.pathname;
    const activeTab = /albums/.test(path) ? 1 : (/friends/.test(path) ? 2 : 0);

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} itemId={item.id} isUser={isUser} />
            <Switch>
                <Route path={`/${isUser ? 'user' : 'album'}/:itemId`} render={props => <PhotosContainer {...props} photos={photos} item={item} />} />
                {
                    isUser ?
                        <>
                            <Route path="/user/:itemId/albums" render={() => 'albums'} />
                            <Route path="/user/:itemId/friends" render={() => 'friends'} />
                        </> :
                        null
                }
            </Switch>
        </div>
    );
};

export default PageContent;
