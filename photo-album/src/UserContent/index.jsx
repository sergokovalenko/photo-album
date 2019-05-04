import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from './components/Tabs';
import Photos from './components/Photos';

const photos = [
    { url: 'https://im0-tub-ru.yandex.net/i?id=26de86a824ce957a2d1748be27eb358e-l&n=13', name: 'name1' },
    { url: 'https://im0-tub-ru.yandex.net/i?id=c1923033276d94680bf940048b53d420-l&n=13', name: 'name2' },
    { url: 'https://im0-tub-ru.yandex.net/i?id=2b9ee8c1720008d0370dc729e7c8ac57-l&n=13', name: 'name3' },
    { url: 'https://im0-tub-ru.yandex.net/i?id=f050e40a84848bf5f70f55405e7b3a7b-l&n=13', name: 'name4' },
    { url: 'https://im0-tub-ru.yandex.net/i?id=dbfdc7a3a246cf0cb7ad66899416e386-l&n=13', name: 'name5' }
];

const UserContent = (props) => {
    const path = props.location.pathname;
    const activeTab = /albums/.test(path) ? 1 : (/friends/.test(path) ? 2 : 0);

    return (
        <div className="wrapper">
            <Tabs activeTab={activeTab} />
            <Switch>
                <Route exact path="/user" render={(props) => <Photos {...props} photos={photos} />} />
                <Route path="/user/albums" render={() => 'albums'} />
                <Route path="/user/friends" render={() => 'friends'} />
            </Switch>
        </div>
    );
};

export default UserContent;
