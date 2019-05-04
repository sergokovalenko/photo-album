import React from 'react';
import Photo from './../Photo';

const Photos = (props) => {
    return (
        <div className="cont">
            <div className="row">
            {
                props.photos.map(photo => {
                    return (
                        <Photo photo={photo} />
                    );
                })
            }
            </div>
        </div>
    );
};

export default Photos;
