import React from 'react';
import Photo from './../Photo';

const Photos = ({ photos, user }) => {
    return (
        <div className="cont">
            <div className="row">
            {
                photos.map(photo => {
                    return (
                        <Photo photo={photo} user={user} />
                    );
                })
            }
            </div>
        </div>
    );
};

export default Photos;
