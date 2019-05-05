import React from 'react';
import { Link } from 'react-router-dom';
import { comments, users } from './../../../data';
import './index.scss';

const CommentsContainer = props => {
    const mapped = comments.map(comm => ({
        ...users.find(user => user.id === comm.userId),
        ...comm
    }));

    return (
        <div className="comments mb-5">
            {
                mapped.map(el => (
                    <div key={`c:${el.id}u:${el.userId}`} className="comment d-flex mb-2">
                        <div className="comment-photo mr-3">
                            <img src={el.url} alt="ava" className="rounded-circle w-100" />
                        </div>
                        <div className="comment-content border-bottom border-info w-100 pb-3">
                            <Link to={`/user/${el.userId}`} className="d-block text-primary comment-user-name">{`${el.firstName} ${el.lastName}`}</Link>
                            <div className="comment-text">{el.text}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CommentsContainer;
