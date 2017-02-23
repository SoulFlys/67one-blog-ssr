<template lang="html">
    <div class="links">
        <div class="title">友链</div>
        <div class="con">
            <template v-for="(items,key) in links">
                <h2>{{key}}</h2>
                <ul class="link-ul">
                    <li class="link-li" v-for="item in items">
                        <a :href="item.href" :title="item.description" target="_blank">
                            <span>{{item.name}}</span>
                            <p>{{item.description}}</p>
                        </a>
                    </li>
                </ul>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../../store'
import _ from "lodash"

const fetchLinks = store => store.dispatch('FETCH_LINKS')
const fetchGlobal = store => store.dispatch('FETCH_GLOBAL')

export default {
    name:'links',
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            links: 'getLinks'
        })
    },
    preFetch: fetchGlobal,
    beforeMount() {
        if(!this.$store.state.links.length){
            fetchLinks(this.$store)
        }
    },
    mounted(){}
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/constant'
@import '../../assets/stylus/function'
.links
    width: $mainWidth
    margin:0 auto
    .title
        width:100%
        font-size: 25px
        text-align: center
        db()
        margin: 50px 0 30px
        letter-spacing: 5px
    .con
        margin-bottom: 80px
        h2
            font-weight: 400
            color:$links-h2
            padding-left: 10px
            border-left: 3px solid $links-borLeft
            margin: 50px 0 20px
            font-size: 18px
        .link-ul
            margin: 0
            list-style: none
            padding: 0
            width: 100%
            dib()
            .link-li
                width: 32% //32%
                float: left
                border: 1px solid $links-linkLiBor
                padding: 10px 30px
                margin: 4px 4px
                position: relative
                overflow: hidden
                transition: all .3s;
                box-sizing()
                &:before
                    content: ""
                    background-color: $links-borLeft
                    transform: skew(45deg, 0)
                    width: 0
                    height: 100%
                    position: absolute
                    top: 0px
                    left: -60px
                    z-index: -1
                    transition: all .5s
                &:hover
                    border: 1px solid $links-borLeft
                    &:before
                        width: 180%
                    span
                        color: $links-titleHover
                    p
                        color: $links-textHover
                        border-top: 1px dashed $links-textHoverBorTop
                a
                    span
                        color: $links-borLeft
                        padding-bottom: 10px
                        display: block
                        transition: all .3s
                    p
                        color: $links-text
                        font-size: 13px
                        padding: 10px 0
                        box-sizing()
                        border-top: 1px dashed $links-textBorTop
                        min-height: 46px
                        text-overflow: ellipsis
                        overflow: hidden
                        white-space: nowrap
                        line-height: 25px
                        transition: all .5s


</style>
