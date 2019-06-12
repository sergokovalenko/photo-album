import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = ({ itemId, activeTab, isUser = true }) => (
    <div className="tabs">
        <ul className="nav nav-tabs nav-justified">
            <li className="nav-item">
                <Link
                    to={`/${isUser ? 'user' : 'album'}/${itemId}/`}
                    className={`nav-link ${activeTab === 0 || !isUser ? 'active' : ''}`}
                    href="#"
                >
                    All photos
                </Link>
            </li>
            {
                isUser ?
                    <>
                        <li className="nav-item">
                            <Link to={`/user/${itemId}/albums`} className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="#">Albums</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/user/${itemId}/friends`} className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="#">Friends</Link>
                        </li>
                    </> :
                    null
            }
        </ul>
    </div>
);

export default Tabs;
