import React, { useState, useEffect } from 'react';
import { albums as dataAlbums } from './../../../data';
import { Link } from "react-router-dom";

const AlbumsContainer = ({ item }) => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // fetching data
        setAlbums(dataAlbums.filter(el => el.access));
    }, [item.id]);

    return (
        <div className="cont">
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
