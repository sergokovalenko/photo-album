import React, {Component} from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
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
            user: {id: 28, firstName: 'Fake', lastName: 'Mock user', nickname: 'testUser', url: 'img/uploads/7.jpg'},
            isAuthorized: false, // TODO:  remove on authorize
            friends: [],
            friendsIds: [],
            albums: []
        };

        // TODO:  remove on authorize
        this.updateFriends();
        this.updateAlbums();
    }

    friendsInterval = null;
    albumInterval = null;

    onAuthorize = (user) => {
        this.setState({user, isAuthorized: true});
    };

    onLogout = () => {
        this.setState({user: null, isAuthorized: false});
    }

    updateFriends = () => {
        const {user} = this.state;
        if (user && this.friendsInterval) {
            clearInterval(this.friendsInterval);
        }

        this.friendsInterval = setInterval(() => {
            fetcher(
                `${window.host}/api/user/getFriendsById/${user.id}`,
                (res) => {
                    this.setState({friends: res, friendsIds: res.map(el => el.id)})
                },
                'error fetching friends'
            );
        }, 5000);
    };

    onFriendsSearch = (value) => {
        if (value && value.trim()) {
            fetcher(
                `${window.host}/api/user/getUsersByNicknameLastFirst/${value}`,
                (res) => this.setState({friends: res}),
                'error fetching friends'
            );
        } else {
            this.updateFriends();
        }
    };

    updateAlbums = () => {
        const {user} = this.state;
        if (this.albumInterval) {
            clearInterval(this.albumInterval);
        }

        this.albumInterval = setInterval(() => {
            fetcher(
                `${window.host}/api/album/getAlbumsByUserId/${user.id}`,
                (res) => this.setState({
                    albums: res.map(el => ({...el, access: el.access.toLowerCase()}))
                }),
                'albums weren\'t found'
            );
        }, 5000);
    };

    onAlbumsSearch = (value) => {
        if (value && value.trim()) {
            fetcher(
                `${window.host}/api/album/getAlbumByQuery/${value}`,
                (res) => this.setState({friends: res}),
                'error fetching albums'
            );
        } else {
            this.updateAlbums();
        }
    };

    render() {
        const {
            user, isAuthorized,
            friends, albums, friendsIds
        } = this.state;
        const currentUser = {user, albums, friends, friendsIds};


        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Photo album</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={(() => user ? ('/user/' + user.id) : '/')()}>Home <span className="sr-only"/></Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link" to={(() => user ? ('/user/' + user.id + '/albums') : '/')()}>My albums <span className="sr-only"/></Link>
                            </li>
                            <li className="nav-item primary">
                                <Link onClick={this.onLogout} className="nav-link" to={'/'}>Logout <span className="sr-only"/></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <Route path="/" exact render={() => <Index authorize={(val) => this.onAuthorize(val)}/>}/>
                    <Route path="/file" exact component={FileUpload}/>
                    <Route path="/signup" exact component={Signup}/>
                    <Route path='/user/:itemId' render={
                        props => isAuthorized && user.id ?
                            <UserPage
                                {...props}
                                curUser={currentUser}
                                curUserId={user.id}
                                onSearch={(val) => this.onFriendsSearch(val)}
                                onAlbumsSearch={val => this.onAlbumsSearch(val)}
                            />
                            : <Redirect to="/"/>
                    }/>
                    <Route path='/album/:itemId' render={
                        props => isAuthorized && user.id ?
                            <AlbumPage {...props} curUser={currentUser} curUserId={user.id}
                                       onSearch={(val) => this.onAlbumsSearch(val)}/>
                            : <Redirect to="/"/>
                    }/>
                </div>
            </div>
        );
    }
}

export default StartPoint;
