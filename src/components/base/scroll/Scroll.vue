<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScroll from './use-scroll.js'
import { ref } from 'vue'
export default {
    name:'SCROLL',
    props:{
        click:{
            props:Boolean,
            default:true
        }
    },
    setup(props){
        const rootRef=ref(null)
        useScroll(rootRef,props)
        return {
            rootRef
        }
    }
}
</script>

<style lang="scss" scoped>

</style>