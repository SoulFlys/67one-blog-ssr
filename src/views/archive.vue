<template lang="html">
    <div class="archive">
        <div class="title">
            <h1>文章归档</h1>
        </div>
        <div class="list">
            <div class="list-time" v-for="(items,key) in allArticle">
                <span class="clock"><i class="iconfont">&#xe711;</i></span>
                <h1 class="list-title">{{key}}  ({{items.length}})</h1>
                <div class="artive-list">
                    <template v-for="item in items">
                        <span class="circle"></span>
                        <div class="arrow"></div>
                        <div class="active-con">
                            <router-link :to="'/article/'+item._id" >
                                <span class="time">
                                    <i class="iconfont">&#xe711;</i>{{item.meta.createAt | formatDate('MM-dd')}}
                                </span>
                                {{item.title}}
                            </router-link>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as Conf from '../store/config'

const fetchArchive = async store => {
    Object.keys(store.state.basis).length || await store.dispatch('FETCH_BASIS')
    store.state.category.length || await store.dispatch('FETCH_CATEGORY')
    store.state.allArticle.length || await store.dispatch('FETCH_ALLARTICLE')
}

export default {
    name:'archive',
    computed: {
      ...mapGetters({
          allArticle: 'getAllArticle'
      })
    },
    preFetch: fetchArchive,
    beforeMount() {
        fetchArchive(this.$store)
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/constant'
@import '../assets/stylus/function'
.archive
    width: $mainWidth
    margin:0 auto
    .title
        margin-top: 50px
        h1
            font-weight: 400;
            color: $archive-h1;
            padding-bottom: 15px
            border-bottom: 1px dashed $archive-h1BorBom
            text-align: center
            font-size: 24px
    .list
        margin-bottom: 95px
        margin-top: 50px
        margin-left: 20px
        border-left:1px dashed $archive-listBorLeft
        .list-time
            relative: top left
            .clock
                dib()
                absolute: top -3px left -18px
                z-index: 1
                width:36px
                linHeight(36px)
                background: $archive-clockBg
                border-radius: 50%
                text-align: center
                i
                    color: $archive-clock
            .list-title
                letter-spacing: 2px
                font-style: italic
                font-size: 20px
                font-family: cursive
                font-weight: 400
                color: $archive-time
                padding-left: 42px
                cursor: pointer
                margin-bottom:20px
                &:hover
                    /*color: $archive-timeHover*/
            .artive-list
                clearfix()
                padding-bottom: 20px
                .circle
                    height: 10px
                    width: 10px
                    background: $archive-circle
                    dib()
                    border-radius: 50%
                    absolute: left -5px
                    margin-top: 24px
                .arrow
                    width: 0
                    height: 0
                    db()
                    float: left
                    margin-top: 10px
                    border-left: 20px solid transparent
                    border-bottom: 20px solid $archive-titleBg
                    margin-left: 11px
                .active-con
                    margin-left: 30px
                    margin-bottom: 20px
                    a
                        color: $archive-title
                        padding: 20px 20px
                        background: $archive-titleBg
                        db()
                        letter-spacing: 1px
                        span
                            float: right
                            color: $archive-rightTime
                            i
                                margin-right: 4px
                        em
                            font-style: normal
                            margin-left: 5px

</style>
