import React from 'react';
import InformationBlock from './../Information';
import UserContent from './../UserContent';

const Content = (props) => {
    return (
        <>
            <InformationBlock {...props} />
            <UserContent {...props} />
        </>
    );
};

export default Content;
