import { computed, onMounted, onUnmounted, ref, watch, nextTick, onActivated, onDeactivated } from "vue";
import { useStore } from "vuex";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
BScroll.use(Slide)
export default function useMiniSlider(){
    const sliderWrapperRef=ref(null)
    const slider=ref(null)
    const store=useStore()
    const fullScreen=computed(()=>store.state.fullScreen)
    const playList=computed(()=>store.state.playList)
    const currentIndex=computed(()=>store.state.currentIndex)
    const sliderShow=computed(()=>!fullScreen.value&&!!playList.value)
    onMounted(()=>{
        let slideValue=undefined
        watch(sliderShow,async(newSliderShow)=>{
            await nextTick()
            if(newSliderShow){
                if(!slideValue){
                    slideValue=slider.value=new BScroll(sliderWrapperRef.value,{
                        click:true,
                        scrollX:true,
                        scrollY:false,
                        momentum:false,
                        bounce:false,
                        probeType:2,
                        slide:{
                            autoplay:false,
                            loop:true
                        }
                    })
                    slideValue.on('slidePageChanged',({pageX})=>{
                        store.commit('setCurrentIndex',pageX)
                    })
                } else {
                    slideValue.refresh()
                }
                slideValue.goToPage(currentIndex.value,0,0)
            }
        })
        watch(currentIndex,(newIndex)=>{
            if(slideValue&&sliderShow.value===true){
                slideValue.goToPage(newIndex,0,0)
            }
        })
        watch(playList,async(newList)=>{
            if(slideValue&&sliderShow.value&&newList.length){
                await nextTick()
                slideValue.refresh()
            }
        })
    })
    onUnmounted(()=>{
        if(slider.value){
            slider.value.destory()
        }
    })
    onActivated(()=>{
        slider.value.enable()
        slider.value.refresh()
    })
    onDeactivated(()=>{
        slider.value.disable()
    })
    return {
        sliderWrapperRef,
        slider
    }
}