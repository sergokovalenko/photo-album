import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from "../../components/Tabs";
import Photos from "../Photos";
import Comments from "../Comments";

const AlbumContent = ({ item, photos, path, ...parentProps }) => {
    const activeTab = /comments/.test(path) ? 2 : 1;

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} itemId={item.id} isUser={false} />
            <Switch>
                <Route exact path="/album/:itemId" render={() => <Photos photos={photos} item={item} />} />
                <Route path="/album/:itemId/photos" render={() => <Photos photos={photos} item={item} />} />
                <Route path="/album/:itemId/comments" render={() => <Comments {...parentProps} item={item} />} />
            </Switch>
        </div>
    );
};

export default AlbumContent;
