import * as types from './mutation-type'
import '../common/playConfig'
import utils from '@/utils/utils'
import { playMode } from '../common/playConfig'

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

// 选择播放
export const selectPlay = function ({ commit, state }, { list, index }) {
  // 顺序列表
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = utils.shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true) // 播放中
}

// 播放全部
export const playAll = function ({ commit }, { list }) {

}

// 暂停播放
export const pausePlay = function ({ commit }) {
  commit(types.SET_PLAYING_STATE, false)
}

// 开始播放