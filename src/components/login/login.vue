<template>
  <div class="login" @keyup.13="LogoIn">
    <div class="logo">
      <img src="../../assets/images/ico.png" alt="logo">
      <span>抱 一 云 信</span>
    </div>
    <div class="cont">
      <div class="text">
        <h1>数 据 智 能&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驱 动 未 来</h1>
      </div>
      <div class="board">
        <h2>登&nbsp;录</h2>
        <div class="inputCont">
          <div class="input" :class="{ 'active': focus }">
            <img src="../../assets/images/phone.png" alt="">
            <input type="number" placeholder="输入手机号" v-model="username" @focus="focus=true" @blur="focus=false" autofocus autocomplete="on">
          </div>
          <div class="input" :class="{ 'active': focusPass }">
            <img src="../../assets/images/password.png" alt="">
            <input type="password" placeholder="输入登录密码" v-model="password" @focus="focusPass=true" @blur="focusPass=false">
          </div>
          <button @click="LogoIn">登&nbsp;录</button>
          <h3>
            <span class="hover">
              <router-link :to="{ name: 'sign', params: { userId: 123 }}">忘记密码 &nbsp;| &nbsp;</router-link>
              <router-link :to="{ name: 'reg', params: { userId: 123 }}">立即注册</router-link>
            </span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'md5'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      focus: false,
      focusPass: false
    }
  },
  methods: {
    LogoIn () {
      if (this.username === '' || this.password === '') {
        this.$message({
          message: '请输入正确用户名或密码！',
          type: 'warning'
        })
        return false
      } else if (this.password.length < 6) {
        this.$message({
          message: '密码至少6位！',
          type: 'warning'
        })
        return false
      } else {
        this.$ajax.post('/api/user/login', {
          telephone: this.username,
          password: md5(this.password)
        }).then(data => {
          console.log(data)
          if (data.data.code === '200') {
            this.setUserInfo(data.data.data)
            this.setUserToken(data.headers.accesstoken)
            this.$message({
              message: '登录成功,页面跳转中...',
              type: 'success',
              onClose: () => {
                this.$router.push({ name: 'index' })
              }
            })
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch(() => {
          this.$message.error('服务器错误！')
        })
      }
    },
    ...mapActions([
      'setUserInfo',
      'setUserToken'
    ])
  }
}
</script>
<style lang="stylus" scoped>
.login
  position fixed
  min-width 800px
  width 100%
  height 100%
  background url('../../assets/images/bg.png')
  .logo
    color #ffffff
    height 33px
    padding 26px 45px
    overflow hidden
    img
      height 60px
      line-height 36.5px
      opacity 37.53
      float left
      vertical-align middle
      margin-top -11px
    span
      font-size 18px
      line-height 30px
      margin-left 12px
      float left
      margin-top 5px
  .cont
    display flex
    justify-content space-around
    align-content center
    height calc(100% - 200px)
    .text
      align-self center
      font-size 24px
      line-height 33px
      color #ffffff
    .board
      align-self center
      background #ffffff
      border 1px solid #BAC6DC
      box-shadow 0 1px 12px rgba(255, 255, 255, 0.5)
      h2
        font-size 24px
        color #525F75
        line-height 60px
        box-shadow 0 1px 0 #cfc9c9
        text-align center
        font-weight 500
      .inputCont
        padding 30px
        .input
          width 310px
          height 22px
          border 1px solid #BAC6DC
          padding 15px 8px
          margin-bottom 16px
          img
            display inline-block
            // width 24px
            height 24px
            text-align center
            vertical-align middle
          input
            width 250px
            margin-left 15px
            outline none
            border none
            font-size 16px
            line-height 22px
          :-moz-placeholder /* Mozilla Firefox 4 to 18 */
            color lightgray
          ::-moz-placeholder /* Mozilla Firefox 19+ */
            color lightgray
          input:-ms-input-placeholder
            color lightgray
          input::-webkit-input-placeholder
            color lightgray
        button
          width 100%
          border none
          outline none
          line-height 52px
          color #ffffff
          font-size 16px
          background #40b6ff
          cursor pointer
          border-radius 2px
          margin-bottom 16px
          &:hover
            background #40b6f2
        h3
          overflow hidden
          span
            font-size 14px
            float right
            line-height 38px
            cursor pointer
            color #525F75
            // :hover
            // color #40b6ff
        .active
          border 1px solid #40b6f2
</style>
