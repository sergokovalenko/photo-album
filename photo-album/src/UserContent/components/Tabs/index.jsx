import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = props => {
    return (
        <div className="tabs">
            <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <Link to="/user/" className={`nav-link ${props.activeTab === 0 ? 'active' : ''}`} href="#">All photos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/user/albums" className={`nav-link ${props.activeTab === 1 ? 'active' : ''}`} href="#">Albums</Link>
                </li>
                <li className="nav-item">
                    <Link to="/user/friends" className={`nav-link ${props.activeTab === 2 ? 'active' : ''}`} href="#">Friends</Link>
                </li>
            </ul>
        </div>
    );
};

export default Tabs;
