<template>
  <div class="userTitle">
    <div class="cont">
      <div>
        <span class="record" v-if="userInfo.status===2">
          <i class="iconfont icon-qi"></i>
          <strong>认证中</strong>
        </span>
        <router-link :to="{name:'sucessChange'}">
          <span class="record" v-if="userInfo.status===1">
            <i class="iconfont icon-qi1"></i>
            <strong>已认证</strong>
          </span>
        </router-link>
        <span class="record" v-if="userInfo.status===4">
          <i class="iconfont icon-qi2"></i>
          <strong>认证驳回</strong>
        </span>
        <span class="record" v-if="userInfo.status===3">
          <i class="iconfont icon-qi2"></i>
          <strong>未认证</strong>
        </span>
      </div>
      <div class="price">
        <span>余额:
          <strong>￥{{ priceObj.balance }}</strong>
        </span>
        <span>圆通:
          <strong>￥{{ priceObj.price }}</strong>
          元/单</span>
        <span>预计放单数:
          <strong>{{ numSum }}</strong>单
        </span>
        <em @click="$router.push({name: 'leftMoney'})">充值</em>
      </div>
      <div class="info" @click="showInfo=!showInfo">
        <b class="head">
          Y
        </b>
        <span>{{ userInfo.userName || userInfo.telephone }}</span>
        <a class="el-icon-arrow-down"></a>
        <transition :name="showInfo ? 'el-fade-in-linear' : 'el-fade-in'">
          <ul class="operate" :class="{ 'fadeIn': showInfo, 'fadeOut': !showInfo }" v-show="showInfo">
            <li @click="showPass=true">
              <i class="iconfont icon-xiugaimima"></i>
              <span>修改登录密码</span>
            </li>
            <li @click="logout">
              <i class="iconfont icon-quite"></i>
              <span>退出登录</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <div class="alert">
      <el-dialog title="修改登录密码" :visible.sync="showPass" :modal-append-to-body="false" width="600px">
        <div class="list">
          <span>输入原密码</span>
          <el-input v-model="fixPassObj.oldpass" type="password" style="width:300px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="list">
          <span>输入新密码</span>
          <el-input v-model="fixPassObj.newpass1" type="password" style="width:300px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="list">
          <span>重新输入新密码</span>
          <el-input v-model="fixPassObj.newpass2" type="password" style="width:300px;" placeholder="请输入内容"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showPass = false">取 消</el-button>
          <el-button type="primary" @click="fixPass">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import md5 from 'md5'
export default {
  name: 'userTitle',
  data () {
    return {
      showPass: false,
      showInfo: false,
      task: false,
      priceObj: {},
      fixPassObj: {
        oldpass: '',
        newpass1: '',
        newpass2: ''
      }
    }
  },
  computed: {
    numSum () {
      let money = this.priceObj.balance
      let price = this.priceObj.price
      let num = 0
      num = Math.floor(money / price) || 0
      return num
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    '$route': 'getPrice'
  },
  methods: {
    logout () {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'login' })
      }).catch((err) => {
        console.error(err)
      })
    },
    fixPass () {
      this.$ajax.post('/api/channel/changePwd', {
        channelAccountId: this.userInfo.channelAccountId,
        oldPwd: md5(this.fixPassObj.oldpass),
        newPwd: md5(this.fixPassObj.newpass1),
        rePwd: md5(this.fixPassObj.newpass2)
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.showPass = false
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    getPrice () {
      this.$ajax.post('/api/channel/getBalance', {
        channelId: this.userInfo.channelId
      }).then((data) => {
        if (data.data.code === '200') {
          this.priceObj = data.data.data
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  mounted () {
    this.getPrice()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.userTitle
  position relative
  z-index 998
  height 60px
  font-size 12px
  background #ffffff
  box-shadow 0 2px 0 #E8EBF0
  .cont
    float right
    display flex
    line-height 100%
    // width 150px
    width auto
    height 100%
    text-align right
    padding 0 20px
    .price
      margin-right 20px
      span
        margin-right 10px
      strong
        color #ff3341
        font-weight bold
      em
        cursor pointer
        color #409EFF
    >div
      line-height 60px
    .record
      margin-right 24px
      font-size 12px
      color #525F75
      line-height 1
      i, strong
        vertical-align middle
    .info
      cursor pointer
      position relative
      .head
        display inline-block
        width 19px
        height 19px
        margin-right 10px
        border 1px solid #000000
        border-radius 50%
        background #000000
        line-height 20px
        text-align center
        color #ffffff
        font-weight bold
      .operate
        position fixed
        top 60px
        right 0
        z-index 999
        width 180px
        background #ffffff
        text-align left
        transition all 0.3s
        box-shadow 0 2px 4px rgba(82, 95, 117, 0.18)
        li
          height 50px
          line-height 50px
          font-size 14px
          color #525F75
          i
            display inline-block
            width 20px
            height 20px
            margin 0 20px
          &:hover
            background #EEF8FF
  .alert
    .list
      padding 0 20px 0 40px
      font-size 14px
      color #525F75
      margin-top 20px
      span
        display inline-block
        min-width 100px
        text-align right
        margin-right 20px
</style>
