import {restSettings} from "../constants";
import responseHandler from "./responseHandler";

const addFriend = (curUserId, friendId) => {
    fetch(`${window.host}/api/user/addFriendToUser/${curUserId}/${friendId}`, {
        ...restSettings,
        method: 'GET'
    }).then(res => responseHandler(res))
        .then((res) => console.log(res))
        .catch(() => {
            alert('error fetching friends')
        });
};

export default addFriend;
