import axios from 'axios'

const defaults = {
    baseURL: 'http://localhost:3000/67api'
}

Object.assign(axios.defaults, defaults)

export const fetchLatest = () => {
    return axios.post('/admin/category')
}
