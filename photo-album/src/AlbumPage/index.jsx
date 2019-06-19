import React, { Component } from 'react';
import fetcher from "../helpers/fetcher";
import Information from "../components/Information";
import {restSettings} from "../constants";
import responseHandler from "../helpers/responseHandler";
import AlbumContent from "./AlbumContent";

class AlbumPage extends Component {
    constructor(props) {
        super(props);
        const itemId = isNaN(parseInt(props.match.params.itemId)) ? 1 : parseInt(props.match.params.itemId);

        this.state = {
            albumId: itemId,
            album: null,
            photos: [],
            comments: []
        };
        this.getData(itemId);
    }

    componentDidUpdate(prevProps, prevState) {
        const itemId = isNaN(parseInt(this.props.match.params.itemId)) ? 1 : parseInt(this.props.match.params.itemId);

        if (prevState.album && prevState.album.id !== itemId) {
            this.getData(itemId);
        }
    }

    getData = (id) => {
        fetcher(
            `${window.host}/api/album/${id}`,
            (res) => this.setState({ album: res }),
            'error fetching albums'
        );
        fetcher(
            `${window.host}/api/album/getPhotosByAlbumId//${id}`,
            (res) => this.setState({ photos: res }),
            'error fetching photos'
        );
        fetcher(
            `${window.host}/api/comment/getCommentsByAlbumId/${id}`,
            (res) => {
                console.log(res);
                const fetches = res.reduce((acc, val) => {
                    acc.push(fetch(`${window.host}/api/user/${val.user}`, {
                        ...restSettings,
                        method: 'GET'
                    }).then(res => responseHandler(res)));

                    return acc;
                }, []);

                Promise.all(fetches).then((users) => {
                    const mapped = res.map(comm => ({
                        ...users.find(user => user.id === comm.user),
                        ...comm
                    }));
                    this.setState({ comments: mapped.reverse() });
                }, () => alert('Опять в бд кривой id для юзера'));
            },
            'error fetching comments'
        );
    };

    createComment = (text) => {
        if (!text || !text.trim()) {
            return;
        }

        const { albumId } = this.state;
        const { curUserId } = this.props;

        fetch(`${window.host}/api/comment/createComment`, {
            ...restSettings,
            body: JSON.stringify({
                user: curUserId,
                text: text,
                album: albumId
            })
        }).then(res => responseHandler(res))
            .then(() => {
                this.getData(albumId);
            })
            .catch(() => {
                alert('comment wasn\'t sent')
            });
    };

    render() {
        const { album, photos, comments } = this.state;

        return album ?
            <>
                <Information curUserId={this.props.curUserId} isUser={false} item={album} />
                <AlbumContent
                    createComment={(val) => this.createComment(val)}
                    path={this.props.location.pathname}
                    item={album}
                    photos={photos}
                    comments={comments}
                    onSearch={(val, is) => this.onSearch(val, is)}
                />
            </> :
            'Fetching data';
    }
}

export default AlbumPage;
