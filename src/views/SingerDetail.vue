<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :pic="pic" :title="title" :loading="loading"></MusicList>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer.js'
import { processSongs } from '@/service/song.js'
import MusicList from '@/components/music-list/MusicList.vue'
import { onMounted, ref, computed } from 'vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
import { useRoute, useRouter } from 'vue-router'
export default {
    name:'SingerDetail',
    components:{
        MusicList
    },
    props:{
        singer:{
            type:Object
        }
    },
    setup(props){
        const songs=ref([])
        const loading=ref(true)
        const route=useRoute()
        const router=useRouter()
        const computedSinger=computed(()=>{
            let ret=null
            const singer=props.singer
            if(singer){
                ret=singer
            }else{
                const cacheSinger=storage.session.get(SINGER_KEY)
                if(cacheSinger&&cacheSinger.mid===route.params.id){
                    ret=cacheSinger
                }
            }
            return ret
        })
        const pic=computed(()=>{
            const singer=computedSinger.value
            return singer&&singer.pic
        })
        const title=computed(()=>{
            const singer=computedSinger.value
            return singer&&singer.name
        })
        onMounted(async()=>{
            if(!computedSinger.value){
                const path=route.matched[0].path
                router.push({
                    path
                })
                return
            }
            const result=await getSingerDetail(computedSinger.value)
            songs.value=await processSongs(result.songs)
            loading.value=false
        })
        return {
            songs,
            pic,
            title,
            loading
        }
    }
}
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>