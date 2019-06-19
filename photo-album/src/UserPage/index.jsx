import React, { Component } from 'react';
import fetcher from "../helpers/fetcher";
import Information from "../components/Information";
import UserContent from "./UserContent";

class UserPage extends Component {
    constructor(props) {
        super(props);
        const itemId = isNaN(parseInt(props.match.params.itemId)) ? props.curUserId : parseInt(props.match.params.itemId);

        if (itemId === props.curUserId && props.curUser.user) {
            this.state = { ...props.curUser, isCur: true };
        } else {
            this.state = {
                user: null,
                albums: [],
                friends: [],
                isCur: false
            };
            this.getData(itemId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const itemId = isNaN(parseInt(this.props.match.params.itemId)) ? this.props.curUserId : parseInt(this.props.match.params.itemId);

        if (prevState.user && prevState.user.id !== itemId) {
            if (itemId === this.props.curUserId) {
                this.setState({ ...this.props.curUser, isCur: true });
            } else {
                this.getData(itemId);
            }

            return;
        }

        if (
            itemId === this.props.curUserId &&
            (prevState.friends.length !== this.props.curUser.friends.length ||
            prevState.albums.length !== this.props.curUser.albums.length)
        ) {
            this.setState({ ...this.props.curUser });
        }
    }

    getData = (id) => {
        fetcher(
            `${window.host}/api/user/${id}`,
            (res) => this.setState({ user: res }),
            'error fetching friends'
        );
        fetcher(
            `${window.host}/api/user/getFriendsById/${id}`,
            (res) => this.setState({ friends: res }),
            'error fetching friends'
        );
        fetcher(
            `${window.host}/api/album/getAlbumsByUserId/${id}`,
            (res) => this.setState({ albums: res }),
            'error fetching friends'
        );
    };

    onSearch = (value, isCur) => {
        if (isCur) {
            this.props.onSearch(value);
            console.log('1');
        } else {
            const { friends } = this.state;
            console.log('2');

            this.setState({
                friends: friends.filter(fr => fr.nickname.includes(value))
            });
        }
    };

    render() {
        const { user, friends, albums, isCur } = this.state;

        return user ?
            <>
                <Information curUserId={this.props.curUserId} isUser={true} item={user} />
                <UserContent
                    path={this.props.location.pathname}
                    item={user}
                    albums={albums}
                    friends={friends}
                    curUserId={this.props.curUserId}
                    onSearch={(val, is) => this.onSearch(val, is)}
                />
            </> :
            'Fetching data';
    }
}

export default UserPage;
