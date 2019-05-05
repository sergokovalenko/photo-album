import React, { useState } from 'react';
import Button from './../components/Button';
import './index.scss';

const Information = ({ user }) => {
    const onClick = () => console.log('click');
    const [isBioShown, changeBioVisibility] = useState(false);
    const {
        firstName,
        lastName,
        bio,
        url,
        birthDate,
        photoCount,
        nickname
    } = user;

    return (
        <div className="wrapper">
            <div className="info">
                <div className="row">
                    <div className="col-6 picture">
                        <img
                            className="w-100 img-fluid img-thumbnail rounded-circle"
                            src={url}
                            alt="log"
                            width="50%"
                        />
                    </div>
                    <div className="col-6 information">
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
                            <div className="user-info-photos">{photoCount} photos</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons-container">
                <Button content="Add" onClick={onClick} />
                <Button content="Change" onClick={onClick} />
                <Button content="Create" onClick={onClick} />
            </div>
        </div>
    );
};

export default Information;
