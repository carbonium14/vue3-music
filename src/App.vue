<template>
  <Header></Header>
  <Tab></Tab>
  <router-view></router-view>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
export default {
  components:{
    Header,
    Tab
  }
}
</script>

<style lang="scss" scoped>

</style>
