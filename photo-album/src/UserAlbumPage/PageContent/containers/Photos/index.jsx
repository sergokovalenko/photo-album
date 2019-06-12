import React, { useState, useEffect } from 'react';
import Photo from '../../components/Photo';
import { photos as datPhoto } from '../../../../data';

const PhotosContainer = ({ item }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // fetching data
        setPhotos(datPhoto);
    }, [item.id]);

    return (
        <div className="cont">
            <div className="row">
            {
                photos.length > 0 ?
                    photos.map(photo => (
                        <Photo key={`p:${photo.id}u:${item.id}`} photo={photo} user={item} />
                    )) :
                    'There is no photo'
            }
            </div>
        </div>
    );
};

export default PhotosContainer;
