import React, {useState} from "react";
import responseHandler from "../../../../helpers/responseHandler";
import {restSettings} from "../../../../constants";

const UploadPhoto = ({curUserId, id, item}) => {
    const [tag, setTag] = useState('');

    const uploadSingleFile = function uploadSingleFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        fetch(`${window.host}/uploadFile`, {
            method: 'POST',
            body: formData
        }).then(res => {
            return responseHandler(res).then(x => file = x);
        })
            .then(x => file = x)
            .then(() => {
                fetch(`${window.host}/api/photo`, {
                    ...restSettings,
                    method: 'POST',
                    body: JSON.stringify({
                        text: tag,
                        albumId: item.id,
                        user_id: curUserId,
                        url: file ? `downloadFile/${file.fileName}` : null
                    })
                }).then(res => responseHandler(res))
                    .then((res) => console.log(res))
                    .catch(() => console.log('creating photo error'));
            });
    };

    const onButtonClick = (event) => {
        event.preventDefault();
        const singleFileUploadInput = document.querySelector('#singleFileUploadInput');
        const singleFileUploadError = document.querySelector('#singleFileUploadError');
        const files = singleFileUploadInput.files;

        if (files.length === 0) {
            singleFileUploadError.innerHTML = "Please select a file";
            singleFileUploadError.style.display = "block";
        } else {
            uploadSingleFile(files[0]);
        }
    };

    return (
        <div className="modal fade" id={id ? id : 'addPhoto'} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content row m-3">
                    <form className="m-3">
                        <input id="singleFileUploadInput" type="file" name="file"
                               className="file-input" required />
                        <div className="upload-response">
                            <div id="singleFileUploadError"/>
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
                        <button className="btn btn-primary" onClick={onButtonClick}>Upload photo</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadPhoto;
