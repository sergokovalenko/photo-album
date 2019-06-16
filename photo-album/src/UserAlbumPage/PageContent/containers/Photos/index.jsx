import React, { useState, useEffect } from 'react';
import Photo from '../../components/Photo';
import {restSettings} from "../../../../constants";
import responseHandler from "../../../../helpers/responseHandler";

const PhotosContainer = ({ item, curUserId }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // fetching data
        fetch(`${window.host}/api/album/getPhotosByAlbumId/${item.id}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then((res) => setPhotos(res))
            .catch(() => {
                alert('error fetching photos')
            });
    }, [item.id]);

    return (
        <div className="cont">
            <div className="row">
            {
                photos.length > 0 ?
                    photos.map(photo => (
                        <Photo key={`p:${photo.id}u:${item.id}`} curUserId={curUserId} photo={photo} />
                    )) :
                    'There is no photo'
            }
            </div>
        </div>
    );
};

export default PhotosContainer;
