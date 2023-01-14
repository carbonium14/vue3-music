<template>
    <div class="singer" v-loading="!singers.length">
        <IndexList :data="singers"></IndexList>
    </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import IndexList from '@/components/base/index-list/IndexList.vue'
import { onMounted, ref } from 'vue';
export default {
    name:'SINGER',
    components:{
        IndexList
    },
    setup(){
        const singers=ref([])
        onMounted(async()=>{
            const result=await getSingerList()
            singers.value=result.singers
        })
        return {
            singers
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