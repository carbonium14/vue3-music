import MusicList from '@/components/music-list/MusicList.vue'
import storage from 'good-storage'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { processSongs } from '@/service/song.js'
export default function createDetailComponent(name,key,fetch){
    return {
        name,
        components:{
            MusicList
        },
        props:{
            data:{
                type:Object
            }
        },
        setup(props){
            const songs=ref([])
            const loading=ref(true)
            const route=useRoute()
            const router=useRouter()
            const computedData=computed(()=>{
                let ret=null
                const data=props.data
                if(data){
                    ret=data
                }else{
                    const cache=storage.session.get(key)
                    if(cache&&(cache.mid||cache.id.toString())===route.params.id){
                        ret=cache
                    }
                }
                return ret
            })
            const pic=computed(()=>{
                const data=computedData.value
                return data&&data.pic
            })
            const title=computed(()=>{
                const data=computedData.value
                return data&&(data.name||data.title)
            })
            onMounted(async()=>{
                const data=computedData.value
                if(!data){
                    const path=route.matched[0].path
                    router.push({
                        path
                    })
                    return
                }
                const result=await fetch(data)
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
}