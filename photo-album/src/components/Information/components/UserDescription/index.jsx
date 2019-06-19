import React, {useState} from 'react';
import './index.scss';

const UserDescription = ({ item }) => {
    const [isBioShown, changeBioVisibility] = useState(false);
    const {
        firstName,
        lastName,
        bio,
        // birthDate,
        nickname
    } = item;

    return (
        <div className="user-info">
            <div className="user-info-name">{`${firstName} ${lastName}`}</div>
            <div className="user-info-nick text-monospace ml-3">{nickname}</div>
            <div className="user-info-bio">
                <span>About: </span>
                {
                    isBioShown ?
                        <span>{bio} </span> :
                        null
                }
                <span className="user-info-bio--link" onClick={() => changeBioVisibility(!isBioShown)}>
                    {isBioShown ? 'Hide...' : 'Show...'}
                </span>
            </div>
        </div>
    );
};

export default UserDescription;
