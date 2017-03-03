<template lang="html">
    <div class="list">
        <div class="title">
            <p>标题</p>
            <span>title</span>
        </div>
        <div class="con">
            <div class="con-li">
                <a href="#">
                    <div class="con-li-img">
                        <img src="../assets/imgs/1.png" alt="" />
                    </div>
                    <div class="con-li-text">
                        <h3>文章标题</h3>
                        <p>
                            <span><i class="iconfont">&#xe711;</i>2016-08-31</span>
                            <span><i class="iconfont">&#xe609;</i>1378</span>
                            <span><i class="iconfont">&#xe624;</i>3</span>
                        </p>
                    </div>
                </a>
            </div>
            <div class="con-li">
                <a href="#">
                    <div class="con-li-img">
                        <img src="../assets/imgs/2.jpg" alt="" />
                    </div>
                    <div class="con-li-text">
                        <h3>文章标题</h3>
                        <p>
                            <span><i class="iconfont">&#xe711;</i>2016-08-31</span>
                            <span><i class="iconfont">&#xe609;</i>1378</span>
                            <span><i class="iconfont">&#xe624;</i>3</span>
                        </p>
                    </div>
                </a>
            </div>
            <div class="con-li">
                <a href="#">
                    <div class="con-li-img">
                        <img src="../assets/imgs/1.png" alt="" />
                    </div>
                    <div class="con-li-text">
                        <h3>文章标题</h3>
                        <p>
                            <span><i class="iconfont">&#xe711;</i>2016-08-31</span>
                            <span><i class="iconfont">&#xe609;</i>1378</span>
                            <span><i class="iconfont">&#xe624;</i>3</span>
                        </p>
                    </div>
                </a>
            </div>
            <div class="con-li">
                <a href="#">
                    <div class="con-li-img">
                        <img src="../assets/imgs/2.jpg" alt="" />
                    </div>
                    <div class="con-li-text">
                        <h3>文章标题</h3>
                        <p>
                            <span><i class="iconfont">&#xe711;</i>2016-08-31</span>
                            <span><i class="iconfont">&#xe609;</i>1378</span>
                            <span><i class="iconfont">&#xe624;</i>3</span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
        <div class="page">
            <a @click.prevent="loadingMore">加载更多</a>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {
      loadingMore(){

      }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/constant'
@import '../assets/stylus/function'
.list
    width: $mainWidth
    margin:80px auto 50px
    .title
        position: relative
        text-align: center
        margin-bottom: 70px
        p
            dib()
            font-size: 25px
            font-weight: 400
            padding-right: 15px
            border-right: 1px dashed $list-titleBorRight
            color: $list-title
        span
            dib()
            padding-left: 10px
            color: $list-litTitle
    .con
        width:100%
        clearfix()
        .con-li
            float: left
            width: 32.5%
            margin: 0 3px 8px
            height: 175px
            position: relative
            border: 1px solid $list-liBor
            overflow: hidden
            box-sizing()
            &:hover
                .con-li-text
                    top:0
            .con-li-img
                width:100%
                height: 175px
                img
                    width:100%
                    height: 175px
            .con-li-text
                absolute: left 0 top -100%
                background-color: $list-liBg
                color: $list-liColor
                height: 100%
                width: 100%
                opacity: 0.9
                transition: 0.5s
                h3
                    font-size: 16px
                    font-weight: 400
                    margin: 0 0 10px 0
                    padding: 0 20px
                    padding-top: 40px
                    color:$list-liH3
                p
                    span
                        i
                            font-size: 13px
                            dib()
                            margin-right: 2px
                        font-size: 13px
                        color: $list-liP
                        &:nth-child(1)
                            float: left
                            padding-left: 20px
                        &:nth-child(2)
                            float: right
                            margin-right: 20px
                        &:nth-child(3)
                            float: right
                            margin-right: 20px

</style>
