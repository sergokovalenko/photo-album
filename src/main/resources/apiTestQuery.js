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