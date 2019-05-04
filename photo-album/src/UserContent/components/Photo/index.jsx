import React, { Component } from 'react';
import CommentsContainer from './../Comments';
import PhotoOwner from './../PhotoOwner';
import './index.scss';

class Photo extends Component {
    render() {
        const { photo, user } = this.props;

        return (
            <>
                <div className="col-4 mt-3">
                    <img
                        src={photo.url}
                        alt={photo.name}
                        className="pointer rounded-lg w-100 h-100"
                        data-toggle="modal"
                        data-target={`#${photo.name}`}
                    />
                </div>
                <div className="modal fade" id={photo.name} tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <img
                                src={photo.url}
                                alt={photo.name}
                                className="rounded-lg mx-auto w-90 mt-5 pointer"
                                onClick={() => alert('like')}
                            />
                            <hr className="line" />
                            <div className="row">
                                <div className="col-9">
                                    <CommentsContainer />
                                </div>
                                <div className="col-3">
                                    <PhotoOwner user={user} photo={photo} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Photo;
