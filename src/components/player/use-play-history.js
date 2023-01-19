import { useStore } from "vuex";
import { PLAY_KEY } from "@/assets/js/constant";
import { save } from "@/assets/js/array-store";
export default function usePlayHistory(){
    const store=useStore()
    const maxLength=200
    function savePlay(song){
        const songs=save(song,PLAY_KEY,(item)=>{
            return item.id===song.id
        },maxLength)
        store.commit('setPlayHistory',songs)
    }
    return {
        savePlay
    }
}