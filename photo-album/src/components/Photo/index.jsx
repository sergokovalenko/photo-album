import React, { useState, useEffect } from 'react';
import './index.scss';
import {Link} from "react-router-dom";
import {restSettings} from "../../constants";
import responseHandler from "../../helpers/responseHandler";

const Photo = ({ photo, curUserId }) => {
    const { url, text } = photo;
    const [user, setUser] = useState(null);
    const likePhoto = () => {
        fetch(`${window.host}/api/photo/likePhoto/${photo.id}/${curUserId}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then(() => alert('Liked! Increment counter'))
            .catch(() => alert('like error in Photo component'));
    };

    useEffect(() => {
        fetch(`${window.host}/api/user/${photo.user_id}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then((res) => setUser(res))
            .catch(() => alert('like error in Photo component'));
    }, [photo.id, photo.user_id]);

    return (
        <>
            <div className="col-4 mt-3">
                <img
                    src={url}
                    alt={text}
                    className="pointer rounded-lg w-100 h-100"
                    data-toggle="modal"
                    data-target={`#${text.replace(/ /g, '_')}`}
                />
            </div>
            <div className="modal fade" id={text.replace(/ /g, '_')} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <img
                            src={url}
                            alt={text}
                            className="rounded-lg mx-auto w-90 mt-5 pointer"
                            onClick={() => alert('like')}
                        />
                        <hr className="line" />
                        <div className="row">
                            <div className="col">
                                {/* Photo Owner */}
                                <div className="w-100 pb-3">
                                    <span>Owner: </span>
                                    {
                                        user ?
                                            <Link to={`/user/${user.id}`} className="text-primary info-user-name">{`${user.firstName} ${user.lastName}`}</Link>
                                            : 'Loading...'
                                    }
                                    <div>{photo.likes} likes</div>
                                    <button className="btn btn-danger" onClick={() => likePhoto()}>Like</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Photo;
