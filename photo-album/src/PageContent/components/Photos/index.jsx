import React from 'react';
import Photo from './../Photo';

const PhotosContainer = ({ photos, item }) => {
    return (
        <div className="cont">
            <div className="row">
            {
                photos.map(photo => (
                    <Photo key={`p:${photo.id}u:${item.id}`} photo={photo} user={item} />
                ))
            }
            </div>
        </div>
    );
};

export default PhotosContainer;
