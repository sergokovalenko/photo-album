import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from './components/Tabs';
import PhotosContainer from './containers/Photos';
import FriendsContainer from './containers/Friends';
import AlbumsContainer from './containers/Albums';
import CommentsContainer from "./components/Comments";

const PageContent = ({ item, isUser = true, ...parentProps }) => {
    const path = parentProps.location.pathname;
    const activeTab = /albums/.test(path) ? 1 : (/friends/.test(path) ? 2 : 0);

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} itemId={item.id} isUser={isUser} />
            <Switch>
                {
                    isUser ?
                        <>
                            <Route exact path="/user/:itemId" render={() => <AlbumsContainer item={item} />} />
                            <Route path="/user/:itemId/albums" render={() => <AlbumsContainer item={item} />} />
                            <Route path="/user/:itemId/friends" render={() => <FriendsContainer item={item} />} />
                        </> :
                        <>
                            <Route exact path="/album/:itemId" render={props => <PhotosContainer {...props} curUserId={parentProps.curUserId} item={item} />} />
                            <Route path="/album/:itemId/comments" render={props => <CommentsContainer {...props} curUserId={parentProps.curUserId} albumId={item.id} item={item} />} />
                        </>
                }
            </Switch>
        </div>
    );
};

export default PageContent;
