import React from 'react';
import Button from '../../components/Button';
import UserDescription from './components/UserDescription';
import AlbumDescription from './components/AlbumDescription';
import './index.scss';

const Information = ({item, isUser, curUserId}) => {
    // const isCurUserPage = isUser && curUserId === item.id;
    const {url} = item;
    const addFriend = () => {
        // request
        console.log('request data');
    };

    return (
        <>
            <div className="wrapper">
                <div className="info">
                    <div className="row">
                        <div className="col-6 picture">
                            <img
                                className="w-100 img-fluid img-thumbnail rounded-circle"
                                src={url}
                                alt="log"
                                width="50%"
                            />
                        </div>
                        <div className="col-6 information">
                            {
                                isUser ?
                                    <UserDescription item={item}/> :
                                    <AlbumDescription curUserId={curUserId} item={item}/>
                            }
                        </div>
                    </div>
                </div>
                <div className="buttons-container">
                    { isUser && curUserId !== item.id ? <Button content="Add friend" onClick={addFriend}/> : null }
                    {
                        isUser && curUserId === item.id ?
                            <>
                                <Button
                                    content="Upload photo"
                                    data-toggle="modal"
                                    data-target="#addPhoto"
                                />
                                <Button
                                    content="Create album"
                                    data-toggle="modal"
                                    data-target="#newAlbum"
                                />
                            </> :
                            null
                    }
                    {
                        !isUser && curUserId === item.userId ?
                            <Button
                                content="Change album"
                                data-toggle="modal"
                                data-target="#newAlbum"
                            /> :
                            null
                    }
                </div>
            </div>
            <div className="modal fade" id="addPhoto" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content row m-3">
                        <form className="m-3">
                            <div className="form-group">
                                <label htmlFor="uplPhoto">Select file</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="uplPhoto"
                                    accept="image/*,image/jpeg,image/png"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tags">Tags:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tags"
                                    placeholder="tag1 tag@2 tag_3"
                                    readOnly
                                />
                            </div>
                            <button className="btn btn-primary">Upload photo</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newAlbum" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <form className="m-3">
                            <div className="form-group">
                                <label htmlFor="photo">Album picture</label>
                                <input type="file" className="form-control-file" id="photo"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="name"
                                    placeholder="Creative name for your memories"
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="private"/>
                                    <label className="form-check-label" htmlFor="private">
                                        Private
                                    </label>
                                </div>
                            </div>
                            <button className="btn btn-primary">Create album</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Information;
