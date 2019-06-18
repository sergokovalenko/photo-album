import React, {useState, useEffect} from 'react';
import {albums as dataAlbums} from '../../../../data';
import {Link} from "react-router-dom";
import Search from "../../../../components/Search";
import {restSettings} from "../../../../constants";
import responseHandler from "../../../../helpers/responseHandler";

const AlbumsContainer = ({item, curUserId}) => {
    const [albums, setAlbums] = useState([]);
    const [search, setSearch] = useState('');
    const f = (value) => {
        if (value && value.trim()) {
            // fetching data
            // fetch(`${window.host}/api/album/getAlbumsByUserId/${value}`, {
            //     ...restSettings,
            //     method: 'GET'
            // }).then(res => responseHandler(res))
            //     .then(() => true)
            //     .catch(() => {
            //         alert('albums weren\'t found')
            //     });

            setAlbums(dataAlbums.filter(el => el.access && el.name.includes(value)))
        } else {
            setAlbums(dataAlbums.filter(el => el.access));
        }
    };

    useEffect(() => {
        // fetching data
        fetch(`${window.host}/api/album/getAlbumsByUserId/${curUserId}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then((res) => {
                setAlbums(res);
            })
            .catch(() => {
                alert('albums weren\'t found')
            });

        setAlbums(dataAlbums.filter(el => el.access));
    }, [item.id]);

    return (
        <div className="cont">
            <div className="row">
                <Search
                    className="mb-3"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => f(search)}
                    value={search}
                    url={`/user/${item.id}/albums?q=${search}`}
                />
            </div>
            <div className="row">
                {
                    albums.length > 0 ?
                        albums.map(album => (
                            <Link to={`/album/${album.id}`} key={album.name} className="col-4 mt-3">
                                <img
                                    src={album.url}
                                    alt={album.name}
                                    className="pointer rounded-lg w-100 h-100"
                                />
                            </Link>
                        )) :
                        'There is no albums'
                }
            </div>
        </div>
    );
};

export default AlbumsContainer;
