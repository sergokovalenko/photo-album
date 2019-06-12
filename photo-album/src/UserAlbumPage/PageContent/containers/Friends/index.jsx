import React, { useState, useEffect } from 'react';
import { friends as dataFriends } from '../../../../data';
import { Link } from "react-router-dom";

const FriendsContainer = ({ item }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // fetching data
        setFriends(dataFriends.filter(el => el.ownerId === item.id));
    }, [item.id]);

    return (
        <div className="cont">
            <div className="row m-0">
                {
                    friends.length > 0 ?
                        friends.map(friend => (
                            <div key={friend.nickname} className="col-12 card mt-3">
                                <div className="card-body">
                                    <img
                                        src={friend.url}
                                        alt="avatar"
                                        className="rounded-circle mr-2"
                                        width="60px"
                                        height="60px"
                                        onClick={() => alert('like')}
                                    />
                                    <div className="d-inline-block">
                                        Nickname: {friend.nickname}
                                    </div>
                                    <div className="d-inline-block ml-2">
                                        Name: <Link to={`/user/${friend.id}`} className="text-primary info-user-name">{friend.firstName} {friend.lastName}</Link>
                                    </div>
                                </div>
                            </div>
                        )) :
                        null
                }
            </div>
        </div>
    );
};

export default FriendsContainer;
