import React from 'react';
import Photo from './../Photo';

const PhotosContainer = ({ photos, user }) => {
    return (
        <div className="cont">
            <div className="row">
            {
                photos.map(photo => {
                    return (
                        <Photo key={`p:${photo.id}u:${user.id}`} photo={photo} user={user} />
                    );
                })
            }
            </div>
        </div>
    );
};

export default PhotosContainer;
