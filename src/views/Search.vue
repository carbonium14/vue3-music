<template>
    <div class="search">
        <div class="search-input-wrapper">
            <SearchInput v-model="query"></SearchInput>
        </div>
        <Scroll
            ref="scrollRef"
            class="search-content"
            v-show="!query"
        >
            <div>
                <div class="hot-keys">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li
                        class="item"
                        v-for="item in hotKeys"
                        :key="item.id"
                        @click="addQuery(item.key)"
                        >
                        <span>{{item.key}}</span>
                        </li>
                    </ul>
                </div>
                <div class="search-history" v-show="searchHistory.length">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear" @click="showConfirm">
                        <i class="icon-clear"></i>
                        </span>
                    </h1>
                    <Confirm
                        ref="confirmRef"
                        text="是否清空所有搜索历史"
                        confirm-btn-text="清空"
                        @confirm="clearSearch"
                    >
                    </Confirm>
                    <SearchList
                        :searches="searchHistory"
                        @select="addQuery"
                        @delete="deleteSearch"
                    ></SearchList>
                </div>
            </div>
        </Scroll>
        <div class="search-result" v-show="query">
            <Suggest
                :query="query"
                @select-song="selectSong"
                @select-singer="selectSinger"
            ></Suggest>
        </div>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :data="selectedSinger"/>
            </transition>
        </router-view>
    </div>
</template>
  
<script>
import SearchInput from '@/components/search/SearchInput.vue';
import Suggest from '@/components/search/Suggest.vue';
import { ref, computed, watch, nextTick } from 'vue';
import { getHotKeys } from '@/service/search';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
import SearchList from '@/components/base/search-list/SearchList.vue';
import useSearchHistory from '@/components/search/use-search-history.js'
import Scroll from '@/components/wrap-scroll/index.js';
import Confirm from '@/components/base/confirm/Confirm.vue';
export default {
    name:'SEARCH',
    components:{
        SearchInput,
        Suggest,
        SearchList,
        Scroll,
        Confirm
    },
    setup(){
        const query=ref('')
        const hotKeys=ref([])
        const store=useStore()
        const selectedSinger=ref(null)
        const router=useRouter()
        const {saveSearch,deleteSearch,clearSearch}=useSearchHistory()
        getHotKeys().then((res)=>{
            hotKeys.value=res.hotKeys
        })
        function addQuery(s){
            query.value=s
        }
        function selectSong(song){
            saveSearch(query.value)
            store.dispatch('addSong',song)
        }
        function selectSinger(singer){
            saveSearch(query.value)
            selectedSinger.value=singer
            cacheSinger(singer)
            router.push({
                path:`/search/${singer.mid}`
            })
        }
        function cacheSinger(singer){
            storage.session.set(SINGER_KEY,singer)
        }
        const searchHistory=computed(()=>store.state.searchHistory)
        const scrollRef=ref(null)
        watch(query,async (newQuery)=>{
            if(!newQuery){
                await nextTick()
                refreshScroll()
            }
        })
        function refreshScroll(){
            scrollRef.value.scroll.refresh()
        }
        const confirmRef=ref(null)
        function showConfirm(){
            confirmRef.value.show()
        }
        return {
            query,
            hotKeys,
            addQuery,
            selectSong,
            selectSinger,
            selectedSinger,
            searchHistory,
            deleteSearch,
            scrollRef,
            showConfirm,
            confirmRef,
            clearSearch
        }
    }
}
</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>