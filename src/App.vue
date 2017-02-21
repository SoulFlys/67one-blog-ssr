<template>
<div id="app">
    <!-- <w-progress></w-progress> -->
    <w-header></w-header>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
    <w-footer></w-footer>
    <div class="loading">
        loading
    </div>
    <!-- <w-aside></w-aside> -->
</div>
</template>

<script>
// import wProgress from 'components/layout/progress';
import wHeader from 'components/layout/header';
import wFooter from 'components/layout/footer';
// import wAside from 'components/layout/aside';

export default {
    name: 'app',
    components: {
    //     wProgress,
        wHeader,
        wFooter,
    //     wAside
    }
}
</script>

<style lang="stylus">
@import "./assets/css/reset.css"
@import './assets/font/font.css'
@import "./assets/stylus/init"
/*.fade-enter-active, .fade-leave-active
    transition: all 0.5s ease

.fade-enter
    opacity: 1;
    transform: translate3d(0, 100px, 0)

.fade-leave-active
    opacity: 0;
    transform: translate3d(100px, 0, 0)*/
.loading
    width:100%;
    height:100%;
    background:#fff;
    color:red;
    font-size:30px;
    text-align: center;
    line-height:200px;
    display: none;
    opacity:0;
    position:fixed;
    top:0;left:0;right:0;bottom:0;z-index: 99999;
    transition: all 0.4s;
    &.aaa
        display: block;
        opacity:1;


</style>
