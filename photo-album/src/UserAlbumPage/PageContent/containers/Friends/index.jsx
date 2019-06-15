import React, {useState, useEffect} from 'react';
import {friends as dataFriends} from '../../../../data';
import {Link} from "react-router-dom";

const FriendsContainer = ({item, curUserId}) => {
    // const isCurUser = item.id === curUserId;
    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState('');
    const f = (value) => {
        if (value && value.trim()) {
            // fetching data
            setFriends(friends.filter(el => el.nickname.includes(value)))
        } else {
            setFriends(dataFriends.filter(el => el.ownerId === item.id));
        }
    };

    useEffect(() => {
        // fetching data
        setFriends(dataFriends.filter(el => el.ownerId === item.id));
    }, [item.id]);

    return (
        <div className="cont">
            <div className="row">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search friends"
                        aria-label="Search friends"
                        aria-describedby="button-addon2"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                        <Link
                            to={`/user/${item.id}/friends?q=${search}`}
                            className="btn btn-outline-primary"
                            id="button-addon2"
                            onClick={() => f(search)}
                        >
                            Search
                        </Link>
                    </div>
                </div>
            </div>
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
                                        Name: <Link to={`/user/${friend.id}`}
                                                    className="text-primary info-user-name">{friend.firstName} {friend.lastName}</Link>
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
