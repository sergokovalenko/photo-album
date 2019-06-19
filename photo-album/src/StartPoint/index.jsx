import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Index from './../Index/index';
import Signup from './../Signup/index'
import fetcher from "../helpers/fetcher";
import FileUpload from './../FileUpload/index';
import UserPage from "../UserPage";
import AlbumPage from "../AlbumPage";

class StartPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { id: 12, firstName: 'Fake', lastName: 'Authorize', nickname: 'nick' },
            isAuthorized: true,
            friends: [],
            friendsIds: [],
            albums: []
        };

        // remove on authorize
        this.updateFriends();
        this.updateAlbums();
    }

    friendsInterval = null;
    albumInterval = null;

    onAuthorize = (user) => {
        this.setState({ user, isAuthorized: true });
    };

    updateFriends = () => {
        const { user } = this.state;
        if (this.friendsInterval) {
            clearInterval(this.friendsInterval);
        }

        this.friendsInterval = setInterval(() => {
            fetcher(
                `${window.host}/api/user/getFriendsById/${user.id}`,
                (res) => {
                    this.setState({friends: res, friendsIds: res.map(el => el.id)} )
                },
                'error fetching friends'
            );
        }, 5000);
    };

    onFriendsSearch = (value) => {
        if (value && value.trim()) {
            fetcher(
                `${window.host}/api/user/getUsersByNicknameLastFirst/${value}`,
                (res) => this.setState({ friends: res }),
                'error fetching friends'
            );
        } else {
            this.updateFriends();
        }
    };

    updateAlbums = () => {
        const { user } = this.state;
        if (this.albumInterval) {
            clearInterval(this.albumInterval);
        }

        this.albumInterval = setInterval(() => {
            fetcher(
                `${window.host}/api/album/getAlbumsByUserId/${user.id}`,
                (res) => this.setState({
                    albums: res.map(el => ({ ...el, access: el.access.toLowerCase() }))
                }),
                'albums weren\'t found'
            );
        }, 5000);
    };

    onAlbumsSearch = (value) => {
        if (value && value.trim()) {
            // not implemented
        } else {
            this.updateAlbums();
        }
    };

    render() {
        const {
            user, isAuthorized,
            friends, albums, friendsIds
        } = this.state;
        const currentUser = { user, albums, friends, friendsIds };


        return (
            <div className="container">
                <Route path="/" exact render={() => <Index authorize={(val) => this.onAuthorize(val)} />} />
                <Route path="/file" exact component={FileUpload} />
                <Route path="/signup" exact component={Signup} />
                <Route path='/user/:itemId' render={
                    props => isAuthorized && user.id ?
                        <UserPage {...props} curUser={currentUser} curUserId={user.id} onSearch={(val) => this.onFriendsSearch(val)} />
                        : <Redirect to="/" />
                } />
                <Route path='/album/:itemId' render={
                    props => isAuthorized && user.id ?
                        <AlbumPage {...props} curUser={currentUser} curUserId={user.id} onSearch={(val) => this.onAlbumsSearch(val)} />
                        : <Redirect to="/" />
                } />
            </div>
        );
    }
}

export default StartPoint;
