import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'
BScroll.use(Slide)
export default function useSlider(wrapperRef){
    const slider=ref(null)
    const currentPageIndex=ref(0)
    onMounted(()=>{
        slider.value=new BScroll(wrapperRef.value,{
            click:true,
            scrollX:true,
            scrollY:false,
            momentum:false,
            bounce:false,
            probeType:2,
            slide:true
        })
        slider.value.on('slideWillChange',(page)=>{
            currentPageIndex.value=page.pageX
        })
    })
    onUnmounted(()=>{
        slider.value.destroy()
    })
    onActivated(()=>{
        slider.value.enable()
        slider.value.refresh()
    })
    onDeactivated(()=>{
        slider.value.disable()
    })
    return {
        slider,
        currentPageIndex
    }
}