import axios from 'axios';


export default axios.create({
    baseURL: 'http://192.168.0.242:7070'
    // baseURL: 'http://83.136.248.110:7070'
})
