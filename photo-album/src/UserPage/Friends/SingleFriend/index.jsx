import React, { useState } from 'react';
import {Link} from "react-router-dom";
import addFriend from "../../../helpers/addFriendRequest";

const SingleFriend = ({ friend, curUserId, friendsIds, isCurUser }) => {
    const [isClicked, setClick] = useState(false);
    const {
        nickname,
        url,
        firstName,
        lastName,
        id
    } = friend;
    const onClick = () => {
        addFriend(curUserId, id);
        setClick(true);
    };

    return (
        <div key={nickname} className="col-12 card mt-3">
            <div className="card-body">
                <img
                    src={url}
                    alt="avatar"
                    className="rounded-circle mr-2"
                    width="60px"
                    height="60px"
                    onClick={() => alert('like')}
                />
                <div className="d-inline-block">
                    Nickname: {nickname}
                </div>
                <div className="d-inline-block ml-2">
                    Name: <Link to={`/user/${friend.id}`}
                                className="text-primary info-user-name">{firstName} {lastName}</Link>
                    {
                        !isCurUser && !friendsIds.includes(id) ?
                            <button className={`btn btn-success ${isClicked ? 'd-none' : ''}`} onClick={onClick}>Add friend</button>
                            : null
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleFriend;
