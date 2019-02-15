export default function request(url, method, body) {
    const options = {
        method: method || 'GET',
    };

    if (body) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(body);
    }
    return fetch(`http://localhost:5000/monitor/${url}`, options)
        .then(res => {
            if (res) {
                return res.json();
            }
        })
        .catch(console.log);
}
