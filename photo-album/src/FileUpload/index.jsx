import React, {Component} from 'react';

class FileUpload extends Component {

    componentDidMount() {
        var singleUploadForm = document.querySelector('#singleUploadForm');
        var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
        var singleFileUploadError = document.querySelector('#singleFileUploadError');
        var singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

        var multipleUploadForm = document.querySelector('#multipleUploadForm');
        var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');
        var multipleFileUploadError = document.querySelector('#multipleFileUploadError');
        var multipleFileUploadSuccess = document.querySelector('#multipleFileUploadSuccess');

        function uploadSingleFile(file) {
            var formData = new FormData();
            formData.append("file", file);

            var xhr = new XMLHttpRequest();
            xhr.open("POST",`${window.host}//uploadFile`);

            xhr.onload = function () {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    singleFileUploadError.style.display = "none";
                    singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
                    singleFileUploadSuccess.style.display = "block";
                } else {
                    singleFileUploadSuccess.style.display = "none";
                    singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
                }
            };

            xhr.send(formData);
        }

        function uploadMultipleFiles(files) {
            const formData = new FormData();
            for (var index = 0; index < files.length; index++) {
                formData.append("files", files[index]);
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", `${window.host}/uploadMultipleFiles`);

            xhr.onload = function () {
                console.log(xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    multipleFileUploadError.style.display = "none";
                    let content = "<p>All Files Uploaded Successfully</p>";
                    for (let i = 0; i < response.length; i++) {
                        content += "<p>DownloadUrl : <a href='" + response[i].fileDownloadUri + "' target='_blank'>" + response[i].fileDownloadUri + "</a></p>";
                    }
                    multipleFileUploadSuccess.innerHTML = content;
                    multipleFileUploadSuccess.style.display = "block";
                } else {
                    multipleFileUploadSuccess.style.display = "none";
                    multipleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
                }
            };

            xhr.send(formData);
        }

        singleUploadForm.addEventListener('submit', function (event) {
            const files = singleFileUploadInput.files;
            if (files.length === 0) {
                singleFileUploadError.innerHTML = "Please select a file";
                singleFileUploadError.style.display = "block";
            }
            uploadSingleFile(files[0]);
            event.preventDefault();
        }, true);


        multipleUploadForm.addEventListener('submit', function (event) {
            const files = multipleFileUploadInput.files;
            if (files.length === 0) {
                multipleFileUploadError.innerHTML = "Please select at least one file";
                multipleFileUploadError.style.display = "block";
            }
            uploadMultipleFiles(files);
            event.preventDefault();
        }, true);
    }

    render() {
        return (
            <div className="upload-content">
                <div className="single-upload">
                    <h3>Upload Single File</h3>
                    <form id="singleUploadForm" name="singleUploadForm">
                        <input id="singleFileUploadInput" type="file" name="file"
                               className="file-input" required/>
                        <button type="submit" className="primary submit-btn">Submit
                        </button>
                    </form>
                    <div className="upload-response">
                        <div id="singleFileUploadError"/>
                        <div id="singleFileUploadSuccess"/>
                    </div>
                </div>
                <div className="multiple-upload">
                    <h3>Upload Multiple Files</h3>
                    <form id="multipleUploadForm" name="multipleUploadForm">
                        <input id="multipleFileUploadInput" type="file" name="files"
                               className="file-input" multiple required/>
                        <button type="submit" className="primary submit-btn">Submit
                        </button>
                    </form>
                    <div className="upload-response">
                        <div id="multipleFileUploadError"/>
                        <div id="multipleFileUploadSuccess"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUpload;
