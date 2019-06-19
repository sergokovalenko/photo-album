import {restSettings} from "../constants";
import responseHandler from "./responseHandler";

const fetcher = (url, thenFunc, errorString = 'error') => {
    fetch(url, {
        ...restSettings,
        method: 'GET'
    }).then(res => responseHandler(res))
        .then((res) => {
            thenFunc(res);
        })
        .catch(() => {
            alert(errorString);
        });
};

export default fetcher;
