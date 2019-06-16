import React, {useState, useEffect} from 'react';
import {friends as dataFriends} from '../../../../data';
import {Link} from "react-router-dom";
import Search from "../../../../components/Search";
import {restSettings} from "../../../../constants";
import responseHandler from "../../../../helpers/responseHandler";
import addFriend from "../../../../helpers/addFriendRequest";

const FriendsContainer = ({item, curUserId}) => {
    const isCurUser = item.id === curUserId;
    const [friends, setFriends] = useState([]);
    const [fetchedFriend, setFetchedFriends] = useState([]);
    const [search, setSearch] = useState('');
    const f = (value) => {
        if (value && value.trim()) {
            // fetching data
            fetch(`${window.host}/api/friend/${value}`, {
                ...restSettings,
                method: 'GET'
            }).then(res => responseHandler(res))
                .then(() => true)
                .catch(() => {
                    alert('error fetching friends')
                });

            setFriends(fetchedFriend.filter(el => el.nickname.includes(value)))
        } else {
            setFriends(fetchedFriend.filter(el => el.ownerId === item.id));
        }
    };

    useEffect(() => {
        // fetching data
        fetch(`${window.host}/api/user/getFriendsById/${item.id}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then((res) => {
                setFetchedFriends(res);
                setFriends(res);
            })
            .catch(() => {
                alert('error fetching friends')
            });
        setFriends(dataFriends.filter(el => el.ownerId === item.id));
    }, [item.id]);

    return (
        <div className="cont">
            <div className="row">
                <Search
                    className="mb-3"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => f(search)}
                    value={search}
                    url={`/user/${item.id}/friends?q=${search}`}
                />
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
                                        {
                                            !isCurUser ?
                                                <button className="btn btn-success" onClick={() => addFriend(curUserId, friend.id)}>Add friend</button>
                                                : null
                                        }
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
