import { PLAY_MODE } from '@/assets/js/constant.js'
import { shuffle } from '@/assets/js/util'
export function selectPlay({commit},{list,index}){
    commit('setPlayMode',PLAY_MODE.sequence)
    commit('setSequenceList',list)
    commit('setPlayingState',true)
    commit('setFullScreen',true)
    commit('setPlayList',list)
    commit('setCurrentIndex',index)
}
export function randomPlay({commit},list){
    commit('setPlayMode',PLAY_MODE.random)
    commit('setSequenceList',list)
    commit('setPlayingState',true)
    commit('setFullScreen',true)
    commit('setPlayList',shuffle(list))
    commit('setCurrentIndex',0)
}
export function changeMode({commit,state,getters},mode){
    const currentId=getters.currentSong.id
    if(mode===PLAY_MODE.random){
        commit('setPlayList',shuffle(state.sequenceList))
    } else {
        commit('setPlayList',state.sequenceList)
    }
    const index=state.playList.findIndex((song)=>{
        return song.id===currentId
    })
    commit('setCurrentIndex',index)
    commit('setPlayMode',mode)
}
export function removeSong({commit,state},song){
    const sequenceList=[...state.sequenceList]
    const playList=[...state.playList]
    const sequenceIndex=findIndex(sequenceList,song)
    const playIndex=findIndex(playList,song)
    if(sequenceIndex<0||playIndex<0){
        return
    }
    sequenceList.splice(sequenceIndex,1)
    playList.splice(playIndex,1)
    let currentIndex=state.currentIndex
    if(playIndex<currentIndex||currentIndex===playList.length){
        currentIndex--
    }
    commit('setSequenceList',sequenceList)
    commit('setPlayList',playList)
    commit('setCurrentIndex',currentIndex)
    if(playList.length===0){
        commit('setPlayingState',false)
    }
}
function findIndex(list,song){
    return list.findIndex((item)=>{
        return item.id===song.id
    })
}
export function clearSongList({commit}){
    commit('setSequenceList',[])
    commit('setPlayList',[])
    commit('setCurrentIndex',0)
    commit('setPlayingState',false)
}
export function addSong({commit,state},song){
    const playList=[...state.playList]
    const sequenceList=[...state.sequenceList]
    let currentIndex=state.currentIndex
    const playIndex=findIndex(playList,song)
    if(playIndex>-1){
        currentIndex=playIndex
    }else{
        playList.push(song)
        currentIndex=playIndex.length-1
    }
    const sequenceIndex=findIndex(sequenceList,song)
    if(sequenceIndex===-1){
        sequenceList.push(song)
    }
    commit('setSequenceList',sequenceList)
    commit('setPlayList',playList)
    commit('setCurrentIndex',currentIndex)
    commit('setPlayingState',true)
    commit('setFullScreen',true)
}