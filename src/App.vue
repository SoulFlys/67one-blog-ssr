<template>
<div id="app">
    <!-- <w-progress></w-progress> -->
    <w-header></w-header>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
    <w-footer></w-footer>
    <aside>
        <div class="goTop" @click="goTop" :style="{display:isShowGoTop ? 'block' : 'none'}">
            <i>1</i>
        </div>
    </aside>
    <div class="preloader">
        <div class="preloader-inner"></div>
    </div>
</div>
</template>

<script>
// import wProgress from 'components/layout/progress';
import wHeader from 'components/layout/header';
import wFooter from 'components/layout/footer';

export default {
    name: 'app',
    components: {
        //wProgress,
        wHeader,
        wFooter
    },
    data(){
        return {
            isShowGoTop: false,
            t:''
        }
    },
    mounted() {
        this.scroll();
    },
    methods: {
        scroll(){
            let self = this;
            let body = document.body;
            let header = document.querySelector('header');
            let goTop = document.querySelector('.goTop');
            let beforeScrollTop = parseInt(body.scrollTop,10);
            window.onscroll = function(en){
                let scrollTop = parseInt(body.scrollTop,10);
                if((scrollTop-beforeScrollTop) > 0){
                    header.className = 'header-down';
                }else{
                    header.className = 'header-up';
                }
                beforeScrollTop = scrollTop;
                if(scrollTop >= 100){
                    self.isShowGoTop = true;
                }else{
                    if(scrollTop <= 0){
                        clearInterval(self.t);
                    }
                    self.isShowGoTop = false;
                }
            }
        },
        goTop(){
            let self = this;
            let body = document.body;
            self.t = setInterval(function(){
                body.scrollTop -= 10;
            },4);
        }
    },
}
</script>

<style lang="stylus">
@import "./assets/css/reset.css"
@import './assets/font/font.css'
@import "./assets/stylus/init"
.fade-enter-active, .fade-leave-active
    transition: all 0.5s ease
.fade-enter
    opacity: 1;
    /*transform: translate3d(0, 100px, 0)*/
    transform: translate3d(-100px, 0, 0)
.fade-leave-active
    opacity: 0;
    transform: translate3d(100px, 0, 0)
.preloader
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #fff
    z-index: 10000
    opacity:0
    transition: all 0.4s
    display:none
    .preloader-inner
        position: relative
        left: 50%
        top: 50%
        width: 100px
        height: 100px
        background:url('./assets/imgs/preload.gif') no-repeat center center
        margin: -50px 0 0 -50px
    &.loading
        display:block
        opacity:1
aside
    .goTop
        cursor: pointer
        width:48px
        height:48px
        line-height: 48px
        color: #fff
        text-align: center
        background: red
        fixed: bottom 65px right 80px
        z-index:102
        background-color:#5c5c5c
        border-radius: 50%
        &:hover
            animation: btn-pudding 1s linear
@keyframes btn-pudding
    12%,15%
        transform: scale(0.93, 1.07)
    16%,17%
        transform: scale(0.94, 1.06)
    10%,18%
        transform: scale(0.95, 1.05)
    19%
        transform: scale(0.96, 1.04)
    20%
        transform: scale(0.98, 1.02)
    21%,40%,48%
        transform: scale(0.99, 1.01)
    22%,23%,37%,39%,49%
        transform: scale(1, 1)
    7%,24%,34%,36%
        transform: scale(1.01, 0.99)
    25%,27%,30%,33%
        transform: scale(1.02, 0.98)
    28%,29%
        transform: scale(1.03, 0.97)
    2%
        transform: scale(1.16, 0.84)
    0%
        transform: scale(1.2, 0.8)

</style>
