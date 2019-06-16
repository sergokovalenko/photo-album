import React, { useState } from "react";
import responseHandler from "../../../../helpers/responseHandler";
import {restSettings} from "../../../../constants";

const CreateUpdateAlbumModal = ({ curUserId, id, item }) => {
    const [name, setName] = useState(item ? item.name : '');
    const [tag, setTag] = useState(item ? item.tag : '');
    const [access, setAccess] = useState(item ? item.access : '0');
    const onButtonClick = () => {
        const data = new FormData();
        const file = document.getElementById('file').files[0];
        data.append('file', file);

        fetch(`${window.host}/api/photo`, {
            body: data,
            dataType: 'json',
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 'Content-Length': file.size,
            }
            })
            .then(res => responseHandler(res))
            .then((res) => console.log(res))
            .catch(() => alert('error sending file'));

        // fetch(`${window.host}/api/album/${item ? item.id : ''}`, {
        //     ...restSettings,
        //     body: JSON.stringify({
        //         name,
        //         access,
        //         text: tag,
        //         url: '' // from prev response
        //     })
        // }).then(res => responseHandler(res))
        //     .then((res) => console.log(res))
        //     .catch(() => alert('creating album error'));
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { item ? <input type="text" value={item.id} hidden readOnly /> : null }
                        <form id="photo" encType="multipart/form-data"  className="form-group">
                            <label htmlFor="photo">Album picture</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="file"
                            />
                        </form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Creative name for your memories"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tags:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tags"
                                placeholder="tag1 tag_2 tag.3"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label htmlFor="exampleFormControlSelect1">Visible for:</label>
                                <select value={access} className="form-control" id="access" onChange={(e) => setAccess(e.target.value)}>
                                    <option value="0">All</option>
                                    <option value="1">Friends</option>
                                    <option value="2">Only me</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal" onClick={() => onButtonClick()}>{ item ? 'Update' : 'Create'} album</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUpdateAlbumModal;
