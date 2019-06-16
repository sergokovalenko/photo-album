import React, {useState} from "react";
import responseHandler from "../../../../helpers/responseHandler";
import {restSettings} from "../../../../constants";

const UploadPhoto = ({curUserId, id, item}) => {
    const [tag, setTag] = useState(item ? item.tag : '');
    const onButtonClick = () => {
        const data = new FormData();
        const file = document.getElementById('file').files[0];

        data.append('file', file);

        fetch(`${window.host}/api/photo`, {
            // ...restSettings,
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: data
        }).then(res => responseHandler(res))
            .then((res) => console.log(res))
            .catch(() => alert('error sending file'));

        // fetch(`${window.host}/api/album/${item ? item.id : ''}`, {
        //     ...restSettings,
        //     method: 'PUT'
        //     body: JSON.stringify({
        //         user_id: curUserId,
        //         text: tag,
        //         url: '' // from prev response
        //     })
        // }).then(res => responseHandler(res))
        //     .then((res) => console.log(res))
        //     .catch(() => alert('creating album error'));
    };

    return (
        <div className="modal fade" id={id ? id : 'addPhoto'} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content row m-3">
                    <form className="m-3">
                        <div className="form-group">
                            <label htmlFor="file">Select file</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="file"
                                accept="image/*,image/jpeg,image/png"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tags">Tags:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tags"
                                placeholder="tag1 tag@2 tag_3"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => onButtonClick()}>Upload photo</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadPhoto;
