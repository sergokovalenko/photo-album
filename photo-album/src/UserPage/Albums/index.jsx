import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Search from "../../components/Search";

const Albums = ({item, albums, curUserId, onAlbumSearch, isFriend}) => {
    const isCurUser = item.id === curUserId;
    const [search, setSearch] = useState('');
    const onSearchClick = () => {
        onAlbumSearch(search, isCurUser);
    };

    return (
        <div className="cont">
            <div className="row">
                <Search
                    className="mb-3"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={onSearchClick}
                    value={search}
                    url={`/user/${item.id}/albums?q=${search}`}
                />
            </div>
            <div className="row">
                {
                    albums.length > 0 ?
                        albums.map(album => {
                            if (!search || search && album.name && album.name.includes(search)) {
                                const {access, name, url, id} = album;

                                if (isCurUser || access === 'ALL' || isFriend && access === 'FRIENDS') {
                                    return (
                                        <Link to={`/album/${id}`} key={name} className="col-4 mt-3">
                                            <img
                                                src={window.host + '/' + album.url}
                                                alt={album.name}
                                                className="pointer rounded-lg w-100 h-100"
                                            />
                                        </Link>
                                    );
                                }
                            }
                        }) :
                        'There is no albums'
                }
            </div>
        </div>
    );
};

export default Albums;
