<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

const DIRECTION_H = 'horizontal' // 水平方向
const DIRECTION_V = 'vertical'   // 垂直方向

export default {
  name: "",
  props:{
    click:{
      type:Boolean,
      default:false
    }
  },
  // 组件
  components: {},
  // 变量
  data() {
    return {};
  },
  // 方法
  methods: {
    _initScroll(){
      if(!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:this.click
      })
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20);
  },
};
</script>

