import axios from 'axios';

export default axios.create({
    baseUrl: "http://localhost:5000",
    headers: {
        'Content-type': 'application/json'
    }
});