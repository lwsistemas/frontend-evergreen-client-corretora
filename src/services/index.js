import axios from 'axios'
const https = require('https')

const api = axios.create({
    
    //baseURL: 'http://localhost:3097/',
    baseURL: 'https://back-main.infinitycapital.global/',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})
export default api;
