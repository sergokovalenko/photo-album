import React from 'react';
import Comments from '../Comments';
import './index.scss';
import {Link} from "react-router-dom";

const Photo = ({ photo, user }) => {
    const { url, name } = photo;

    return (
        <>
            <div className="col-4 mt-3">
                <img
                    src={url}
                    alt={name}
                    className="pointer rounded-lg w-100 h-100"
                    data-toggle="modal"
                    data-target={`#${name}`}
                />
            </div>
            <div className="modal fade" id={name} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <img
                            src={url}
                            alt={name}
                            className="rounded-lg mx-auto w-90 mt-5 pointer"
                            onClick={() => alert('like')}
                        />
                        <hr className="line" />
                        <div className="row">
                            <div className="col-9">
                                <Comments photoId={photo.id} />
                            </div>
                            <div className="col-3">
                                {/* Photo Owner */}
                                <div className="w-100 pb-3">
                                    <span>Owner: </span>
                                    <Link to={`/user/${user.id}`} className="text-primary info-user-name">{`${user.firstName} ${user.lastName}`}</Link>
                                    <div>{photo.likes} likes</div>
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
