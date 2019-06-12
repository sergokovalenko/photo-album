import React, { useState, useEffect } from 'react';
import InformationBlock from './../Information';
import PageContent from '../PageContent';
import { albums, users } from './../data';

const Content = ({ isUser, ...props}) => {
    const itemId = +props.match.params.itemId ? +props.match.params.itemId : 1;
    const [curItem, setItem] = useState(null);

    useEffect(() => {
        // fetching data
        const item = (isUser ? users : albums).find(el => el.id === itemId);
        setItem(item);
    }, [itemId, isUser]);

    return curItem ?
        <>
            <InformationBlock {...props} isUser={isUser} item={curItem} />
            <PageContent {...props} isUser={isUser} item={curItem} />
        </> :
        null;
};

export default Content;
