<template>
  <div class="progress-bar-wrap" @mouseup="progressMouseUp($event)">
    <div class="progress-bar" ref="progressBar" @click="progressClick($event)">
      <div class="bar-inner">
        <!-- 进度 -->
        <div class="progress" ref="progress"></div>
        <!-- 按钮 -->
        <div
          class="progress-btn"
          @mousedown.prevent="progressMouseDown($event)"
          @mouseup="progressMouseUp($event)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 12 //按钮的宽度
export default {
  name: '',
  // 组件
  components: {},
  // 变量
  data() {
    return {
      touch: {}
    }
  },
  // 方法
  methods: {
    // 按钮按下
    progressMouseDown(e) {
      let that = this
      this.touch.initiated = true //节流阀
      this.touch.startX = e.pageX
      this.touch.left = this.$refs.progress.clientWidth // 距离左侧的距离
      document.onmousemove = function(e) {
        const deltaX = e.pageX - that.touch.startX // 移动了多少距离
        const offsetWith = Math.min(
          that.$refs.progressBar.clientWidth - progressBtnWidth,
          Math.max(0, that.touch.left + deltaX)
        )
        if (offsetWith > that.$refs.progressBar.clientWidth) {
          console.log('xxx')
        }
        that._offset(offsetWith)
      }
    },
    // 按钮抬起
    progressMouseUp(e) {
      if (e.button === 0) {
        // 没有按键
        if (document.onmousemove == null) {
          return
        }
        document.onmousemove = null
        document.onmouseup = null
        this.touch.initiated = false
      }
      this._triggerPercent()
    },
    // 点击进度条
    progressClick(e) {
      let offsetWith =
        e.pageX - this.$refs.progressBar.offsetLeft - progressBtnWidth / 2
      this._offset(offsetWith)
      this._triggerPercent()
    },
    // 设置进度
    _offset(offsetWithd) {
      this.$refs.progress.style.width = `${offsetWithd}px`
    },
    // 发送自定义事件
    _triggerPercent() {
      this.$emit('percentChange', this._getPercent())
    },
    // 获取进度的百分比
    _getPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      // console.log(this.$refs.progress.clientWidth / barWidth)
      return this.$refs.progress.clientWidth / barWidth
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.progress-bar-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.progress-bar {
  position: relative;
  width: 100%;
  flex: 1;
  height: 3px;
  background: rgba(0,0,0,.05);
  border-radius: 2px;
  cursor: pointer;
  margin: 0 25px;
  .bar-inner {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    .progress {
      width: 0px;
      background: $color-theme;
      height: 3px;
      border-radius: 2px;
    }
    .progress-btn {
      position: absolute;
      z-index: 100;
      right: -12px;
      width: 12px;
      height: 12px;
      top: -4.5px;
      background: $color-theme;
      box-shadow: 0 0 15px 0 rgba(0,0,0,.15);
      transition: all 0.3s;
      border-radius: 50%;
      &::after {
        position: absolute;
        content: " ";
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
