<template>
  <div class="top-detail">
    <MusicList
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
      rank
    ></MusicList>
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component';
import { getTopDetail } from '@/service/top-list.js'
import { TOP_KEY } from '@/assets/js/constant.js'
export default createDetailComponent('TopDetail',TOP_KEY,getTopDetail)
</script>

<style lang="scss" scoped>
  .top-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>