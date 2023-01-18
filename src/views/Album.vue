<template>
  <div class="album">
    <MusicList
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></MusicList>
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component';
import { getAlbum } from '@/service/recommend';
import { ALBUM_KEY } from '@/assets/js/constant.js'
export default createDetailComponent('ALBUM',ALBUM_KEY,getAlbum)
</script>

<style lang="scss" scoped>
  .album {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>