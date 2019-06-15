import React, { useState, useEffect } from 'react';
import InformationBlock from './Information';
import PageContent from './PageContent';
import { albums, users } from './../data';
import {restSettings} from "../constants";
import responseHandler from "../helpers/responseHandler";

const Content = ({ isUser, ...props}) => {
    const itemId = +props.match.params.itemId ? +props.match.params.itemId : 1;
    const [curItem, setItem] = useState(null);

    useEffect(() => {
        // fetching data
        // while REST isn't finished
        if (isUser) {
            fetch(`${window.host}/api/${isUser ? 'user' : 'album'}/${itemId}`, {
                ...restSettings,
                method: 'GET'
            }).then(result => responseHandler(result))
                .then(user => setItem(user))
                .catch(() => {
                    setItem(null);
                });
        } else {
            const item = (isUser ? users : albums).find(el => el.id === itemId);
            setItem(item);
        }
    }, [itemId, isUser]);

    return curItem ?
        <>
            <InformationBlock {...props} isUser={isUser} item={curItem} />
            <PageContent {...props} isUser={isUser} item={curItem} />
        </> :
        'Wrong request';
};

export default Content;
