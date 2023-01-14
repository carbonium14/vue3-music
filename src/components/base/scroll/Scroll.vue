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
        },
        probeType:{
            type:Number,
            default:0
        }
    },
    emits:['scroll'],
    setup(props,{emit}){
        const rootRef=ref(null)
        const scroll=useScroll(rootRef,props,emit)
        return {
            rootRef,
            scroll
        }
    }
}
</script>

<style lang="scss" scoped>

</style>