<template>
    <div class="index">
        <w-banner></w-banner>
        <div class="content">
            <div class="notice">
                <p><i class="iconfont">&#xe65a;</i>{{basis.tip}}</p>
            </div>
            <div class="main" v-show="false">
                <h3>聚焦</h3>
                <div class="main-baner">
                    <ul>
                        <li>
                            <router-link to="/article/1">
                                <span>归档</span>
                                <img src="../assets/imgs/main-banner-1.jpg" alt="" />
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/article/2">
                                <span>life</span>
                                <img src="../assets/imgs/main-banner-2.jpg" alt="" />
                            </router-link>
                        </li>
                        <li>
                            <a href="#">
                                <span>future</span>
                                <img src="../assets/imgs/main-banner-3.jpg" alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="con">
                <h3>近况</h3>
                <transition-group name="article-list" tag="div" class="article-list">
                    <article v-for="item in articleList" :key="item">
                        <div class="art-pic">
                            <a href="#">
                                <i class="iconfont">&#xe643;</i>
                                <img src="../assets/imgs/tianchen.jpg" alt="" />
                            </a>
                        </div>
                        <div class="art-comment">
                            <p><i class="iconfont">&#xe624;</i>5 条评论</p>
                            <p><i class="iconfont">&#xe609;</i>15 热度</p>
                        </div>
                        <div class="art-con">
                            <div class="art-title">
                                <div class="title"><a href="#">{{item.title}}</a></div>
                                <p>
                                    <i class="iconfont hot">&#xe675;</i>
                                    <i class="iconfont">&#xe711;</i>
                                    2016-07-23
                                </p>
                            </div>
                            <div class="art-text">
                                <p>
                                    终于开始有东西可以做了，是不是很开心呢....
                                </p>
                            </div>
                            <div class="art-info">
                                <p>
                                    <a href="#"><i class="iconfont">&#xe7f0;</i></a>
                                </p>
                            </div>
                        </div>
                        <hr>
                    </article>
                </transition-group>
                <div class="page" v-show="loadingMore">
                    <a @click.prevent="clickloadingMore">加载更多</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import wBanner from './layout/banner';
import {mapGetters} from 'vuex'

const fetchGlobal = store => store.dispatch('FETCH_GLOBAL')
const fetchBasis = store => store.dispatch('FETCH_BASIS')
const fetchArticleList = store => store.dispatch('FETCH_ARTICLELIST')

export default {
    name: 'index',
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            basis: 'getBasis',
            articleList: 'getArticleList',
            loadingMore: 'getLoadingMore'
        })
    },
    preFetch: fetchGlobal,
    beforeMount() {
        if(!Object.keys(this.$store.state.basis).length){
            fetchBasis(this.$store)
        }
        if(!this.$store.state.articleList.length){
            fetchArticleList(this.$store)
        }
    },
    methods: {
        clickloadingMore(event){
            event.target.innerText = '';
            event.target.className = 'loadingMore';
            this.$store.commit('SET_CURRENTPAGE');
            setTimeout(()=>{
                fetchArticleList(this.$store)
                event.target.innerText = '加载更多';
                event.target.className = '';
            },1000)
        }
    },
    components: {
        wBanner
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/constant'
@import '../assets/stylus/function'
.index
    .content
        width: $mainWidth
        margin: 0 auto
        .notice
            padding: 20px 30px
            margin:40px auto 50px
            background: $index-noticeBg
            border-radius: 3px
            relative: top left
            &:before
                content: ""
                width: 0
                height: 0
                border-left: 10px solid transparent
                border-right: 10px solid transparent
                border-bottom: 10px solid $index-noticeBg
                absolute: left 20px top -8px
            p
                color: $index-notice
                i
                    margin-right: 10px
                    color: $index-noticeIcon
        .main
            width:100%
            margin-top: 30px
            h3
                color: $index-h3
                font-size: 16px
                font-weight: 400
                padding-bottom: 15px
                border-bottom: 1px dashed #ECECEC
                margin:10px 0
            .main-baner
                margin-top: 10px
                ul
                    clearfix()
                    li
                        width: 262px
                        height: 162px
                        float: left
                        &:nth-child(2)
                            margin:0 7px
                        a
                            db()
                            relative:top left
                            &:hover
                                span
                                    opacity:0.8
                            span
                                db()
                                absolute:top left
                                width: 262px
                                height: 162px
                                line-height: 162px
                                text-align: center
                                background: $index-bannerBg
                                color: $index-banner
                                opacity:0
                                transition:opacity .4s ease-out
                            img
                                width: 262px
                                height: 162px
        .con
            width: 100%
            padding: 80px 0 0
            h3
                color: $index-h3
                font-size: 16px
                font-weight: 400
                padding-bottom: 15px
                border-bottom: 1px dashed $index-h3Bom
                margin:10px 0
            .article-list-enter, .article-list-leave-active
                opacity: 0
                transform: translateY(30px)
            article
                clearfix()
                width:100%
                margin-bottom:30px
                relative: z-index 1
                transition: all 1s
                &:hover
                    .art-comment
                        left:-92px
                        opacity:1
                .art-pic
                    width:100px
                    float: left
                    margin-top: 10px
                    relative: z-index 2
                    &:hover
                        a
                            i
                                opacity:1
                    a
                        db()
                        width: 100px
                        height: 100px
                        overflow: hidden
                        i
                            db()
                            font-size: 25px
                            color: $index-picIcon
                            width: 80px
                            linHeight(80px)
                            text-align: center
                            background: $index-picIconBg
                            overflow:hidden
                            border-radius: 50%
                            opacity:0
                            absolute: top 10px left 10px
                            z-index:2

                        img
                            width: 100px
                            height: 100px
                            padding: 2px
                            border: 1px solid $index-picBorder
                            border-radius:50%
                            box-sizing()

                .art-comment
                    absolute: top 32px left -25px
                    z-index:0
                    border-top: 1px solid $index-commentBoderTop
                    padding-top:8px
                    opacity:0
                    transition: 0.6s all ease
                    p
                        color: $index-comment
                        font-size: 13px
                        line-height:27px
                        i
                            margin-right: 10px

                .art-con
                    width:670px
                    margin-left:30px
                    float: left
                    .art-title
                        relative:top left
                        .title
                            width:520px
                            white-space: nowrap
                            overflow: hidden
                            text-overflow: ellipsis
                            font-weight: 400
                            line-height: 50px
                            a
                                color: $index-artTitle
                                font-size: 20px
                                &:hover
                                    color:$index-artTitleHover
                        p
                            absolute: top 16px right 0
                            font-size: 12px
                            color: $index-artTime
                            letter-spacing: 1px
                            i
                                font-size: 13px
                                &.hot
                                    color:$index-artHot
                    .art-text
                        p
                            min-height: 60px
                            font-size: 14px
                            color: $index-artText
                            letter-spacing: 1px
                            line-height: 30px
                            overflow: hidden
                            text-overflow: ellipsis
                            display: -webkit-box
                            -webkit-box-orient: vertical
                            -webkit-line-clamp: 2
                    .art-info
                        margin-top: 5px
                        user-select:none
                        p
                            line-height: 35px
                            text-align: right
                            a
                                cursor: pointer
                            i
                                color:$index-artMore
                                font-size: 28px
                                &:hover
                                    color:$index-artMoreHover
                hr
                    width: 30%
                    height: 1px
                    margin: 0 auto
                    border: 0
                    background: $index-artHr
</style>
