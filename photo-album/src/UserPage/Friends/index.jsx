import React, {useState} from 'react';
import Search from "../../components/Search";
import SingleFriend from "./SingleFriend";

const FriendsContainer = ({item, friends, curUserId, onSearch, curUser}) => {
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
                            return (
                                <SingleFriend
                                    key={friend.nickname}
                                    friend={friend}
                                    isCurUser={isCurUser}
                                    curUserId={curUserId}
                                    friendsIds={curUser.friendsIds}
                                />
                            );
                        }) :
                        null
                }
            </div>
        </div>
    );
};

export default FriendsContainer;
