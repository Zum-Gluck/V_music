<template>
  <transition name="fade">
    <div class="player-bar shadow flex-row" v-if="playList.length > 0">
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
        <p class="current-time">{{ formatTime(currentTime) }}</p>
        <progress-bar
          @percentChange="percentChange"
          :percent="percent"
        ></progress-bar>
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
        @timeupdate="updateTime($event)"
        @ended="audioEnd"
      ></audio>

      <!-- 音量控件 -->
      <div class="volume-wrap">
        <i class="iconfont volume-icon" :class="Muted" @click="MutedClick"></i>
        <div class="progress-bar">
          <el-slider
            style="width: 100%;"
            class="bar-inner"
            @change="changeVolume"
            v-model="volumeNum"
            :show-tooltip="false"
          ></el-slider>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="tool">
        <i class="iconfont" :class="modeIcon" @click="modeChange"></i>
        <i class="iconfont nicegeci32" @click="showLyric = !showLyric"></i>
        <i class="iconfont nicebofangliebiao24"></i>
      </div>

      <!-- Lyric List -->
      <transition name="fade">
        <div class="lyric-box shadow" v-show="showLyric">
          <div class="title flex-between">歌词</div>
          <scroll
            class="lyric"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div v-if="currentLyric">
              <p
                ref="lyricLine"
                class="lyric-text"
                :class="currentLyricNum == index ? 'active' : ''"
                v-for="(item, index) of currentLyric.lines"
                :key="index"
              >
                {{ item.txt }}
              </p>
            </div>
            <div v-else>暂无歌词</div>
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
import { playMode } from 'common/playConfig.js'
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
      currentLyric: null, //当前歌词
      currentTime: 0, //当前时间
      isPureMusic: false, //是否 为纯音乐
      currentLyricNum: 0, // 当前歌词行数
      isMuted: false, //是否禁音
      showLyric: false,
      volumeNum: 50,
      volume: 0.5
    }
  },
  // 方法
  methods: {
    // 播放开始
    audioReady() {
      clearTimeout(this.timer)
      this.songReady = true
      this.canLyricPlay = true
      if (this.currentLyric && !this.isPureMusic) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    // 歌曲暂停
    audioPause() {
      clearTimeout(this.timer)
      if (!this.songReady) return
      this.SET_PLAYING_STATE(false)
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    // 歌曲错误
    audioError() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    // 监听播放时间
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 播放完成
    audioEnd() {
      this.currentTime = 0
      if (this.mode == playMode.loop) {
        this.loopSong()
      } else {
        this.nextSong()
      }
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
    // 单曲循环播放
    loopSong() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.SET_PLAYING_STATE(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    // 监听进度条改变
    percentChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.currentTime = this.$refs.audio.currentTime = currentTime
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
      // 暂停中让他播放
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    // 处理歌词
    async getLyric(id) {
      try {
        let res = await this.$api.getLyric(id)
        if (res.code != 200) return
        let lyric = res.lrc.lyric
        this.currentLyric = new Lyric(lyric, this.lyricHandle)
        if (this.playing && this.canLyricPlay) {
          this.currentLyric.seek(this.currentTime * 1000)
        }
      } catch (err) {
        console.log(err)
        this.currentLyric = null
        this.currentLyricNum = 0
      }
    },
    // 歌词回调
    lyricHandle({ lineNum, txt }) {
      this.currentLyricNum = lineNum
      if (lineNum > 10) {
        let lineEl = this.$refs.lyricLine[lineNum - 10]
        if (this.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
          })
        }
      } else {
        if (this.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricList.scrollTo(0, 0, 1000)
          })
        }
      }
    },
    // 改变音量
    changeVolume(callback) {
      this.volume = callback / 100
      console.log(this.volume)
      this.$refs.audio.volume = this.volume
    },
    // 点击静音
    MutedClick() {
      if (!this.isMuted) {
        this.$refs.audio.volume = 0
      } else {
        this.$refs.audio.volume = this.volume
      }
      this.isMuted = !this.isMuted
    },
    modeChange() {
      const mode = (this.mode + 1) % 3
      this.SET_PLAY_MODE(mode)
      let list = null
      console.log(this.sequenceList)
      if (mode === playMode.random) {
        //如果是随机模式
        list = this.utils.shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      console.log(list)
      this.resetCurrentIndex(list)
      this.SET_PLAYLIST(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => item.id == this.currentSong.id)
      this.SET_CURRENT_INDEX(index)
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
      'SET_PLAYING_STATE',
      'SET_PLAY_MODE',
      'SET_CURRENT_INDEX',
      'SET_PLAYLIST'
    ])
  },
  // 计算属性
  computed: {
    // 进度条百分比
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    // 静音icon
    Muted() {
      return this.isMuted ? 'nicejingyin1' : 'niceshengyin1'
    },
    // mode图标
    modeIcon() {
      if (this.mode == playMode.sequence) return 'nicexunhuanbofang24'
      if (this.mode == playMode.loop) return 'nicebofangqidanquxunhuan'
      if (this.mode == playMode.random) return 'nicebofangqisuijibofang'
    },
    ...mapGetters([
      'currentSong',
      'playing',
      'currentIndex',
      'playList',
      'mode',
      'sequenceList'
    ]),
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
      console.log(newSong)
      this.songReady = false
      this.canLyricPlay = false
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.currentLyric = null
        this.currentLyricNum = 0
      }
      // 播放
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.src = newSong.url
          audio.volume = this.volume
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
    },
    volume(newVal) {
      if (newVal == 0) {
        this.isMuted = true
      } else {
        this.isMuted = false
      }
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
  z-index: 999;
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
.active{
  color $color-theme
}
</style>
