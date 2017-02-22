<template lang="html">
<footer>
    <div class="footer-cen">
        <p>{{basis.copyright}}</p>
		<p>{{basis.record}}<span> | </span>{{basis.nick}}</p>
		<p>您是本站第: {{basis.hits}} 位访客</p>
	</div>
</footer>
</template>

<script>
import * as api from '../../store/api'
import { mapGetters } from 'vuex'



export default {
    name: 'footer',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            basis: 'getBasis'
        })
    },
    mounted(){
        api.hits();
    }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/constant';
@import '../../assets/stylus/function';
footer
    width:100%
    background: $footer-bg
    border-top: 1px solid $footer-borderTop
    padding:22px
    box-sizing()
    .footer-cen
        text-align: center
        p
            text-align: center
            font-size:13px
            color: $footer-footer
            line-height: 30px
            span
                dib()
                margin: 0 3px

</style>
