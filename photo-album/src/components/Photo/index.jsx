import React, { useState, useEffect } from 'react';
import './index.scss';
import {Link} from "react-router-dom";
import {restSettings} from "../../constants";
import responseHandler from "../../helpers/responseHandler";

const Photo = ({ photo }) => {
    const { url, text } = photo;
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${window.host}/api/user/${photo.user_id}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then((res) => setUser(res))
            .catch(() => console.log('кривой айди юзера для фотки'));
    }, [photo.id, photo.user_id]);

    return (
        <>
            <div className="col-4 mt-3">
                <img
                    src={window.host + '/' + url}
                    alt={text}
                    className="pointer rounded-lg w-100 h-100"
                    data-toggle="modal"
                    data-target={`#${text && text.replace(/ /g, '_')}`}
                />
            </div>
            <div className="modal fade" id={text && text.replace(/ /g, '_')} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <img
                            src={window.host + url}
                            alt={text}
                            className="rounded-lg mx-auto w-90 mt-5 pointer"
                            onClick={() => console.log('like')}
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
