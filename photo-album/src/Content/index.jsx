import React from 'react';
import InformationBlock from './../Information';
import UserContent from '../UserContent';
import { users } from './../data';

const Content = props => {
    const userId = +props.match.params.userId ? +props.match.params.userId : 1;
    const user = users.find(user => user.id === userId);

    return (
        <>
            <InformationBlock {...props} user={user} />
            <UserContent {...props} user={user} />
        </>
    );
};

export default Content;
