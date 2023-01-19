<template>
  <Header></Header>
  <Tab></Tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
      <keep-alive>
          <component :is="Component"></component>
      </keep-alive>
  </router-view>
  <router-view :style="viewStyle" name="user" v-slot="{ Component }">
      <transition appear name="slide">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
  </router-view>
  <Player></Player>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
import Player from '@/components/player/Player.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components:{
    Header,
    Tab,
    Player
  },
  setup(){
    const store=useStore()
    const playList=computed(()=>store.state.playList)
    const viewStyle=computed(()=>{
      const bottom=playList.value.length?'60px':'0'
      return {
        bottom
      }
    })
    return {
      viewStyle
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
