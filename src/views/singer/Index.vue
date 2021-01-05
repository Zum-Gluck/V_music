<template>
  <div class="singer-wrap container">
    <div class="filter">
      <ul class="tag-lang">
        <!-- 语种 -->
        <li
          v-for="item of langs"
          :key="item.value"
          :class="lang == item.value ? 'active' : ''"
        >
          {{ item.label }}
        </li>
        <!-- 性别 -->
      </ul>
      <ul class="tag-lang tag-type">
        <li
          v-for="item of classifys"
          :key="item.value"
          :class="classify == item.value ? 'active' : ''"
        >
          {{ item.label }}
        </li>
      </ul>
      <!-- 首字母 -->
      <ul class="tag-en">
        <li
          v-for="item of ens"
          :key="item.value"
          :class="en == item.value ? 'active' : ''"
        >
          {{ item.label }}
        </li>
      </ul>
      <load-more> </load-more>
    </div>
  </div>
</template>

<script>
import loadMore from 'components/common/loadMore/Index'

export default {
  name: '',
  // 组件
  components: {
    loadMore
  },
  // 变量
  data() {
    return {
      // 语种
      lang: -1,
      langs: [
        { value: -1, label: '全部' },
        { value: 7, label: '华语' },
        { value: 96, label: '欧美' },
        { value: 8, label: '日本' },
        { value: 16, label: '韩国' },
        { value: 0, label: '其他' }
      ],
      // 分类
      classify: -1,
      classifys: [
        { value: -1, label: '全部' },
        { value: 1, label: '男歌手' },
        { value: 2, label: '女歌手' },
        { value: 3, label: '乐队' }
      ],
      // 字母A-Z
      en: -1,
      ens: []
    }
  },
  // 方法
  methods: {
    getEn() {
      let ens = []
      for (let i = 0; i < 26; i++) {
        ens.push({
          value: String.fromCharCode(97 + i),
          label: String.fromCharCode(65 + i)
        })
      }
      ens.unshift({
        value: -1,
        label: '热门'
      })
      ens.push({
        value: 0,
        label: '其他'
      })
      this.ens = ens
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getEn()
  },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.singer-wrap {
  // height: 100vh;
  margin-top: -20px;
  li {
    &:hover {
      color: $color-theme;
      transition: all 0.4s;
    }
  }
  .tag-en {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      width: 28px;
      height: 28px;
      margin-right: 14px;
      text-align: center;
      line-height: 29px;
      border-radius: 50%;
      font-size: 13px;
      color: #333333;
      cursor: pointer;
      &:first-child,
      &.last-child {
        width: 56px;
        border-radius: 14px;
      }
      &.active {
        background: $color-theme;
        font-weight: 700;
        color: #ffffff;
      }
      &:hover {
        color: $color-theme;
        transition: all 0.4s;
      }
    }
  }
  .tag-lang {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    li {
      width: 56px;
      height: 28px;
      line-height: 29px;
      font-size: 13px;
      text-align: center;
      border-radius: 14px;
      cursor: pointer;
      margin-right: 6px;
      &.active {
        background: $color-theme;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
  .tag-type {
    li {
      width: auto;
      padding: 0 15px;
    }
  }
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
  }
}
</style>
