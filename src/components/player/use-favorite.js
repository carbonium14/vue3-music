import { computed } from "vue"
import { useStore } from "vuex"
import { save, remove } from "@/assets/js/array-store"
import { FAVORITE_KEY } from "@/assets/js/constant"

export default function useFavorite(){
    const store=useStore()
    const favoriteList=computed(()=>store.state.favoriteList)
    const maxLength=100
    function getFavoriteIcon(song){
        return isFavorite(song)?'icon-favorite':'icon-not-favorite'
    }
    function isFavorite(song){
        return favoriteList.value.findIndex((item)=>{
            return item.id===song.id
        })>-1
    }
    function toggleFavorite(song){
        let list=undefined
        function compare(item){
            return item.id===song.id
        }
        if(isFavorite(song)){
            list=remove(FAVORITE_KEY,compare)
        } else {
            list=save(song,FAVORITE_KEY,compare,maxLength)
        }
        store.commit('setFavoriteList',list)
    }
    return {
        getFavoriteIcon,
        toggleFavorite
    }
}