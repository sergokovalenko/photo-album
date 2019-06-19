import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Search from "../../components/Search";
import addFriend from "../../helpers/addFriendRequest";

const FriendsContainer = ({item, friends, curUserId}) => {
    const isCurUser = item.id === curUserId;
    const [search, setSearch] = useState('');

    return (
        <div className="cont">
            <div className="row">
                <Search
                    className="mb-3"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => {}}
                    value={search}
                    url={`/user/${item.id}/friends?q=${search}`}
                />
            </div>
            <div className="row m-0">
                {
                    friends.length > 0 ?
                        friends.map(friend => {
                            if (!search || search && friend.nickname.includes(search)) {
                                return (
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
                                                        <button className="btn btn-success"
                                                                onClick={() => addFriend(curUserId, friend.id)}>Add
                                                            friend</button>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        }) :
                        null
                }
            </div>
        </div>
    );
};

export default FriendsContainer;
