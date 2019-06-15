export default (response) => {
    if (response.ok) {
        return response.json();
    }

    throw Error('request error');
};