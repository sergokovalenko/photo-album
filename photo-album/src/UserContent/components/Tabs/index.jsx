import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = ({ userId, activeTab }) => (
    <div className="tabs">
        <ul className="nav nav-tabs nav-justified">
            <li className="nav-item">
                <Link to={`/user/${userId}/`} className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href="#">All photos</Link>
            </li>
            <li className="nav-item">
                <Link to={`/user/${userId}/albums`} className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="#">Albums</Link>
            </li>
            <li className="nav-item">
                <Link to={`/user/${userId}/friends`} className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="#">Friends</Link>
            </li>
        </ul>
    </div>
);

export default Tabs;
