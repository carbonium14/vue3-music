<template>
    <div class="singer" v-loading="!singers.length">
        <IndexList :data="singers" @select="selectSinger"></IndexList>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :singer="selectedSinger"></component>
            </transition>
        </router-view>
    </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import IndexList from '@/components/base/index-list/IndexList.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
export default {
    name:'SINGER',
    components:{
        IndexList
    },
    setup(){
        const singers=ref([])
        const selectedSinger=ref(null)
        const router=useRouter()
        onMounted(async()=>{
            const result=await getSingerList()
            singers.value=result.singers
        })
        function selectSinger(singer){
            selectedSinger.value=singer
            cacheSinger(singer)
            router.push({
                path:`/singer/${singer.mid}`
            })
        }
        function cacheSinger(singer){
            storage.session.set(SINGER_KEY,singer)
        }
        return {
            singers,
            selectSinger,
            selectedSinger
        }
    }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>