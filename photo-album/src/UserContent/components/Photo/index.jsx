import React, { Component } from 'react';
import './index.scss';

class Photo extends Component {
    render() {
        const { photo } = this.props;

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
                <div className="modal fade" id={photo.name} tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <img
                                src={photo.url}
                                alt={photo.name}
                                className="rounded-lg mx-auto w-90 m-5 pointer"
                                onClick={() => alert('like')}
                            />
                            <hr className="line" />
                            <div className="row">
                                <div className="col-9">
                                    <div className="comments">
                                        {/* render comments from array */}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="info">
                                        {/* render photo information */}
                                    </div>
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
