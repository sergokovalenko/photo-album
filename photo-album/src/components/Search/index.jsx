import React from "react";
import {Link} from "react-router-dom";

const Search = ({ onChange, onClick, className, value, url, placeholder }) => {
    return (
        <div className={`input-group ${className}`}>
            <input
                type="text"
                className="form-control"
                placeholder={placeholder ? placeholder : 'Search'}
                onChange={(e) => onChange(e)}
                value={value}
            />
            <div className="input-group-append">
                <Link
                    to={url}
                    className="btn btn-outline-primary"
                    onClick={() => onClick()}
                >
                    Search
                </Link>
            </div>
        </div>
    );
};

export default Search;