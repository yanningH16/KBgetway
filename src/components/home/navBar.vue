<template>
  <div class="menu">
    <div class="logo">
      <!-- <img src="../../assets/images/ico.png" alt="logo"> -->
      <span>渠道管理系统</span>
    </div>
    <div class="router">
      <div class="routerBox" v-for="(item,index) in menus" :key="index" ref="routerBox">
        <router-link tag="div" :to="{name:item.router}" class="routerHeader" v-if="!item.children">
          <span class="icon iconfont" :class="item.icon"></span>
          <span class="text">{{item.header}}</span>
        </router-link>
        <div class="routerHeader" v-if="item.children" @click="changeShow(index)">
          <span class="icon iconfont" :class="[item.icon]"></span>
          <span class="text">{{item.header}}</span>
          <span class="more el-icon-arrow-down" :class="{'moreActive':chooseIndexArray.includes(index), 'unMoreActive': !chooseIndexArray.includes(index) }"></span>
          <!-- <span class="more el-icon-arrow-up"></span> -->
        </div>
        <el-collapse-transition>
          <div class="childRouter" v-if="item.children" v-show="chooseIndexArray.includes(index)">
            <router-link tag="div" :to="{name:childItem.router}" class="childBox" v-for="(childItem,childIndex) in item.children" :key="childIndex">
              <span class="icon iconfont" :class="childItem.icon"></span>
              <span class="text">{{childItem.header}}</span>
            </router-link>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'navBar',
  data () {
    return {
      isActive: 0,
      chooseIndexArray: [0, 1, 2, 3, 4, 5, 6, 7]
    }
  },
  computed: {
    menus: {
      get () {
        return [
          {
            icon: 'icon-yingxiaoduanxin',
            header: '账户余额',
            router: 'leftMoney'
          },
          {
            icon: 'icon-xityongduanxin',
            header: '分站管理',
            router: 'stationManger'
          },
          {
            icon: 'icon-qianmingguanli',
            header: '本站充值记录',
            router: 'localRechargeList'
          },
          {
            icon: 'icon-duanxinchaxun',
            header: '分站充值记录',
            router: 'stationRechargeList'
          }
        ]
      },
      set (val) {
        return val
      }
    }
  },
  watch: {
    '$route': 'setRouterActive'
  },
  mounted () {
    this.setRouterActive()
  },
  methods: {
    setRouterActive () {
      this.$nextTick(() => {
        let activeRouter = this.$route.path
        console.log(activeRouter)
      })
    },
    changeShow (index) {
      let arrLength = this.chooseIndexArray.length
      if (this.chooseIndexArray.includes(index)) {
        for (let i = 0; i < arrLength; i++) {
          if (this.chooseIndexArray[i] === index) {
            this.chooseIndexArray.splice(i, i + 1)
          }
        }
      } else {
        this.chooseIndexArray.push(index)
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.menu
  background #19223D
  height 100%
  .logo
    height 60px
    line-height 60px
    text-align center
    background #19223D
    img
      vertical-align middle
      width 60px
    span
      font-size 20px
      font-weight bold
      vertical-align middle
      color #ffffff
  .headActive
    color #40B6FF
  .router
    background #19223D
    .routerBox
      font-size 0
      .routerHeader, .childBox
        height 40px
        line-height 40px
        color #BAC6DC
        font-size 14px
        cursor pointer
        position relative
        .text
          margin-left 52px
        .icon
          text-align center
          position absolute
          top 0
          left 24px
        .more
          position absolute
          right 14px
          top 14px
          &.moreActive
            transition 0.1s linear
            transform rotate(-180deg)
          &.unMoreActive
            transition 0.1s linear
            transform rotate(0)
        &:hover
          background #13192B
          transition background-color 0.3s, color 0.3s
          &::before
            content ''
            height 100%
            width 3px
            background #40B6FF
            position absolute
            transition all 0.3s
        &.router-link-active
          background #13192B
          color #ffffff
          .icon
            color #40B6FF
          &::before
            content ''
            height 100%
            width 3px
            background #40B6FF
            position absolute
      .childBox
        background #141C35
</style>
