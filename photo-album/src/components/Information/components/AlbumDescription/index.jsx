import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { users } from './../../../../data';
import {restSettings} from "../../../../constants";
import responseHandler from "../../../../helpers/responseHandler";

const AlbumDescription = ({ item, curUserId }) => {
    const {
        id,
        photoCount,
        name,
        user_id,
        access
    } = item;
    const [user, setUser] = useState(null);
    useEffect(() => {
        // fetching data to take user by owner Id
        fetch(`${window.host}/api/user/${user_id}`, {
            ...restSettings,
            method: 'GET'
        }).then(result => responseHandler(result))
            .then(user => setUser(user))
            .catch(() => {
                setUser(null);
            });

        setUser(users.find(el => el.id === user_id));
    }, [id, user_id]);

    return (
        <div className="album-info">
            <div className="album-info-name">{name}</div>
            {
                user ?
                    <div className="album-info-nick text-monospace ml-3">
                        Owner:
                        <Link to={`/user/${user_id}`} className="text-primary info-user-name">
                            {
                                curUserId === user_id ?
                                    'You' :
                                    `${user.firstName} ${user.lastName}`
                            }
                        </Link>
                    </div> :
                    'User not found'
            }
            <div className="album-info-photos">Album include {photoCount} photos</div>
            <div className="album-info-access">Album is visible for {access == '0' ? 'all' : access == '1' ? 'friends only' : 'me'}</div>
        </div>
    );
};

export default AlbumDescription;
