<template>
  <div class="container">
    <div class="box">
      <!-- 左侧start -->
      <div class="left shadow">
        <el-card class="box-card">
          <div class="flex-row top">
            <div class="logo">
              <el-image :src="detail.coverImgUrl" lazy></el-image>
            </div>
            <div class="songsheet flex-layout">
              <h1>{{ detail.name }}</h1>
              <div class="creator flex-row">
                <img :src="creator.avatarUrl" class="avatar" />
                <span>
                  {{ creator.nickname }}
                </span>
                <span>
                  {{ utils.dateFormat(detail.createTime, 'YYYY-MM-DD') }}创建
                </span>
              </div>
              <div>
                标签:
                <span
                  class="tag"
                  v-for="(item, index) of detail.tags"
                  :key="index"
                  @click="toPlayList(item)"
                >
                  {{ item }}
                </span>
              </div>
              <div>{{ _normalizeDescription }}</div>
            </div>
          </div>
          <artistList :songs="songs"></artistList>
        </el-card>
      </div>
      <!-- 左侧end -->

      <!-- 右侧start -->
      <div class="right">
        <!-- 歌单收藏者 -->
        <el-card class="box-card">
          <div class="funs">喜欢这个歌单的人</div>
          <ul>
            <li v-for="(item, index) of subscribers" :key="index">
              <img :src="item.avatarUrl" :title="item.nickname" />
            </li>
          </ul>
        </el-card>

        <!-- 推荐歌单  -->
        <el-card class="box-card card-box">
          <div class="funs">相关推荐</div>
          <ol>
            <li
              v-for="item of AboutRecommend"
              :key="item.userId"
              @click="toRecommend(item.id)"
              class="flex-row"
            >
              <div><img :src="item.coverImgUrl" alt="" /></div>
              <div class="font_right">
                <div class="ellipsis ol-item" :title="item.name">
                  {{ item.name }}
                </div>
                <div class="ol_name">By: {{ item.nickname }}</div>
              </div>
            </li>
          </ol>
        </el-card>

        <!-- 评论 -->
        <el-card class="box-card">
          <div class="funs">精彩评论</div>
          <div class="comment">
            <div
              v-for="(item, index) of hotComments"
              :key="index"
              class="comment-item flex-row"
            >
              <img :src="item.avatarUrl" alt="" />
              <div>
                <div class="username">
                  {{ item.nickname }}
                  <span class="time">{{ utils.formatMsgTime(item.time) }}</span>
                </div>
                <div class="content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- 右侧end -->
    </div>
  </div>
</template>

<script>
import { createSong } from 'model/song'
import artistList from 'components/common/artistList/Index'
export default {
  name: '',
  // 组件
  components: {
    artistList
  },
  // 变量
  data() {
    return {
      detail: [], // 歌单详情
      creator: {}, // 创建者
      songs: [], // 歌曲列表
      hotComments: [], //热门评论
      subscribers: [], //歌单收藏者
      recommend: [], // 推荐歌单
      AboutRecommend: [] // 推荐歌单作者
    }
  },
  // 方法
  methods: {
    // 跳转
    toRecommend(id) {
      let arr = location.hash.split('=')
      arr[1] = id
      let str = arr.join('=')
      location.hash = str
      this.initialize(id)
    },
    // tag跳转
    toPlayList(item) {
      this.$router.push({
        name: 'playlist',
        query: {
          cat: items
        }
      })
    },
    // 相关歌单推荐
    async getRelatedPlaylist(id) {
      try {
        let res = await this.$api.getRelatedPlaylist(id)
        if (res.code != 200) return
        this.recommend = res.playlists
        this.AboutRecommend = this._normalizeAboutRecommend(this.recommend)
      } catch (err) {
        console.log(err)
      }
    },
    // 处理推荐歌单
    _normalizeAboutRecommend(list) {
      let arr = []
      list.forEach(item => {
        arr.push(item.creator)
        delete item.creator
      })

      let ret = []
      arr.forEach((item, index) => {
        ret.push(Object.assign(item, list[index]))
      })
      return ret
    },
    // 获取歌单收藏者
    async getSubscribersPlaylist(id) {
      let params = {
        id,
        limit: 28,
        offset: 0
      }
      try {
        let res = await this.$api.getSubscribersPlaylist(params)
        if (res.code == 200) {
          this.subscribers = res.subscribers
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取评论
    async getCommentPlaylist(id) {
      // 请求参数
      let param = {
        id
      }
      try {
        let res = await this.$api.getCommentPlaylist(param)
        if (res.code == 200) {
          this.hotComments = this._normalizeComponent(res.hotComments)
          console.log(this.hotComments)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取歌曲id
    async getPlayListDetail(id, s) {
      let timestamp = new Date().valueOf()
      let res = await this.$api.getPlayListDetail(id, s, timestamp)
      if (res.code == 200) {
        if (res.playlist.description != null) {
          // console.log(res.playlist.description)
          // 替换字符串
          res.playlist.description = res.playlist.description.replace(
            /(\r\n|\n\r)/gm,
            '<br />'
          )
        }

        this.detail = res.playlist
        this.creator = res.playlist.creator
        // console.log(this.creator)
        // console.log(this.detail)
        let trackIds = res.playlist.trackIds
        // 数量超过一千，进行分割
        let arrLength = 1000
        let sliceArr = []
        for (let i = 0; i < trackIds.length; i += arrLength) {
          sliceArr.push(trackIds.slice(i, i + arrLength))
        }
        this.getSongDetail(sliceArr)
      }
    },
    // 获取歌曲详情
    async getSongDetail(sliceArr) {
      let before = sliceArr[0]
      let after = sliceArr[1]
      let timestamp = new Date().valueOf()
      let beforeIds = []
      let afterIds = []
      before.forEach(item => {
        beforeIds.push(item.id)
      })
      beforeIds = beforeIds.join(',')
      if (after) {
        after.forEach(item => {
          afterIds.push(item.id)
        })
        afterIds = afterIds.join(',')
      }
      try {
        if (after) {
          let beforeRes = await this.$api.getSongDetail(beforeIds, timestamp)
          let afterRes = await this.$api.getSongDetail(afterIds, timestamp + 1)
          let res = beforeRes.songs.concat(afterRes.songs)
          this.songs = this._normalizeSongs(res.songs)
        } else {
          let beforeRes = await this.$api.getSongDetail(beforeIds, timestamp)
          let res = beforeRes
          this.songs = this._normalizeSongs(res.songs)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 处理歌曲
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        ret.push(createSong(item))
      })
      return ret
    },
    // 处理评论
    _normalizeComponent(list) {
      let ret = []
      list.forEach((item, i) => {
        let user = item.user
        ret.push({
          nickname: user.nickname,
          userId: user.userId,
          avatarUrl: user.avatarUrl,
          content: item.content,
          time: item.time
        })
      })
      return ret
    },
    initialize(id) {
      this.getPlayListDetail(id, 100)
      this.getCommentPlaylist(id)
      this.getSubscribersPlaylist(id)
      this.getRelatedPlaylist(id)
    }
  },
  // 计算属性
  computed: {
    _normalizeDescription() {
      let str = this.detail.description
      if (!str) return
      str = str.slice(0, str.indexOf('\n'))
      if (str.length > 50) {
        str = str.slice(0, 20)
        str += '...'
      }
      return str
    }
  },
  // 监控data中的数据变化
  watch: {
    $route() {
      this.id = this.$route.query.id
      this.getPlayListDetail(this.id, 100)
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.initialize(this.$route.query.id)
  }
}
</script>

<style lang="stylus" scoped>
.box {
  display: flex;
}

.left {
  width: 950px;
  margin-right: 15px;

  .logo {
    width: 200px;
    height: 200px;
    margin-right: 25px;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 7px 7px 10px -1px rgba(0, 0, 0, 0.3);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .songsheet {
    height: 200px;
    flex-direction: column;
    justify-content: space-around;

    .creator {
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
      }

      & span:nth-child(2) {
        margin: 0 17px 0 13px;
        cursor: pointer;

        &:hover {
          color: $color-theme;
        }
      }

      & span:nth-child(3) {
        font-size: 13px;
        color: #808080;
      }
    }

    .tag {
      padding: 4px 12px;
      margin: 0 10px;
      border-radius: 15px;
      color: #fff;
      background-color: $color-theme;
      cursor: pointer;
    }
  }
}

.right {
  width: 350px;
  align-self: flex-start;
  flex-shrink: 0;

  .card-box {
    margin: 10px 0;
  }

  .funs {
    padding-left: 12px;
    border-left: $color-theme 3px solid;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    li {
      padding: 0 5px 10px;
      width: 14.2%;

      img {
        border-radius: 4px;
      }
    }
  }

  ol {
    li {
      margin-top: 10px;
      cursor: pointer;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius 5px
      cursor pointer
    }

    .font_right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 255px;
      height: 50px;
      padding-left: 15px;

      &:hover .ol-item {
        color: $color-theme;
        cursor: pointer;
      }
    }

    .ol-item {
      font-size: 14px;
      color: #4a4a4a;
      font-weight: 700;
    }

    .ol_name {
      font-size 12px
      color #A5A5c1
    }
  }
}
.comment {
  padding-top 10px
  .comment-item {
    padding 10px 0
    img {
      width 50px
      height 50px
      margin-right 14px
      border-radius 50%
      align-self flex-start
    }
    .username {
      font-size 15px
      color #4a4a4a
      font-weight 700
      .time {
         font-size 12px
         color #A5A5C1
         font-weight 500
      }
    }
    .content {
      padding 5px 10px
      margin-top 5px
      background-color #f5f5f5
    }
  }
}
</style>
