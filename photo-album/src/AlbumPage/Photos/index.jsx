import React from 'react';
import Photo from "../../UserAlbumPage/PageContent/components/Photo";

const Photos = ({ photos, curUserId }) => {
    return (
        <div className="cont">
            <div className="row">
                {
                    photos.length > 0 ?
                        photos.map(photo => (
                            <Photo key={`p:${photo.id}`} curUserId={curUserId} photo={photo} />
                        )) :
                        'There is no photo'
                }
            </div>
        </div>
    );
};

export default Photos;
