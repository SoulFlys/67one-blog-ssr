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

    return axios.post(target, query).then((response) => {
        if (shouldCache) api.cache.set(target, response)
        return response
    })
}


// export const fetchCategory = () => {
//     return fetch('/blog/category')
// }
//
// export const fetchBasis = () => {
//     return fetch('/blog/basis')
// }
//
// export const fetchLinks = () => {
//     return fetch('/blog/link')
// }
//
// export const fetchArticle = (params) => {
//     return fetch('/blog/article/findById',params)
// }
//
// export const fetchArticleList = (params) => {
//     return fetch('/blog/article',params)
// }
//
// export const fetchAllArticleList = () => {
//     return fetch('/blog/allArticle')
// }

export const hits = () => {
    return fetch('/blog/basis/hits')
}

export const readings = (params) => {
    return fetch('/blog/article/readings',params)
}
