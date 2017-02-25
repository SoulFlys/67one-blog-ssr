<template lang="html">
    <div class="article con">
        <div class="title">
            <h1>{{article.title}}</h1>
            <hr>
        </div>
        <div class="main">
            <div class="markdown" id="markdown" v-html="article.content"></div>
        </div>
        <div class="tags">
            <div class="tag">
                <i class="iconfont">&#xe60c;</i>
                <a href="#">vue</a>
                <a href="#">nodejs</a>
            </div>
            <div class="like">
                <i class="iconfont">&#xe624;</i>
                <span>{{article.comment}}</span>
                <i class="iconfont">&#xe609;</i>
                <span>{{article.readings}}</span>
                <i class="iconfont">&#xe711;</i>
                <span>{{article.createAt | formatDate('yyyy-MM-dd')}}</span>
            </div>
        </div>
        <div class="author">
            <div class="author-info">
                <a href="#" class="author-img">
                    <img :src="rootUrl+basis.pic" alt="" />
                </a>
                <p>
                    <a href="#">67one</a>
                </p>
            </div>
            <div class="author-motto">
                <p>
                    <i class="iconfont">&#xe60b;</i>时光笑我温暖如阳
                </p>
            </div>
        </div>
        <div class="comment">
            <div class="comment-btn" @click="abc" v-show="comment">
                <i class="iconfont">&#xe624;</i>查看评论
            </div>
        </div>
        <div id="comment-box" v-show="!comment"></div>


        <div id="SOHUCS" ></div>
        <!-- <script charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/changyan.js" ></script>
        <script type="text/javascript">
        window.changyan.api.config({
        appid: 'cyrktPNjT',
        conf: 'prod_a00cd669fe4f7e0eb5fba559ea485c82'
        });
        </script> -->
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '../../store/api'
import { host } from '../../store/config'
// import '../../lib/changyan'

const fetchGlobal = store => store.dispatch('FETCH_GLOBAL')
const fetchArticle = async store => {
    if(!store.state.category.length) await store.dispatch('FETCH_GLOBAL')
    await store.dispatch('FETCH_ARTICLE')
}

const preFetch = (store, { path: pathName, params, query }, callback) => {
    return store.dispatch('FETCH_ARTICLE',{query:store.state.route},callback})
}
// function preFetch (store, { path: pathName, params, query }, callback) {
//   return store.dispatch('FETCH_TAGS', {
//     model: 'post',
//     query: {
//       conditions: {
//         type: 'post',
//         isPublic: true
//       },
//       select: {
//         _id: 0,
//         tags: 1
//       }
//     },
//     callback
//   })
// }

export default {
    data() {
        return {
            rootUrl:host,
            comment: true
        }
    },
    computed: {
        ...mapGetters({
            article: 'getArticle',
            basis: 'getBasis'
        })
    },
    preFetch: preFetch,
    beforeMount() {
        if(this.$route.params.id !== this.$store.state.article._id){
            fetchArticle(this.$store)
        }
    },
    beforeRouteEnter(to, from, next){
        // document.querySelector('.loading').className="loading aaa";
        // document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        // next();
        // setTimeout(()=>{
        //     document.querySelector('.loading').className="loading";
        //     document.getElementsByTagName('body')[0].style.overflow = 'auto';
        // },1000)
        // document.querySelector('.preloader').className="preloader loading";
        // document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        // next();
        // setTimeout(()=>{
        //     document.querySelector('.preloader').className="preloader";
        //     document.getElementsByTagName('body')[0].style.overflow = 'auto';
        // },1500)
        next()
    },
    watch: {
        '$route'() {
            fetchArticle(this.$store)
            this.comment = true
        }
    },
    mounted() {
        // console.log(this.$store.state.article._id)
        api.readings(this.$route.params);
    },
    methods: {
        abc(){

        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/constant'
@import '../../assets/stylus/function'
@import '../../assets/css/github-markdown.css'
@import '../../assets/css/atom-one-light.css'
.con
    max-width: $mainWidth
    margin: 80px auto 50px
    .title
        h1
            font-size: 22px
            font-weight: 300
            margin: 15px 0

        hr
            width: 30%
            height: 1px
            border: 0
            background: #EFEFEF
            margin: 20px 0
    .markdown
        h3
            padding-bottom: 8px
            border-bottom: 1px dashed #ddd
            color: #737373
            &:before
                content: "["
                margin-right: 5px
                color: #FF6D6D
                font-size: 25px
            &:after
                content: "]"
                margin-left: 5px
                color: #FF6D6D
                font-size: 25px
    .tags
        padding: 20px 0
        border-bottom: 1px dashed #ddd
        border-top: 1px dashed #ddd
        margin-top: 30px
        height: 65px
        box-sizing:border-box
        .tag
            float: left;
            font-size: 13px;
            color: #B3B3B3;
            text-transform: uppercase;
            font-family: din,'Hiragino Sans GB','Microsoft Yahei',Arial,sans-serif;
            i
                margin-right:10px
            a
                color: #B3B3B3
                margin-right: 5px
        .like
            float: right
            font-size: 13px;
            color: #B3B3B3;
            text-transform: uppercase;
            font-family: din,'Hiragino Sans GB','Microsoft Yahei',Arial,sans-serif;
            i
                margin-right:3px
            span
                color: #B3B3B3
                margin-right: 10px


    .author
        padding: 50px 12.78%
        text-align: center
        .author-info
            .author-img
                width: 60px
                height: 60px
                display: inline-block
                img
                    border-radius: 50%
                    padding:3px
                    border: 1px solid #ddd
                    box-sizing: border-box
            p
                a
                    font-size: 16px
                    font-weight: 400
                    line-height: normal
                    letter-spacing: 1px
                    color: #ABABAB
        .author-motto
            p
                font-size: 13px
                line-height: 30px
                margin: 20px 0 25px
                color: #7d8588
                letter-spacing: 2px
                display: inline-block
                padding: 10px 30px
                border-top: 1px solid #EFEFEF
                border-bottom: 1px solid #EFEFEF
                box-sizing: border-box
                i
                    float: left
                    margin-right: 10px
                    color: #65C186

    .comment
        .comment-btn
            padding: 17px 32px 15px
            background: #FFFFFF
            color: #6F6F6F
            width: 160px
            margin: 0 auto
            border: 1px solid #C7C7C7
            box-sizing: border-box
            font-family: microsoft yahei;
            cursor:pointer
            i
                margin-right: 10px

    #comment-box
        #ds-waiting
            background: url('../../assets/imgs/postload.gif') center no-repeat
            color: #555
            border: none

</style>
