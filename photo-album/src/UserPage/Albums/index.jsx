import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Search from "../../components/Search";

const Albums = ({item, albums}) => {
    const [search, setSearch] = useState('');

    return (
        <div className="cont">
            <div className="row">
                <Search
                    className="mb-3"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => {}}
                    value={search}
                    url={`/user/${item.id}/albums?q=${search}`}
                />
            </div>
            <div className="row">
                {
                    albums.length > 0 ?
                        albums.map(album => {
                            if (!search || search && album.name.includes(search)) {
                                return (
                                    <Link to={`/album/${album.id}`} key={album.name} className="col-4 mt-3">
                                        <img
                                            src={album.url}
                                            alt={album.name}
                                            className="pointer rounded-lg w-100 h-100"
                                        />
                                    </Link>
                                );
                            }

                            return null;
                        }) :
                        'There is no albums'
                }
            </div>
        </div>
    );
};

export default Albums;
