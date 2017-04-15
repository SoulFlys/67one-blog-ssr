import axios from 'axios'
import store from './index'
import api from 'create-api'

const prefix = `${api.host}`
const shouldCache = api.onServer


// var urlEncode = function(param, key, encode) {
//     if (param == null)
//         return '';
//     var paramStr = '';
//     var t = typeof(param);
//     if (t == 'string' || t == 'number' || t == 'boolean') {
//         paramStr += '&' + key + '=' + ((encode == null || encode)
//             ? encodeURIComponent(param)
//             : param);
//     } else {
//         for (var i in param) {
//             var k = key == null
//                 ? i
//                 : key + (param instanceof Array
//                     ? '[' + i + ']'
//                     : '.' + i);
//             paramStr += urlEncode(param[i], k, encode);
//         }
//     }
//     return paramStr;
// };


export const fetch = (model, query) => {
    const target = `${prefix}${model}`
    // console.log(query,urlEncode(query))
    // if (shouldCache && api.cache.has(target)) {
        // return Promise.resolve(api.cache.get(target))
    // }

    return axios.get(target, {params:query}).then((response) => {
        // if (shouldCache) api.cache.set(target, response)
        return response
    })
}

// export const fetch1 = (model, query) => {
//     const target = model
//     if (shouldCache && api.cache.has(target)) {
//         return Promise.resolve(api.cache.get(target))
//     }
//
//     return axios.get(target, {params:query}).then((response) => {
//         if (shouldCache) api.cache.set(target, response)
//         return response
//     })
// }


export const hits = () => {
    return fetch('/blog/basis/hits')
}

export const readings = (params) => {
    return fetch('/blog/article/readings',params)
}
