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
        foucs: [],          //聚焦列表
        article: {},        //文章内容
        allArticleList: [], //归档所有文章列表（不分页）

        articleList: [],    //首页分页文章列表
        currentPage: 1,     //首页当前页
        pageSize: 5,
        loadingMore: true   //首页加载更多
    },
    actions: {
        async FETCH_GLOBAL({commit, state}) {
            let pagination = {currentPage:state.currentPage,pageSize:state.pageSize};
            let params = Object.assign(pagination,state.route.params)
            let { data:data,status} = await api.fetch('/blog/global',params);
            commit('SET_GLOBAL', data)
        },
        //获取分类信息
        async FETCH_CATEGORY({commit, state}) {
            let { data:data,status } = await api.fetch('/blog/category')
            commit('SET_CATEGORY', data)
        },
        //获取网站基础信息
        async FETCH_BASIS({commit, state}) {
            let { data:data,status } = await api.fetch('/blog/basis')
            commit('SET_BASIS', data)
        },
        //获取友情链接
        async FETCH_LINKS({commit, state}) {
            let { data:data,status } = await api.fetch('/blog/link')
            commit('SET_LINKS', data)
        },
        //获取某一篇文章
        async FETCH_ARTICLE({ commit, state }) {
            let { data:data,status } = await api.fetch('/blog/article/findById',state.route.params);
            commit('SET_ARTICLE', data)
        },
        async FETCH_ARTICLELIST({commit, state}) {
            let { data:data } = await api.fetch('/blog/article',{currentPage:state.currentPage,pageSize:state.pageSize})
            commit('SET_ARTICLELIST', data)
        },
        //获取所有文章列表
        async FETCH_ALLARTICLELIST({commit, state}) {
            let { data:data,status } = await api.fetch('/blog/allArticle')
            commit('SET_ALLARTICLELIST', data)
        },
    },
    mutations: {

        SET_GLOBAL(state, data){
            state.category = data.category;
            state.basis = data.basis;
            state.links = data.links;
            state.foucs = data.foucs;
            state.articleList = data.articleList;
            if(data.articleList.length >= data.count){
                state.loadingMore = false;
            }

            if(!_.isEmpty(data.article)){
                data.article.content = marked(data.article.content)
                state.article = data.article;
            }
        },

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
        SET_CURRENTPAGE(state, data){
            state.currentPage++
        },
        SET_ARTICLELIST(state, data){
            if(state.articleList.length + data.articleList.length >= data.count){
                state.loadingMore = false;
            }

            _.each(data.articleList,(item)=>{
                state.articleList.push(item)
            })
        },
        SET_ALLARTICLELIST(state, data){
            state.allArticleList = data
        }
    },

    getters: {
        progress (state) {
          return state.progress
        },
        isLoadingAsyncComponent (state) {
          return state.isLoadingAsyncComponent
        },
        getCategory: state => state.category,
        getBasis: state => state.basis,
        getLinks: state => _.groupBy(state.links,'type'),
        getArticle: state => {
            // state.article.createAt = state.article.meta.createAt
            // state.article.updateAt = state.article.meta.updateAt
            // console.log(state.article)
            return state.article
        },
        getArticleList: state => state.articleList,
        getLoadingMore: state => state.loadingMore,
        getAllArticleList: state => {
            _.each(state.allArticleList,(item,key)=>{
                item.groupByDate = formatDate(item.meta.createAt,'yyyy-MM')
            })

            return _.groupBy(state.allArticleList,'groupByDate');
        }
    }
})

export default store
