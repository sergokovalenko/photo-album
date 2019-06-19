import React, { useState, useEffect } from 'react';
import InformationBlock from './Information';
import PageContent from './PageContent';
import {restSettings} from "../constants";
import responseHandler from "../helpers/responseHandler";

const UserAlbumPage = ({ isUser, ...props}) => {
    const itemId = +props.match.params.itemId ? +props.match.params.itemId : 1;
    const [curItem, setItem] = useState(null);

    useEffect(() => {
        fetch(`${window.host}/api/${isUser ? 'user' : 'album'}/${itemId}`, {
            ...restSettings,
            method: 'GET'
        }).then(result => responseHandler(result))
            .then(item => setItem(item))
            .catch(() => {
                setItem(null);
            });
    }, [itemId, isUser]);

    return curItem ?
        <>
            <InformationBlock {...props} isUser={isUser} item={curItem} />
            <PageContent {...props} isUser={isUser} item={curItem} />
        </> :
        'Wrong request';
};

export default UserAlbumPage;
