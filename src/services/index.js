import axios from 'axios'
const https = require('https')
const api = axios.create({    
    baseURL: 'http://192.168.0.100:3097/',
    //baseURL: 'https://adm-api.evergreenbroker.co.uk/',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})
export default api;


