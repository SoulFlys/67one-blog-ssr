import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import _ from "lodash"
import marked from 'marked'
import { formatDate } from '../filters/index'

Vue.use(Vuex)

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

const store = new Vuex.Store({
    state: {
        category: [],
        basis: {},
        links: [],
        foucs: [],
        article: {},          //文章内容
        list: [],           //首页分页文章列表
        allArtList: [],     //所有文章（不分页）
    },
    actions: {
        //获取分类信息
        async FETCH_CATEGORY({commit, state}) {
            let { data:data } = await api.fetch('/blog/category')
            commit('SET_CATEGORY', data)
        },
        //获取网站基础信息
        async FETCH_BASIS({commit, state}) {
            let { data:data } = await api.fetch('/blog/basis')
            commit('SET_BASIS', data)
        },
        //获取友情链接
        async FETCH_LINKS({commit, state}) {
            let { data:data } = await api.fetch('/blog/link')
            commit('SET_LINKS', data)
        },
        //获取某一篇文章
        async FETCH_ARTICLE({ commit, state }) {
            let { data:data } = await api.fetch('/blog/article/findById',state.route.params);
            commit('SET_ARTICLE', data)
        },
        //获取首页文章列表
        async FETCH_LIST({commit, state}) {
            let { data:data } = await api.fetch('/blog/article',state.route.params)
            commit('SET_LIST', data)
        },
        //获取所有文章列表
        async FETCH_ALLARTLIST({commit, state}) {
            let { result:result } = await api.fetch('/blog/allArticle')
            console.log('result',result)
            commit('SET_ALLARTLIST', result)
        },
    },
    mutations: {
        //分类信息
        SET_CATEGORY(state, data){
            state.category = data
        },
        SET_BASIS(state, data){
            state.basis = data
        },
        SET_LINKS(state, data){
            state.links = data
        },
        SET_ARTICLE(state, data){
            data.content = marked(data.content)
            state.article = data
        },
        SET_LIST(state, data){
            if(state.list.length + data.articleList.length >= data.count){
                state.loadingMore = false;
            }

            _.each(data.articleList,(item)=>{
                state.list.push(item)
            })
        },
        SET_ALLARTLIST(state, data){
            state.allArticle = data
        }
    },

    getters: {
        getCategory: state => state.category,
        getBasis: state => state.basis,
        getLinks: state => _.groupBy(state.links,'type'),
        getArticle: state => state.article,
        getList: state => state.list,
        getAllArticle: state => {
            _.each(state.allArticle,(item,key)=>{
                item.groupByDate = formatDate(item.meta.createAt,'yyyy-MM')
            })

            return _.groupBy(state.allArticle,'groupByDate');
        },
    }
})

export default store
