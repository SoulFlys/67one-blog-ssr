<template>
<div id="app">
    <p>123<i class="icon iconfont">&#xe605;</i></p>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</div>
</template>

<style lang="scss">
@import "./assets/scss/init.scss";
@import './assets/font/font.css';
</style>
