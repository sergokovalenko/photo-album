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
            console.log(props.curUser.friends.map(el => el.id).includes(itemId));
            this.state = {
                user: null,
                albums: [],
                friends: [],
                isFriend: props.curUser.friends.map(el => el.id).includes(itemId),
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
            (res) => this.setState({ friends: res, isFriend: this.props.curUser.friends.map(el => el.id).includes(id) }),
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
        } else {
            const { friends } = this.state;

            this.setState({
                friends: friends.filter(fr => fr.nickname.includes(value))
            });
        }
    };

    render() {
        const { user, friends, albums, isFriend } = this.state;
        const { curUser, curUserId, location } = this.props;

        return user ?
            <>
                <Information curUserId={curUserId} isUser={true} isFriend={isFriend} item={user} />
                <UserContent
                    path={location.pathname}
                    item={user}
                    albums={albums}
                    friends={friends}
                    curUserId={curUserId}
                    curUser={curUser}
                    isFriend={isFriend}
                    onSearch={(val, is) => this.onSearch(val, is)}
                />
            </> :
            'Fetching data';
    }
}

export default UserPage;
