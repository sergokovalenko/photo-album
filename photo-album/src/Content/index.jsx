import React from 'react';
import InformationBlock from './../Information';
import PageContent from '../PageContent';
import { albums, users } from './../data';

const Content = ({ isUser, ...props}) => {
    const itemId = +props.match.params.itemId ? +props.match.params.itemId : 1;
    const item = (isUser ? users : albums).find(el => el.id === itemId);

    return (
        <>
            <InformationBlock {...props} isUser={isUser} item={item} />
            <PageContent {...props} isUser={isUser} item={item} />
        </>
    );
};

export default Content;
