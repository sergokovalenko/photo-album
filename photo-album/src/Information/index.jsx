import React, { Component } from 'react';
import Button from './../components/Button';
import './index.scss';

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBioShown: false
        }
    }

    showBio = () => {
        this.setState(state => ({ isBioShown: !state.isBioShown }));
    }

    render() {
        const { isBioShown } = this.state;
        const {
            biografy = 'biografy',
            name = 'Name Surname',
            nickName = 'nickname',
            photoCount = 5,
            url = 'https://im0-tub-ru.yandex.net/i?id=1ccc212c9173bbd571b5721dd8a0b1d1-l&n=13'
        } = this.props;
        const onClick = () => console.log('click');

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
                            <div className="user-info">
                                <div className="user-info-name">{name}</div>
                                <div className="user-info-nick ml-3">{nickName}</div>
                                <div className="user-info-bio">
                                    <span>About: </span>
                                    {
                                        isBioShown ?
                                            <span>{biografy} </span> :
                                            null
                                    }
                                    <span className="user-info-bio--link" onClick={() => this.showBio()}>
                                        {isBioShown ? 'Hide...' : 'Show...'}
                                    </span>
                                </div>
                                <div className="user-info-photos">{photoCount} photos</div>
                            </div>
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
    }
}

export default Information;
