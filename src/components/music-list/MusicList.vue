<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div
      class="bg-image"
      :style="bgImageStyle"
      ref="bgImage"
    >
      <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          v-show="songs.length > 0"
          class="play-btn"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div
        class="filter"
        :style="filterStyle"
      ></div>
    </div>
    <Scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
        ></song-list>
      </div>
    </Scroll>
  </div>
</template>

<script>
import SongList from '@/components/base/song-list/SongList.vue'
import Scroll from '@/components/base/scroll/Scroll.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    name:'MusicList',
    components:{
        SongList,
        Scroll
    },
    props:{
        songs:{
            type:Array,
            default(){
              return []
            }
        },
        title:{
            type:String
        },
        pic:{
            type:String
        },
        loading:{
          type:Boolean
        },
        noResultText:{
          type:String,
          default:'没有找到可播放的歌曲'
        }
    },
    setup(props){
      const router=useRouter()
      const store=useStore()
      const imageHeight=ref(0)
      const bgImage=ref(null)
      const scrollY=ref(0)
      const RESERVED_HEIGHT=40
      const maxTranslateY=ref(0)
      const bgImageStyle=computed(()=>{
        const scrolly=scrollY.value
        let zIndex=0
        let paddingTop='70%'
        let height=0
        let translateZ=0
        if(scrolly>maxTranslateY.value){
          zIndex=10
          paddingTop=0
          height=`${RESERVED_HEIGHT}px`
          translateZ=1
        }
        let scale=1
        if(scrolly<0){
          scale=1+Math.abs(scrolly/imageHeight.value)
        }
        return {
          zIndex,
          paddingTop,
          height,
          backgroundImage:`url(${props.pic})`,
          transform:`scale(${scale})translateZ(${translateZ})px`
        }
      })
      const scrollStyle=computed(()=>{
        return {
          top:`${imageHeight.value}px`
        }
      })
      const filterStyle=computed(()=>{
        let blur=0
        const scrolly=scrollY.value
        const imageheight=imageHeight.value
        if(scrolly>=0){
          blur=Math.min(maxTranslateY.value/imageheight,scrolly/imageheight)*20
        }
        return {
          backdropFilter:`blur(${blur}px)`
        }
      })
      onMounted(()=>{
        imageHeight.value=bgImage.value.clientHeight
        maxTranslateY.value=imageHeight.value-RESERVED_HEIGHT
      })
      const goBack=()=>router.back()
      const onScroll=(pos)=>{
        scrollY.value=-pos.y
      }
      const noResult=computed(()=>{
        return !props.loading&&!props.songs.length
      })
      const selectItem=({index})=>{
        store.dispatch('selectPlay',{
          list:props.songs,
          index
        })
      }
      const random=()=>{
        store.dispatch('randomPlay',props.songs)
      }
      const playBtnStyle=computed(()=>{
        let display=''
        if(scrollY.value>=maxTranslateY.value){
          display='none'
        }
        return {
          display
        }
      })
      return {
          bgImageStyle,
          bgImage,
          scrollStyle,
          goBack,
          onScroll,
          filterStyle,
          noResult,
          selectItem,
          random,
          playBtnStyle
      }
    }
}
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>