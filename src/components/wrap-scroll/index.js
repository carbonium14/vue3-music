import Scroll from '@/components/base/scroll/Scroll.vue'
import { h, mergeProps, withCtx, renderSlot, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
export default {
    name:'WrapScroll',
    props:Scroll.props,
    emits:Scroll.emits,
    render(ctx){
        return h(Scroll,mergeProps({ref:'scrollRef'},ctx.$props,{
            onScroll:(e)=>{
                ctx.$emit('scroll',e)
            }
        }),{
            default:withCtx(()=>{
                return [renderSlot(ctx.$slots,'default')]
            })
        })
    },
    setup(){
        const scrollRef=ref(null)
        const store=useStore()
        const playList=computed(()=>store.state.playList)
        const scroll=computed(()=>{
            return scrollRef.value.scroll
        })
        watch(playList,async()=>{
            await nextTick()
            scroll.value.refresh()
        })
        return {
            scrollRef,
            scroll
        }
    }
}