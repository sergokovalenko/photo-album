import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Search from "../../components/Search";
import addFriend from "../../helpers/addFriendRequest";

const FriendsContainer = ({item, friends, curUserId, onSearch, friendsIds}) => {
    const isCurUser = item.id === curUserId;
    const [search, setSearch] = useState('');
    const onSearchClick = () => {
        onSearch(search, isCurUser);
    };

    return (
        <div className="cont">
            <div className="row">
                <Search
                    className="mb-3"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={onSearchClick}
                    value={search}
                    url={`/user/${item.id}/friends?q=${search}`}
                />
            </div>
            <div className="row m-0">
                {
                    friends.length > 0 ?
                        friends.map(friend => {
                            const {
                                nickname,
                                url,
                                firstName,
                                lastName,
                                id
                            } = friend;

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
                                                    <button className="btn btn-success"
                                                            onClick={() => addFriend(curUserId, id)}>Add
                                                        friend</button>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        }) :
                        null
                }
            </div>
        </div>
    );
};

export default FriendsContainer;
