import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Link } from 'react-router-dom';

const Comments = ({ comments, createComment }) => {
    const [commentValue, setComment] = useState('');
    const onClick = () => {
        createComment(commentValue);
        setComment('');
    };

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
                    <button onClick={onClick} className="btn btn-primary">Comment</button>
                </div>
            </div>
            {
                comments.length ?
                    comments.map(el => (
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
                    'No comments'
            }
        </div>
    );
};

export default Comments;
