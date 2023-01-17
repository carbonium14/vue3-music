import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default function useCD(){
    const store=useStore()
    const playing=computed(()=>store.state.playing)
    const CDClass=computed(()=>{
        return playing.value?'playing':''
    })
    const cdRef=ref(null)
    const cdImageRef=ref(null)
    watch(playing,(newPlaying)=>{
        if(!newPlaying){
            syncTransform(cdRef.value,cdImageRef.value)
        }
    })
    function syncTransform(wrapper,inner){
        const wrapperTransform=getComputedStyle(wrapper).transform
        const innerTransform=getComputedStyle(inner).transform
        wrapper.style.transform=wrapperTransform==='none'?innerTransform:innerTransform.concat(' ',wrapperTransform)
    }
    return {
        CDClass,
        cdRef,
        cdImageRef
    }
}