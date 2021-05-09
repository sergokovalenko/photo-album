import {restSettings} from "../constants";
import responseHandler from "./responseHandler";

const addFriend = (curUserId, friendId) => {
    return fetch(`${window.host}/api/user/addFriendToUser/${curUserId}/${friendId}`, {
        ...restSettings,
        method: 'GET'
    }).then(res => responseHandler(res))
        .then((res) => console.log(res))
        .catch(() => {
            console.log('error fetching friends')
        })
};

export default addFriend;
