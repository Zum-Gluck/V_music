<template>
  <transition name="fade">
    <div class="player-bar shadow flex-row">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="currentSong.image" alt="" />
      </div>
      <!-- 歌手信息 -->
      <div class="info ">
        <h2 class="ellipsis">{{ currentSong.name }}</h2>
        <p class="ellipsis">{{ currentSong.singer }}</p>
      </div>
      <!-- 播放按钮 -->
      <div class="player-btn">
        <i class="iconfont icon-prev niceshangyishou" @click="prevSong"></i>
        <i
          class="iconfont icon-play nicebofang2"
          @click="togglePlaying"
          :class="playIcon"
        ></i>
        <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
      </div>
      <!-- 进度条 -->
      <div class="progress-wrap" id="progress-wrap">
        <p class="current-time">{{ formatTime(currentSong) }}</p>
        <progress-bar @percentChange="percentChange"></progress-bar>
        <div class="duration-time">
          {{ formatTime(currentSong.duration) }}
        </div>
      </div>

      <!-- 音频标签 -->
      <audio
        ref="audio"
        :src="currentSong.url"
        @playing="audioReady"
        @pause="audioPause"
        @error="audioError"
      ></audio>

      <!-- Lyric List -->
      <transition name="fade">
        <div class="lyric-box shadow">
          <div class="title flex-between">歌词</div>
          <scroll>
            <div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
            </div>
          </scroll>
          <div class="foot"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Lyric from 'lyric-parser'
import progressBar from '../progressBar/Index'
import scroll from '../scroll/Index'
export default {
  name: '',
  // 组件
  components: {
    progressBar,
    scroll
  },
  // 变量
  data() {
    return {
      songReady: false, // 是否开始播放
      currentLyric: null //当前歌词
    }
  },
  // 方法
  methods: {
    // 播放开始
    audioReady() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    // 歌曲暂停
    audioPause() {
      clearTimeout(this.timer)
      if (!this.songReady) return
      this.SET_PLAYING_STATE(false)
    },
    // 歌曲错误
    audioError() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    // 切换播放状态
    togglePlaying() {
      if (!this.songReady) return //从未播放 阻止代码向下执行
      this.SET_PLAYING_STATE(!this.playing)
    },
    //上一首
    prevSong() {
      if (!this.songReady) return
      let index = this.currentIndex - 1
      // 到了最后一曲
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.SET_CURRENT_INDEX(index)
      // 如果正在暂停 让他播放
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    // 下一首
    nextSong() {
      if (!this.songReady) return
      let index = this.currentIndex + 1
      if (index == this.playList.length) {
        index = 0
      }
      this.SET_CURRENT_INDEX(index)
      // 如果正在暂停 让他播放
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    // 监听进度条改变
    percentChange(percent) {
      console.log(percent)
    },
    // 处理歌词
    async getLyric(id) {
      let res = await this.$api.getLyric(id)
      if (res.code != 200) return
      let lyric = res.lrc.lyric
      this.currentLyric = new Lyric(lyric, this.lyricHandle)
      console.log(this.currentLyric)
    },
    // 歌词回调
    lyricHandle({ lineNum, txt }) {
      console.log(1)
    },
    // 日期格式化
    formatTime(interval) {
      interval = interval | 0 //去掉小数部分  相当于 Math.floor
      const m = (interval / 60) | 0
      const s = interval % 60 | 0
      return `${this.utils.formatZero(m, 2)}:${this.utils.formatZero(s, 2)}`
    },
    ...mapActions(['pausePlay']),
    ...mapMutations([
      'SET_PLAYING_STATE',
      'SET_CURRENT_INDEX',
      'SET_PLAYING_STATE'
    ])
  },
  // 计算属性
  computed: {
    ...mapGetters(['currentSong', 'playing', 'currentIndex', 'playList']),
    playIcon() {
      return this.playing ? 'nicezanting1' : 'nicebofang2'
    }
  },
  // 监控data中的数据变化
  watch: {
    // 监听当前歌曲的变化
    currentSong(newSong, oldSong) {
      // hack
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false

      // 播放
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.src = newSong.url
          audio.play()
        }
      })

      // 如果五秒未播放 更改状态确保可以切换歌曲
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 5000)

      this.getLyric(newSong.id)
    },
    playing(isPlaying) {
      // 监听播放状态
      if (!this.songReady) return

      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          isPlaying ? audio.play() : audio.pause()
        }
      })
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.aaa{
  height 300px
}
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-leave-active {
  transition: all 0.5s;
}
.player-bar {
  width: 100%;
  height: 72px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8000;
  padding: 0 10px 0 20px;
  justify-content: space-between;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 30px
    flex-shrink: 0;
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
  .info {
    margin-right: 15px;
    flex-shrink: 0;
    width: 120px;
    h2 {
      font-size: 14px;
      color: #333;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
      color: #999999;
    }
  }
  .player-btn {
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
    .icon-prev {
      font-size: 40px;
    }
    .icon-play {
      font-size: 60px;
      margin: 0 10px;
    }
    .icon-next {
      font-size: 40px;
    }
  }
  .progress-wrap {
    width: 650px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 80px;
    flex: 1;
    p {
      font-size: 14px;
    }
  }
  .volume-wrap {
    width: 180px;
    margin-left: 40px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    .volume-icon {
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
    }
    .progress-bar {
      position: relative;
      width: 100%;
      flex: 1;
      height: 2px;
      background: rgba(0,0,0,.05);
      border-radius: 2px;
      cursor: pointer;
      margin-left: 10px;
      .bar-inner {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        .progress {
          width: 50px;
          background: $color-theme;
          height: 2px;
          border-radius: 2px;
        }
        .progress-btn {
          position: absolute;
          z-index: 100;
          right: -4px;
          width: 10px;
          height: 10px;
          top: -4.5px;
          background: $color-theme;
          box-shadow: 0 0 15px 0 rgba(0,0,0,.15);
          border-radius: 50%;
          &::after {
            position: absolute;
            content: " ";
            top: 50%;
            left: 50%;
            margin: -3px 0 0 -3px;
            width: 6px;
            height: 6px;
            background: #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .tool {
    .iconfont {
      font-size: 26px;
      margin: 0 15px;
      cursor: pointer
      &:active {
        opacity: 0.7;
      }
      &.icon-like {
        font-size: 26px;
      }
    }
  }
  .lyric-box {
    width: 360px;
    height: 580px;
    position: absolute;
    right: 0;
    bottom: 80px;
    border-radius: 3px;
    padding: 30px;
    overflow: hidden
    .title {
      margin: 10px 0 30px;
      font-weight: 500;
      font-size: 16px;
      i {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: $color-theme;
        }
      }
      .clearBtn {
        font-size: 16px;
        color: $color-theme;
        cursor: pointer;
      }
    }
    .lyric {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 430px;
      overflow: hidden
      .lyric-wrapper {
        width: 100%
        margin: 0 auto
        overflow: hidden
        .lyric-text {
          margin: 5px 0;
          line-height: 24px;
          font-size: 14px;
          font-weight: 300;
          &.active {
            color: $color-theme;
          }
        }
      }
    }
  }
  .playlist-box {
    width: 460px;
    .list {
      overflow-y: scroll;
      max-height: calc(100% - 90px);
      .item {
        padding: 8px 0;
        height: 40px;
        .index-container {
          width: 30px;
          margin-right: 20px;
          flex-shrink: 0;
          .num {
            font-size: 14px;
            color: #4a4a4a;
          }
          .play-icon {
            display: none;
            height: 16px;
            min-width: 18px;
            overflow: hidden;
            .line {
              width: 2px;
              height: 100%;
              margin-left: 2px;
              background-color: #ff410f;
              animation: play .9s linear infinite alternate;
            }
          }
          .play-btn {
            color: $color-theme;
            font-size: 28px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
          .pause-btn {
            color: $color-theme;
            font-size: 30px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
        }
        p {
          cursor: pointer;
          flex: 1;
          margin-right: 20px;
          &.active {
            color: $color-theme;
          }
        }
        i {
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: $color-theme;
          }
        }
        &.playing {
          p {
            color: $color-theme;
          }
          i {
            color: $color-theme;
          }
          .index-container {
            .num {
              display: none;
            }
            .play-icon {
              display: flex;
            }
            .play-btn {
              display: none;
            }
          }
        }
        &:hover {
          .index-container {
            .num {
              display: none;
            }
            .play-btn {
              display: block;
            }
          }
          &.playing {
            .index-container {
              .play-btn {
                display: none;
              }
              .play-icon {
                display: none;
              }
              .pause-btn {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
