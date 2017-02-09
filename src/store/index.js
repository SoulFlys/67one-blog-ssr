import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        list: []
    },
    actions: {

        FETCH_LATEST({commit, state}) {
            return api.fetchLatest().then(({data}) => {
                commit('SET_LIST', data)
            })
        }
    },
    mutations: {
        SET_LIST(state, data) {
            state.list = data
        }
    }
})

export default store
