<template lang="html">
    <div class="con">
        <div class="title">
            <h1>{{article.title}}</h1>
            <hr>
        </div>
        <div class="main">
            <div class="markdown" id="markdown" v-html="article.content"></div>
        </div>
        <button type="button" name="button" @click="abc">评论</button>
        <div id="comment-box"></div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '../../store/api'

const fetchGlobal = store => store.dispatch('FETCH_GLOBAL')
const fetchArticle = async store => {
    if(!store.state.category.length) await store.dispatch('FETCH_GLOBAL')
    await store.dispatch('FETCH_ARTICLE')
}

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            article: 'getArticle'
        })
    },
    preFetch: fetchArticle,
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
        }
    },
    mounted() {
        console.log(this.$store.state.article._id)
        api.readings(this.$route.params);
    },
    methods: {
        abc(){
            var el = document.createElement('div');//该div不需要设置class="ds-thread"
            el.setAttribute('data-thread-key', '58a2ce5d5087c9455079f1b1');//必选参数
            el.setAttribute('data-url', 'http://localhost:8088/article/58a2ce5d5087c9455079f1b1');//必选参数
            // el.setAttribute('data-author-key', '作者的本地用户ID');//可选参数
            DUOSHUO.EmbedThread(el);
            jQuery('#comment-box').append(el);
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



// .main ul {
//     list-style: disc;
//     background: #F9F9F9;
//     border: 1px dashed #E4E4E4;
//     padding: 15px 10px 15px 50px;
//     color: #616161;
//     margin-left: 0;
// }
//
// .main ol {
//     list-style: decimal;
//     background: #F9F9F9;
//     border: 1px dashed #E4E4E4;
//     padding: 15px 10px 15px 50px;
//     color: #616161;
//     margin-left: 0;
// }
//
// .main ol li,
// .main ul li {
//     padding: 8px 0;
// }
//
// .main {
//     position: relative;
// }
//
// .main h3 {
//     padding-bottom: 8px;
//     border-bottom: 1px dashed #ddd;
//     color: #737373;
// }
// .main h3:before {
//     content: "[";
//     margin-right: 5px;
//     color: #FF6D6D;
//     font-size: 25px;
// }
// .main h3:after {
//     content: "]";
//     margin-left: 5px;
//     color: #FF6D6D;
//     font-size: 25px;
// }
//
// .main code {
//     background: #F9F9F9;
//     color: #D07C7C;
//     padding: 3px;
//     border: 1px dashed #ddd;
// }
//
// .main a {
//     color: #E67474;
//     text-decoration: underline;
// }
// .main a:hover {
//     color: #72C5A6;
// }
//
// .main p {
//     color: #565656;
//     font-weight: 400;
//     line-height: 30px;
// }
</style>
