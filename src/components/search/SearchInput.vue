<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input
      class="input-inner"
      v-model="query"
      :placeholder="placeholder"
    />
    <i
      v-show="query"
      class="icon-dismiss"
      @click="clear"
    ></i>
  </div>
</template>

<script>
import { ref, watch, getCurrentInstance } from 'vue';
import { debounce } from 'throttle-debounce'

export default {
    name:'SearchInput',
    props:{
        modelValue:{
            type:String
        },
        placeholder:{
            type:String,
            default:'搜索歌曲、歌手'
        }
    },
    setup(props,{emit}){
        const {ctx}=getCurrentInstance()
        const query=ref(props.modelValue)
        watch(query,(newQuery)=>{
            emit('update:modelValue',newQuery.trim())
        })
        ctx.$watch('query',debounce(300,(newQuery)=>{
            emit('update:modelValue',newQuery.trim())
        }))
        ctx.$watch('modelValue',(newValue)=>{
            query.value=newValue
        })
        function clear(){
            query.value=''
        }
        return {
            query,
            clear
        }
    }
}
</script>

<style lang="scss" scoped>
  .search-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 32px;
    background: $color-highlight-background;
    border-radius: 6px;
    .icon-search {
      font-size: 24px;
      color: $color-text-d;
    }
    .input-inner {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-highlight-background;
      color: $color-text;
      font-size: $font-size-medium;
      outline: 0;
      &::placeholder {
        color: $color-text-d;
      }
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-text-d;
    }
  }
</style>