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
    probeType:{  //派发scrool事件
      type:Number,
      default:1
    },
    click:{
      type:Boolean,
      default:false
    },
    listenScroll:{
      type:Boolean,
      default:false
    },
    data:{
      type:Array,
      default:null
    },
    pullup:{
      type:Boolean,
      default:false
    },
    beforeScroll:{
      type:Boolean,
      default:false
    },
    refreshDelay:{
      type:Number,
      default:20
    },
    direction:{
      type:String,
      default:DIRECTION_V
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
        probeType:this.probeType,
        click:this.click,
        mouseWheel:true,
        eventPassthrough:this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
      })
    },
    scrollTo(){
      this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    },
    refresh(){
      this.scroll && this.scroll.refresh.apply(this.scroll,arguments)
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {
    data(){
      setTimeout(() => {
        this.refresh()
      }, 200);
    }
  },
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
