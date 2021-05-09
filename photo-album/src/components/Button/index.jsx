import React from 'react';
import './index.scss';

const button = ({ content, onClick, classes = 'btn-light', ...props }) => {
    return (
        <button className={`btn btn-action ${classes}`} onClick={onClick} {...props}>{ content }</button>
    );
};

export default button;
