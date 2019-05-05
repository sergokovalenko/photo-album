import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const AlbumDescription = ({ item }) => {
    const {
        firstName,
        lastName,
        photoCount,
        name,
        userId,
        access
    } = item;

    return (
        <div className="album-info">
            <div className="album-info-name">{name}</div>
            <div className="album-info-nick text-monospace ml-3">
                Owner:
                <Link to={`/user/${userId}`} className="text-primary info-user-name">{`${firstName} ${lastName}`}</Link>
            </div>
            <div className="album-info-photos">Album include {photoCount} photos</div>
            <div className="album-info-access">Album is {access ? 'public' : 'private'}</div>
        </div>
    );
};

export default AlbumDescription;
