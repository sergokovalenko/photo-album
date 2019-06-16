import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Link } from 'react-router-dom';
import {restSettings} from "../../../../constants";
import responseHandler from "../../../../helpers/responseHandler";
import './index.scss';

const CommentsContainer = ({ albumId, curUserId }) => {
    const [comments, setComments] = useState([]);
    const [fullComments, setFullComments] = useState([]);
    const [commentValue, setComment] = useState('');
    const sendComment = () => {
        fetch(`${window.host}/comment`, {
            ...restSettings,
            body: JSON.stringify({
                fromId: curUserId,
                comment: commentValue,
                albumId: albumId
            })
        }).then(res => responseHandler(res))
            .then(() => true)
            .catch(() => {
                alert('comment wasn\'t sent')
            });
    };

    useEffect(() => {
        // fetching data
        fetch(`${window.host}/api/comment/getCommentsByAlbumId/${albumId}`, {
            ...restSettings,
            method: 'GET'
        }).then(res => responseHandler(res))
            .then((res) => {
                setComments(res);
                const fetches = res.reduce((acc, val) => {
                    acc.push(fetch(`${window.host}/api/user/${val.user}`, {
                        ...restSettings,
                        method: 'GET'
                    }).then(res => responseHandler(res)));

                    return acc;
                }, []);

                Promise.all(fetches).then((users) => {
                    const mapped = res.map(comm => ({
                        ...users.find(user => user.id === comm.user),
                        ...comm
                    }));
                    setFullComments(mapped);
                });
            })
            .catch(() => {
                alert('comment wasn\'t sent')
            });
    }, [albumId]);

    return (
        <div className="comments mt-3 mb-5">
            <div className="form-row">
                <div className="form-group col-10">
                    <TextareaAutosize
                        className="form-control"
                        placeholder="Write your comment here..."
                        value={commentValue}
                        onChange={(e) => setComment(e.target.value)}
                        maxRows={7}
                        minRows={2}
                        maxLength={255}
                        autoFocus
                    />
                </div>
                <div className="col">
                    <button onClick={() => sendComment()} className="btn btn-primary">Comment</button>
                </div>
            </div>
            {
                fullComments.length ?
                    fullComments.map(el => (
                        <div key={`c:${el.id}u:${el.user}`} className="comment d-flex mb-2">
                            <div className="comment-photo mr-3">
                                <img src={el.url} alt="ava" className="rounded-circle w-100" />
                            </div>
                            <div className="comment-content border-bottom border-info w-100 pb-3">
                                <Link to={`/user/${el.user}`} className="d-block text-primary comment-user-name">
                                    {el.firstName} {el.lastName}
                                </Link>
                                <div className="comment-text">{el.text}</div>
                            </div>
                        </div>
                    )) :
                    comments.length > 0 ?
                        comments.map(el => (
                            <div key={`c:${el.id}u`} className="comment d-flex mb-2">
                                <div className="comment-photo mr-3">
                                    <img src="" width="50px" height="50px" alt="ava" className="rounded-circle" />
                                </div>
                                <div className="comment-content border-bottom border-info w-100 pb-3">
                                    <span>Name Surname</span>
                                    <div className="comment-text">{el.text}</div>
                                </div>
                            </div>
                        )):
                        'No comments'
            }
        </div>
    );
};

export default CommentsContainer;
