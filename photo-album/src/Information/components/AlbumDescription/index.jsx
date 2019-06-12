import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { users } from './../../../data';

const AlbumDescription = ({ item, curUserId }) => {
    const {
        id,
        photoCount,
        name,
        userId,
        access
    } = item;
    const [user, setUser] = useState(null);
    useEffect(() => {
        // fetching data to take user by owner Id

        setUser(users.find(el => el.id === userId));
    }, [id, userId]);

    return (
        <div className="album-info">
            <div className="album-info-name">{name}</div>
            {
                user ?
                    <div className="album-info-nick text-monospace ml-3">
                        Owner:
                        <Link to={`/user/${userId}`} className="text-primary info-user-name">
                            {
                                curUserId === userId ?
                                    'You' :
                                    `${user.firstName} ${user.lastName}`
                            }
                        </Link>
                    </div> :
                    null
            }
            <div className="album-info-photos">Album include {photoCount} photos</div>
            <div className="album-info-access">Album is {access ? 'public' : 'private'}</div>
        </div>
    );
};

export default AlbumDescription;
