import React from 'react';
import './index.scss';

const button = ({ content, onClick, classes = 'btn-light' }) => {
    return (
        <button className={`btn btn-action ${classes}`} onClick={onClick}>{ content }</button>
    );
};

export default button;
