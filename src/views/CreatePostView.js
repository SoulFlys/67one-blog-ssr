const vuex = require('vuex')
const { mapGetters } = vuex
const Post = require('../components/article/index.vue')

module.exports = function () {
  const preFetch = function (store, to, callback) {
     return store.dispatch('FETCH_ARTICLE',{to,callback})
  }
  return {
    computed: {
    //   ...mapGetters([
    //       article: 'getArticle',
    //   ]),
    },
    preFetch,
    beforeMount () {
        preFetch(this.$store, this.$route)
    },
    render (h) {
      return h(Post, {
        // props: {
        //   article,
        // }
      })
    }
  }
}
