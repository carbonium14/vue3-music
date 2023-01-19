<template>
  <teleport to="body">
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="icon-close"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <SearchInput
            v-model="query"
            placeholder="搜索歌曲"
          ></SearchInput>
        </div>
        <div v-show="!query">
          <Switches
            :items="['最近播放', '搜索历史']"
            v-model="currentIndex"
          ></Switches>
          <div class="list-wrapper">
            <Scroll
              v-if="currentIndex===0"
              class="list-scroll"
              ref="scrollRef"
            >
              <div class="list-inner">
                <SongList
                  :songs="playHistory"
                  @select="selectSongBySongList"
                >
                </SongList>
              </div>
            </Scroll>
            <Scroll
              v-if="currentIndex===1"
              class="list-scroll"
              ref="scrollRef"
            >
              <div class="list-inner">
                <SearchList
                  :searches="searchHistory"
                  :show-delete="false"
                  @select="addQuery"
                ></SearchList>
              </div>
            </Scroll>
          </div>
        </div>
        <div class="search-result" v-show="query">
          <Suggest
            :query="query"
            :show-singer="false"
            @select-song="selectSongBySuggest"
          >
          </Suggest>
        </div>
        <Message ref="messageRef">
          <div class="message-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已经添加到播放列表</span>
          </div>
        </Message>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, nextTick, watch } from 'vue';
import SearchInput from '../search/SearchInput.vue';
import Suggest from '../search/Suggest.vue';
import Switches from '../base/switches/Switches.vue';
import Scroll from '../wrap-scroll/index.js';
import SongList from '../base/song-list/SongList.vue';
import SearchList from '../base/search-list/SearchList.vue';
import { useStore } from 'vuex';
import useSearchHistory from '../search/use-search-history';
import Message from '../base/message/Message.vue';
export default {
    name:'AddSong',
    components:{
        SearchInput,
        Suggest,
        Switches,
        Scroll,
        SongList,
        SearchList,
        Message
    },
    setup(){
        const visible=ref(false)
        const query=ref('')
        const scrollRef=ref(null)
        async function show(){
            visible.value=true
            await nextTick()
            refreshScroll()
        }
        function hide(){
            visible.value=false
        }
        function refreshScroll(){
            scrollRef.value.scroll.refresh()
        }
        watch(query,async()=>{
            await nextTick()
            refreshScroll()
        })
        const currentIndex=ref(0)
        const store=useStore()
        const searchHistory=computed(()=>store.state.searchHistory)
        const playHistory=computed(()=>store.state.playHistory)
        function addQuery(s){
            query.value=s
        }
        function selectSongBySongList({song}){
            addSong(song)
        }
        const messageRef=ref(null)
        function addSong(song){
            store.dispatch('addSong',song)
            showMessage()
        }
        const {saveSearch}=useSearchHistory()
        function selectSongBySuggest(song){
            addSong(song)
            saveSearch(query.value)
        }
        function showMessage(){
            messageRef.value.show()
        }
        return {
            visible,
            query,
            show,
            hide,
            currentIndex,
            searchHistory,
            playHistory,
            addQuery,
            selectSongBySongList,
            selectSongBySuggest,
            scrollRef,
            messageRef
        }
    }
}
</script>

<style lang="scss" scoped>
  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 300;
    background: $color-background;
    .header {
      position: relative;
      height: 44px;
      text-align: center;
      .title {
        line-height: 44px;
        font-size: $font-size-large;
        color: $color-text;
      }
      .close {
        position: absolute;
        top: 0;
        right: 8px;
        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: $color-theme;
        }
      }
    }
    .search-input-wrapper {
      margin: 20px
    }
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }
  }

  .message-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
</style>