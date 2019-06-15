import React from 'react';
import Comments from '../Comments';
import './index.scss';
import {Link} from "react-router-dom";
import {restSettings} from "../../../../constants";
import responseHandler from "../../../../helpers/responseHandler";

const Photo = ({ photo, user, curUserId }) => {
    const { url, name } = photo;
    const like = () => {
        fetch(`${window.host}/like`, {
            ...restSettings,
            body: JSON.stringify({
                userId: curUserId,
                photoId: photo.id
            })
        }).then(res => responseHandler(res))
            .then(() => true)
            .catch(() => alert('like error in Photo component'));
    };

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
                            {/*<div className="col-9">*/}
                            {/*    <Comments photoId={photo.id} />*/}
                            {/*</div>*/}
                            {/*<div className="col-3">*/}
                            <div className="col">
                                {/* Photo Owner */}
                                <div className="w-100 pb-3">
                                    <span>Owner: </span>
                                    <Link to={`/user/${user.id}`} className="text-primary info-user-name">{`${user.firstName} ${user.lastName}`}</Link>
                                    <div>{photo.likes} likes</div>
                                    <button className="btn btn-danger" onClick={() => like()}>Like</button>
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
