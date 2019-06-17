import React from 'react';
import Button from '../../components/Button';
import UserDescription from './components/UserDescription';
import AlbumDescription from './components/AlbumDescription';
import CreateUpdateAlbumModal from "./components/CreateUpdateAlbumModal";
import addFriend from "../../helpers/addFriendRequest";
import './index.scss';
import UploadPhoto from "./components/UploadPhoto";

const Information = ({item, isUser, curUserId, isAdmin}) => {
    const {url, id, user_id} = item;

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
                    { isUser && curUserId !== id ? <Button content="Add friend" onClick={() => addFriend(curUserId, id)}/> : null }
                    {
                        isUser && curUserId === id ?
                            <Button
                                content="Create album"
                                data-toggle="modal"
                                data-target="#newAlbum"
                            /> :
                            null
                    }
                    {
                        !isUser && curUserId === user_id ?
                            <>
                                <Button
                                    content="Upload photo"
                                    data-toggle="modal"
                                    data-target="#addPhoto"
                                />
                                <Button
                                    content="Change album"
                                    data-toggle="modal"
                                    data-target="#changeAlbum"
                                />
                            </>:
                            null
                    }
                    {
                        !isUser && curUserId === user_id || isAdmin ?
                            <Button
                                content="Delete album"
                                onClick={() => alert('Delete album')}
                            /> :
                            null
                    }
                </div>
            </div>
            <UploadPhoto curUserId={curUserId} item={item} id="addPhoto" />
            <CreateUpdateAlbumModal curUserId={curUserId} id="newAlbum" item={null} />
            <CreateUpdateAlbumModal curUserId={curUserId} id="changeAlbum" item={item} />
        </>
    );
};

export default Information;
