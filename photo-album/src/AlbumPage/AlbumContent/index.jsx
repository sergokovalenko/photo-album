import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from "../../UserAlbumPage/PageContent/components/Tabs";
import Photos from "../Photos";
import Comments from "../Comments";

const AlbumContent = ({ item, photos, comments, path, createComment, ...parentProps }) => {
    const activeTab = /comments/.test(path) ? 2 : 1;

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} itemId={item.id} isUser={false} />
            <Switch>
                <Route exact path="/album/:itemId" render={() => <Photos photos={photos} item={item} />} />
                <Route path="/album/:itemId/photos" render={() => <Photos photos={photos} item={item} />} />
                <Route path="/album/:itemId/comments" render={props => <Comments {...props} comments={comments} curUserId={parentProps.curUserId} createComment={createComment} item={item} />} />
            </Switch>
        </div>
    );
};

export default AlbumContent;
