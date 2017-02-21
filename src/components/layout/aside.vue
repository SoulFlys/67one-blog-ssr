<template lang="html">
    <aside>
        <div class="goTop" @click="goTop" :style="{display:isShowGoTop ? 'block' : 'none'}">
            <i>1</i>
        </div>
    </aside>
</template>

<script>
export default {
    name:'aside',
    data() {
        return {
            isShowGoTop: false,
            t: ''
        }
    },
    computed: {},
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
    components: {}
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/constant'
@import '../../assets/stylus/function'
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
