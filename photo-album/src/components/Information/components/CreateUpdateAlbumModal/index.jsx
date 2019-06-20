import React, { useState } from "react";
import responseHandler from "../../../../helpers/responseHandler";
import {restSettings} from "../../../../constants";

const CreateUpdateAlbumModal = ({ curUserId, id, item }) => {
    const [name, setName] = useState(item ? item.name : '');
    const [tag, setTag] = useState(item ? item.tag : '');
    const [access, setAccess] = useState(item ? item.access : '0');

    const uploadSingleFile = function uploadSingleFile(file) {
        var formData = new FormData();
        formData.append("file", file);

        // var xhr = new XMLHttpRequest();
        // xhr.open("POST",`${window.host}//uploadFile`);
        //
        //
        //
        // xhr.onload = function () {
        //     console.log(xhr.responseText);
        //     var response = JSON.parse(xhr.responseText);
        //     if (xhr.status == 200) {
        //         singleFileUploadError.style.display = "none";
        //         singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
        //         singleFileUploadSuccess.style.display = "block";
        //     } else {
        //         singleFileUploadSuccess.style.display = "none";
        //         singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        //     }
        // };
        //
        // xhr.send(formData);


        fetch(`${window.host}/uploadFile`, {
            method: 'POST',
            body: formData
        }).then(res => {
            debugger;
            return responseHandler(res).then(x => file = x);
        })
            .then(x => file = x)
            .then(() => {
                debugger;
                fetch(`${window.host}/api/album/${item ? item.id : ''}`, {
                    ...restSettings,
                    method: item ? 'PUT' : 'POST',
                    body: JSON.stringify({
                        name,
                        access,
                        text: tag,
                        userId: curUserId,
                        url: file ? `downloadFile/${file.fileName}` : null
                    })
                }).then(res => responseHandler(res))
                    .then((res) => console.log(res))
                    .catch(() => console.log('creating album error'));
            });
    };

    const onButtonClick = (event) => {
        var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
        var singleFileUploadError = document.querySelector('#singleFileUploadError');

        const files = singleFileUploadInput.files;
        if (files.length === 0) {
            singleFileUploadError.innerHTML = "Please select a file";
            singleFileUploadError.style.display = "block";
        }
        uploadSingleFile(files[0]);
        event.preventDefault();


        //
        // const data = new FormData();
        // data.append('file', file);
        //
        // fetch(`${window.host}/uploadFile`, {
        //     ...restSettings,
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     body: data
        // }).then(res => responseHandler(res))
        //     .then(null, () => {
        //         fetch(`${window.host}/api/album/${item ? item.id : ''}`, {
        //             ...restSettings,
        //             method: item ? 'PUT' : 'POST',
        //             body: JSON.stringify({
        //                 name,
        //                 access,
        //                 text: tag,
        //                 user_id: curUserId,
        //                 url: file ? `img/uploads/${file}` : null
        //             })
        //         }).then(res => responseHandler(res))
        //             .then((res) => console.log(res))
        //             .catch(() => console.log('creating album error'));
        //     });
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

                        <form id="singleUploadForm" name="singleUploadForm">
                            <input id="singleFileUploadInput" type="file" name="file"
                                   className="file-input" required/>
                        </form>
                        <div className="upload-response">
                            <div id="singleFileUploadError"/>
                            <div id="singleFileUploadSuccess"/>
                        </div>

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
                        <button className="btn btn-primary" /*data-dismiss="modal"*/ onClick={(event) => onButtonClick(event)}>{ item ? 'Update' : 'Create'} album</button>
                        <button type="button" data-dismiss="modal" className="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUpdateAlbumModal;
