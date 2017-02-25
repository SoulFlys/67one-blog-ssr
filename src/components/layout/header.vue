<template lang="html">
<header class="header-up">
    <div class="header-con">
        <div class="logo">
            <router-link to="/">
                <img :src="rootUrl + basis.logo" alt="" />
            </router-link>
        </div>
        <!-- <div class="search">
            <i class="icon iconfont">&#xe605;</i>
        </div> -->
        <span class="nav-phone">
            按钮
        </span>
        <nav>
            <ul>
                <li v-for="items in category">
                    <router-link :to="items.router" v-if="items.type == 1">{{items.name}}</router-link>
                    <router-link :to="'/article/'+items.router" v-else>{{items.name}}</router-link>
                </li>
                <!-- <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/archive">归档</router-link></li>
                <li><router-link to="/links">邻居</router-link></li>
                <li><router-link to="/list">列表</router-link></li>
                <li><router-link to="/about">关于我</router-link></li>
                <li><router-link to="/no">未完成事项</router-link></li>
                <li>
                    <a href="#">一级分类</a>
                    <div class="nav-menu">
                        <p><a href="#">二级分类</a></p>
                        <p><a href="#">二级分类</a></p>
                        <p><a href="#">二级分类</a></p>
                    </div>
                </li> -->
            </ul>
        </nav>
    </div>
</header>
</template>

<script>
import { mapGetters } from 'vuex'
import { host } from '../../store/config'

export default {
    name: 'header',
    data() {
        return {
            rootUrl:host
        }
    },
    computed: {
        ...mapGetters({
            category: 'getCategory',
            basis: 'getBasis'
        })
    },
    mounted() {
        // console.log(this.$store.state.basis.logo)
        // console.log(this.$store.state.category)
    },
    methods: {},
    components: {}
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/constant';
@import '../../assets/stylus/function';
header
    width: 100%
    height: 100px
    background: $header-bg
    border-bottom: 1px solid $header-borBom
    fixed:z-index 103
    transition: top 0.4s ease
    &.header-up
        top:0
    &.header-down
        top:-100px
    .header-con
        width: $mainWidth
        margin: 0 auto
        clearfix()
        .logo
            max-width: 200px
            height: 100px
            float: left
            a
                db()
                img
                    height: 50px
                    margin-top: 25px
                &:hover
                    opacity: 0.8
        .search
            float: right
            height: 100px
            line-height: 100px
            margin-left: 20px
            i
                color: $header-search
                cursor: pointer
                font-size: 25px
                &:hover
                    color:$header-searchHover;
        nav
            float: right
            margin: 24px 0
            height: 52px
            ul
                list-style: none
                clearfix()
                height: 52px
                margin: 0 auto
                li
                    float: left
                    height: 52px
                    relative: top left;
                    a
                        color: $header-nav
                        font-size: 16px
                        height: 52px
                        line-height: 52px
                        db()
                        padding:0 15px
                        &:hover
                            color:$header-navHover
                    &:hover
                        .nav-menu
                            db()
                            transition: all 0.2s
                    .nav-menu
                        absolute: top 48px left 0
                        z-index: 103
                        width: 160px
                        text-align: left
                        border: 1px solid #E8E8E8
                        background:#fff
                        box-sizing()
                        dn()
                        animation: fadeInUp .2s .1s ease both;
                        p
                            width: 100%
                            margin: 0
                            padding: 10px 0
                            border-bottom: 1px dotted #e1e1e1
                            box-sizing()
                            a
                                font-size: 13px
                                width: 100%
                                padding: 5px 20px
                                dib()
                                color: #545454;
                                box-sizing()
                                linHeight(20px)
                                &:hover
                                    color:red
        .nav-phone
            display:none
            float:right
            width:40px;
            height:40px;
            margin: 8px 10px 8px 0;
            border:1px solid #ddd;
            cursor:pointer
@keyframes fadeInUp
    0%
        opacity:0
        transform:translateY(10px)
    100%
        opacity:1
        transform:translateY(0)
</style>
