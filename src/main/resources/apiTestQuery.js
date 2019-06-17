fetch(
    'http://localhost:8080/api/photo',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/photo',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: 'first text ' + (new Date()).getMinutes(),
            user_id: 0
        })
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/photo/1',
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: 'updated text ' + (new Date()).getMinutes(),
            user_id: 1,
            likes: 1
        })
    }
).then(result => result.json().then(x => console.log(x)));


fetch(
    'http://localhost:8080/api/photo/1',
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
).then(result => console.log(result));

// ALBUM

fetch(
    'http://localhost:8080/api/album/1',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/album',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "test public album",
            user_id: 8,
            access: "ALL"
        })
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/album/3',
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'new album name',
            user_id: 9,
            access: "ME",
            url: ""
        })
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/album/3',
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
).then(result => console.log(result));

// COMMENT

fetch(
    'http://localhost:8080/api/comment/getCommentsByAlbumId/1',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/comment/createComment',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "a new interesting comment",
            user: 8,
            album: 1,
            url: ""
        })
    }
).then(result => result.json().then(x => console.log(x)));


// USER

fetch(
    'http://localhost:8080/api/user',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            lastName: 'lastname',
            firstName: 'firstName',
            nickname: 'nickname',
            birthDate: Date.now(),
            email: 'email',
            password: 'password'
        })
    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/user/1',
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
).then(result => console.log(result));

fetch(
    'http://localhost:8080/img/uploads/1.png',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
).then(result => console.log(result));

"http://localhost:8080/api/album/getPhotosByAlbumId/1"

fetch(
    'http://localhost:8080/api/photo/likePhoto/4/8',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/user/addFriendToUser/8/9',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/user/getFriendsByNicknameLastFirst/8/Vitya',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/user/getUsersByNicknameLastFirst/Vitya',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }
).then(result => result.json().then(x => console.log(x)));

fetch(
    'http://localhost:8080/api/user/getFriendsById/8',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }
).then(result => result.json().then(x => console.log(x)));

fetch(`${window.host}/loginAlreadyExists/Vovan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
}).then(x => x.json()).then(x => console.log(x))

window.$.ajax({
    url: 'http://localhost:8080/authorization/Vano/12345678',
    method: 'POST',
    success: function (request) {
        console.log(request);
    },
    error: function (error) {
        alert('error');
        console.log(error);
    }
});

