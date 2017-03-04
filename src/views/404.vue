<template lang="html">
  <div class="">
      404
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as Conf from '../store/config'


const fetch404 = async store => {
    Object.keys(store.state.basis).length || await store.dispatch('FETCH_BASIS')
    store.state.category.length || await store.dispatch('FETCH_CATEGORY')
}
export default {
    data() {
        return {}
    },
    preFetch: fetch404,
    beforeMount() {
        fetch404(this.$store)
    }
}
</script>
