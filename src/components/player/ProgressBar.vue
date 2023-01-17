<template>
  <div
    class="progress-bar"
    @click="onClick"
  >
    <div class="bar-inner">
      <div
        class="progress"
        ref="progress_"
        :style="progressStyle"
      ></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, getCurrentInstance } from 'vue';
const progressBtn=16
export default {
    name:'ProgressBar',
    emits:['progress-changing','progress-changed'],
    props:{
        progress:{
            type:Number,
            default:0
        }
    },
    setup(props,{emit}){
        const offset=ref(0)
        let {ctx}=getCurrentInstance()
        watch(()=>props.progress,(newProgress)=>{
            setOffset(newProgress)
        })
        const progressStyle=computed(()=>{
            return `width:${offset.value}px`
        })
        const btnStyle=computed(()=>{
            return `transform:translate3d(${offset.value}px,0,0)`
        })
        let touch={}
        const progress_=ref(null)
        function onTouchStart(e){
            touch.x1=e.touches[0].pageX
            touch.beginWidth=progress_.value.clientWidth
        }
        function onTouchMove(e){
            const delta=e.touches[0].pageX-touch.x1
            const tempWidth=touch.beginWidth+delta
            const barWidth=ctx.$el.clientWidth-progressBtn
            const progress=Math.min(1,Math.max(tempWidth/barWidth,0))
            offset.value=barWidth*progress
            emit('progress-changing',progress)
        }
        function onTouchEnd(){
            const barWidth=ctx.$el.clientWidth-progressBtn
            const progress=progress_.value.clientWidth/barWidth
            emit('progress-changed',progress)
        }
        function onClick(e){
            const rect=ctx.$el.getBoundingClientRect()
            const offsetWidth=e.pageX-rect.left
            const barWidth=ctx.$el.clientWidth-progressBtn
            const progress=offsetWidth/barWidth
            emit('progress-changed',progress)
        }
        function setOffset(progress){
          const barWidth=ctx.$el.clientWidth-progressBtn
            offset.value=barWidth*progress
        }
        return {
            progressStyle,
            btnStyle,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            progress_,
            onClick,
            setOffset
        }
    }
}
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>