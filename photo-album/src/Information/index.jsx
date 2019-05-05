import React from 'react';
import Button from './../components/Button';
import UserDescription from './components/UserDescription';
import AlbumDescription from './components/AlbumDescription';
import './index.scss';

const Information = ({ item, isUser }) => {
    const onClick = () => console.log('click');
    const { url } = item;

    return (
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
                                <UserDescription item={item} /> :
                                <AlbumDescription item={item} />
                        }
                    </div>
                </div>
            </div>
            <div className="buttons-container">
                <Button content="Add" onClick={onClick} />
                <Button content="Change" onClick={onClick} />
                <Button content="Create" onClick={onClick} />
            </div>
        </div>
    );
};

export default Information;
