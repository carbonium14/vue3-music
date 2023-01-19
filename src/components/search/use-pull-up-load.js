import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import { ref, onMounted ,onUnmounted, onActivated, onDeactivated } from "vue";
BScroll.use(PullUp)
BScroll.use(ObserveDOM)
export default function usePullUpLoad(requestData,preventPullUpLoad){
    const scroll=ref(null)
    const rootRef=ref(null)
    const isPullUpLoad=ref(false)
    onMounted(()=>{
        const scrollValue=scroll.value=new BScroll(rootRef.value,{
            pullUpLoad:true,
            observeDOM:true,
            click:true
        })
        scrollValue.on('pullingUp',pullingUpHandler)
        async function pullingUpHandler(){
            if(preventPullUpLoad.value){
                scrollValue.finishPullUp()
                return
            }
            isPullUpLoad.value=true
            await requestData()
            scrollValue.finishPullUp()
            scrollValue.refresh()
            isPullUpLoad.value=false
        }
    })
    onUnmounted(()=>{
        scroll.value.destroy()
    })
    onActivated(()=>{
        scroll.value.enable()
        scroll.value.refresh()
    })
    onDeactivated(()=>{
        scroll.value.disable()
    })
    return {
        scroll,
        rootRef,
        isPullUpLoad
    }
}