import React from 'react';
import { Route } from 'react-router-dom';
import Content from './../Content';

const MainApp = () => {
    return (
        <Route path='/' render={(props) => (
                <div className="container">
                    <Content {...props} />
                </div>
            )}
        />
    );
};

export default MainApp;
