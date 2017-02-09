<template>
<div>
    <ul>
        <li v-for="item in list">{{item.name}}</li>
    </ul>
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import store from '../store'

const fetchLatest = store => store.dispatch('FETCH_LATEST')

export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            list: state => state.list
        })
    },
    preFetch: fetchLatest,
    beforeMount() {
        if (!this.list.length) {
            fetchLatest(this.$store)
        }
    },
}
</script>

<!--
<style lang="scss">
ul{
    li{
        color:red;
        font-size: 20px;
    }
}
</style>
-->
