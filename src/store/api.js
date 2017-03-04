import axios from 'axios'
import store from './index'
import api from 'create-api'

const prefix = `${api.host}`
const shouldCache = api.onServer

export const fetch = (model, query) => {
    const target = `${prefix}${model}`
    if (shouldCache && api.cache.has(target)) {
        return Promise.resolve(api.cache.get(target))
    }

    return axios.get(target, {params:query}).then((response) => {
        if (shouldCache) api.cache.set(target, response)
        return response
    })
}

export const fetch1 = (model, query) => {
    const target = model
    if (shouldCache && api.cache.has(target)) {
        return Promise.resolve(api.cache.get(target))
    }

    return axios.get(target, {params:query}).then((response) => {
        if (shouldCache) api.cache.set(target, response)
        return response
    })
}


export const hits = () => {
    return fetch('/blog/basis/hits')
}

export const readings = (params) => {
    return fetch('/blog/article/readings',params)
}
