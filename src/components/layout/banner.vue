<template lang="html">
    <div class="banner">
        <div class="banner-center" :style="{ background: 'url('+rootUrl+basis.banner+') center center / cover no-repeat fixed'}">
            <div class="banner-info">
                <div class="banner-pic">
                    <a href="#">
                        <img :src="rootUrl+basis.pic" alt="" />
                    </a>
                </div>
                <div class="banner-title">
                    <p>{{basis.nick}}</p>
                </div>
                <div class="banner-list">
                    <ul>
                        <li class="weixin" v-if="basis.weixin">
                            <a href="#"><img src="../../assets/imgs/wechat.png" alt="" /></a>
                            <div class="weixin-code">
                                <img :src="rootUrl+basis.weixin" alt="" />
                            </div>
                        </li>
                        <li v-if="basis.weibo">
                            <a :href="basis.weibo" target="_blank"><img src="../../assets/imgs/sina.png" alt="" /></a>
                        </li>
                        <li class="qq" v-if="basis.qq">
                            <a href="#"><img src="../../assets/imgs/qq.png" alt="" /></a>
                            <div class="qq-code">{{basis.qq}}</div>
                        </li>
                        <li v-if="basis.github">
                            <a :href="basis.github" target="_blank"><img src="../../assets/imgs/github.png" alt="" /></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="banner-left"></div>
            <div class="banner-right"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../../store'


export default {
    name: 'banner',
    data() {
        return {
            rootUrl:'http://localhost:3000'
        }
    },
    computed: {
        ...mapGetters({
            basis: 'getBasis'
        })
    },
    mounted() {

    },
    methods: {},
    components: {}
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/constant';
@import '../../assets/stylus/function';
.banner
    width: 100%
    height: 550px
    overflow: hidden
    .banner-center
        width: 100%
        height: 550px
        // background: url('../../assets/imgs/banner.jpg') no-repeat center center;
        // @include backgroundSize(cover);
        // background-attachment: fixed;
        relative: top 0 left 0
        .banner-left
            width: 101%
            height: 200px
            background: $banner-rotate;
            absolute: bottom -80px right 48%
            z-index:1
            transform: rotate(6deg)
        .banner-right
            width: 101%
            height: 200px
            background: $banner-rotate
            absolute: bottom -80px left 48%
            z-index:1
            transform: rotate(-6deg)
        .banner-info
            width: $mainWidth
            height:250px
            padding: 0 10px
            relative: top 40% left 50%
            z-index:2
            transform: translate(-50%,-50%)
            box-sizing()
            text-align: center
            .banner-pic
                a
                    width: 86px
                    height: 86px
                    margin: 0 auto
                    db()
                    overflow: hidden
                    img
                        width: 80px
                        height: 80px
                        border: 3px solid rgba(255, 255, 255, 0.4)
                        border-radius: 50%
                        transition: transform .6s ease-out
                        &:hover
                            transform: rotateZ(360deg)
            .banner-title
                width: 60%
                margin:0 auto
                background: $banner-titleBg
                padding: 20px 30px
                margin-top: 30px
                letter-spacing: 2px
                line-height: 30px
                p
                    font-size: 14px
                    color: $banner-title
            .banner-list
                height: 32px
                margin-top: 30px
                margin-left: 10px
                list-style: none
                dib()
                ul
                    clearfix()
                    li
                        width: 32px
                        height: 32px
                        float: left
                        margin-right: 10px
                        img
                            width: 32px
                            height: 32px
                            border-radius:50%
                            border: 3px solid $banner-iconBorder
                            background: $banner-iconBg
                            box-sizing()

                        &.qq,&.weixin
                            relative: top left
                            .qq-code,.weixin-code
                                width: 150px
                                padding: 10px
                                background: #FFFFFF
                                color: #505050
                                absolute: top 30px left -58px
                                transition: 0.7s all ease
                                transform: translate3d(0,50px,0)
                                font-size: 13px
                                visibility: hidden
                                opacity: 0
                                img
                                    width:150px
                                    height:150px
                                    margin:0 auto
                                    border-radius: 0
                            .weixin-code
                                padding:0
                            &:hover
                                .qq-code,.weixin-code
                                    opacity: 1
                                    transform: translate3d(0,10px,0)
                                    visibility: visible

</style>
