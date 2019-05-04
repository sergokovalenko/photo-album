import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const PhotoOwner = ({ user, photo }) => {
    return (
        <div className="info">
            <div className="info-content w-100 pb-3">
                <span>Owner: </span>
                <Link to={`/user/${user.id}`} className="text-primary info-user-name">{`${user.firstName} ${user.lastName}`}</Link>
                <div>{photo.likes} likes</div>
            </div>
        </div>
    );
};

export default PhotoOwner;
