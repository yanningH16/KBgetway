<template>
  <div class="stationManger">
    <h2>分站管理</h2>
    <div class="search">
      <div class="left">
        <span>站点名称</span>
        <el-input v-model="substationName" placeholder="输入站点名称" style="width:180px;"></el-input>
        <em class="btn" @click="getList">查询</em>
      </div>
      <div class="right">
        <em class="btn-b" @click="userSet([{},2])">添加分站</em>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed="left" prop="substationId" label="站点ID" align="center" width="185">
        </el-table-column>
        <el-table-column prop="name" label="站点名称" align="center" width="200">
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center" width="120">
          <template slot-scope="scope">
            <span style="font-size:12px;">圆通: {{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="账户余额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="rechargeSum" label="累计充值" align="center" width="120">
        </el-table-column>
        <el-table-column prop="recipetAccount" label="收款帐号" align="center" width="200">
          <template slot-scope="scope">
            <div style="text-align:left;">
              <p>{{ scope.row.recipetContent }}</p>
              <p>转账(注意: 本站收款账号不 定时更换请每次转账前核对 收款账号)</p>
              <p>到账时间: 转账后请联系站长帮您充值</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="serviceQq" label="客服QQ" align="center" width="120">
        </el-table-column>
        <el-table-column prop="serviceWechatNum" label="客服微信" align="center" width="120">
        </el-table-column>
        <el-table-column prop="servicePhone" label="客服电话" align="center" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="userSet([scope.row,0])" type="text" size="small">手动充值</el-button>
            <el-dropdown @command="userSet">
              <span style="font-size:12px;color:#409EFF;">
                更多
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="[scope.row,1]">编辑</el-dropdown-item>
                <el-dropdown-item :command="[scope.row,3]">扣除金额</el-dropdown-item>
                <el-dropdown-item :command="[scope.row,4]">重置密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column prop="domainName" label="域名" align="center" width="120">
        </el-table-column>
        <el-table-column prop="adminUserName" label="管理员" align="center" width="120">
        </el-table-column>
        <el-table-column prop="gmtCreate" label="添加时间" align="center" width="180">
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
    <div class="alertGrounp">
      <el-dialog title="充值" :append-to-body="true" :visible.sync="rechargeObj.show" width="600px" top="25vh">
        <div class="cont" style="text-align:center;">
          <span>金额</span>
          <el-input v-model="rechargeObj.money" style="width:300px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span>备注</span>
          <el-input v-model="rechargeObj.common" style="width:300px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="buttons" style="text-align:center;margin-top:40px;">
          <span class="btn-b" style="margin-right:10px;" @click="rechargeObj.show = false">取消</span>
          <span class="btn" @click="sureToRecharge">确定</span>
        </div>
      </el-dialog>
      <el-dialog title="扣除余额" :append-to-body="true" :visible.sync="deleMoneyObj.show" width="600px" top="25vh">
        <div class="cont" style="text-align:center;">
          <span>金额</span>
          <el-input v-model="deleMoneyObj.money" style="width:300px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span>备注</span>
          <el-input v-model="deleMoneyObj.common" style="width:300px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="buttons" style="text-align:center;margin-top:40px;">
          <span class="btn-b" style="margin-right:10px;" @click="deleMoneyObj.show = false">取消</span>
          <span class="btn" @click="sureToDele">确定</span>
        </div>
      </el-dialog>
      <el-dialog title="重置密码" :append-to-body="true" :visible.sync="resetPassObj.show" width="600px" top="25vh">
        <div class="cont" style="text-align:center;">
          <span style="font-size:18px;font-wight:bold;">你确定要重置该用户的密码吗?请谨慎操作</span>
        </div>
        <div class="buttons" style="text-align:center;margin-top:40px;">
          <span class="btn-b" style="margin-right:10px;" @click="resetPassObj.show = false">取消</span>
          <span class="btn" @click="sureToReset">确定</span>
        </div>
      </el-dialog>
      <el-dialog :title="stationSetObj.type==0 ? '编辑分站' : '添加分站'" :append-to-body="true" :visible.sync="stationSetObj.show" width="600px" top="5vh">
        <div v-if="stationSetObj.type==0" class="cont" style="text-align:center;">
          <span style="display:inline-block;width:70px;text-align:right;">站点编码</span>
          <el-input v-model="stationSetObj.stationId" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">分站名称</span>
          <el-input v-model="stationSetObj.stationName" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">收款人</span>
          <el-input v-model="stationSetObj.payer" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">收款卡银行</span>
          <el-select v-model="stationSetObj.getBankName" style="width:400px;margin-left:10px;" placeholder="请选择">
            <el-option v-for="(item,index) in bankArr" :key="index" :label="item.bankName" :value="item.bankName">
            </el-option>
            <el-option label="其他" value="999">
            </el-option>
          </el-select>
        </div>
        <div class="cont" v-if="stationSetObj.getBankName==999" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;"></span>
          <el-input v-model="stationSetObj.otherBankName" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">收款卡号</span>
          <el-input v-model="stationSetObj.getAccount" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">客服微信</span>
          <el-input v-model="stationSetObj.kefuChat" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">客服QQ</span>
          <el-input v-model="stationSetObj.kefuQQ" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">客服电话</span>
          <el-input v-model="stationSetObj.kefuPhone" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">站长姓名</span>
          <el-input v-model="stationSetObj.siterName" style="width:153px;margin-left:10px;" placeholder="请输入内容"></el-input>
          <span style="display:inline-block;width:70px;text-align:right;">站长电话</span>
          <el-input v-model="stationSetObj.siterPhone" style="width:153px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">站长QQ</span>
          <el-input v-model="stationSetObj.siterQQ" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div v-if="stationSetObj.type==1" class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">管理员帐号</span>
          <el-input v-model="stationSetObj.adminAccount" :disabled="stationSetObj.type==0" style="width:153px;margin-left:10px;" placeholder="请输入内容"></el-input>
          <span style="display:inline-block;width:70px;text-align:right;">管理员密码</span>
          <el-input v-model="stationSetObj.adminPassword" type="password" style="width:153px;margin-left:10px;" placeholder="请输入内容"></el-input>
          <p style="color: #ff3341;text-align:left;padding-left:120px;">注: 管理员帐号添加后不可修改!</p>
        </div>
        <div v-if="stationSetObj.type==0" class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">管理员帐号</span>
          <el-input v-model="stationSetObj.adminAccount" :disabled="stationSetObj.type==0" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">圆通定价</span>
          <el-input v-model="stationSetObj.yuantongPrice" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="cont" style="text-align:center;margin-top:20px;">
          <span style="display:inline-block;width:70px;text-align:right;">分站域名</span>
          <el-input v-model="stationSetObj.stationAddress" style="width:400px;margin-left:10px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="buttons" style="text-align:center;margin-top:40px;">
          <span class="btn-b" style="margin-right:10px;" @click="stationSetObj.show = false">取消</span>
          <span class="btn" @click="sureToPost">确定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
import md5 from 'md5'
export default {
  name: 'stationManger',
  mixins: [pageCommon],
  data () {
    return {
      apiUrl: '/api/substation/getPagingListBySubstationName',
      bankArr: [],
      substationName: '', // 搜索名
      currentPage: 1,
      rechargeObj: {
        show: false,
        common: '',
        money: ''
      },
      deleMoneyObj: {
        show: false,
        common: '',
        money: ''
      },
      resetPassObj: {
        show: false
      },
      stationSetObj: {
        show: false,
        type: 0,
        stationId: '',
        stationName: '',
        getAccount: '',
        payer: '',
        getBankName: '',
        otherBankName: '',
        kefuChat: '',
        kefuQQ: '',
        kefuPhone: '',
        siterName: '',
        siterPhone: '',
        siterQQ: '',
        stationAddress: '',
        adminPassword: '',
        yuantongPrice: '',
        adminAccount: ''
      },
      tableData: []
    }
  },
  computed: {
    params () {
      return {
        channelId: this.userInfo.channelId,
        substationName: this.substationName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    getBank () {
      this.$ajax.post('/api/config/bankCard/getBankInfoList', {
      }).then((data) => {
        if (data.data.code === '200') {
          this.bankArr = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    // 确认充值
    sureToRecharge () {
      this.$ajax.post('/api/substation/recharge/addMoneyToSubstationFund', {
        money: this.rechargeObj.money,
        comment: this.rechargeObj.common,
        substationId: this.rechargeObj.row.substationId,
        operateUserId: this.userInfo.channelAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.rechargeObj.show = false
          this.getList()
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          for (let m in this.rechargeObj) {
            if (!(m === 'show')) {
              this.rechargeObj[m] = ''
            }
          }
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$message.error('服务器错误！')
      })
    },
    // 确认扣除金额
    sureToDele () {
      this.$ajax.post('/api/substation/recharge/reduceMoneyFromSubstationFund', {
        money: this.deleMoneyObj.money,
        comment: this.deleMoneyObj.common,
        substationId: this.deleMoneyObj.row.substationId,
        operateUserId: this.userInfo.channelAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.deleMoneyObj.show = false
          this.getList()
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          for (let m in this.deleMoneyObj) {
            if (!(m === 'show')) {
              this.deleMoneyObj[m] = ''
            }
          }
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$message.error('服务器错误！')
      })
    },
    userSet (command) {
      if (command[1] === 0) { // 添加金额
        this.rechargeObj.show = true
        this.rechargeObj.row = command[0]
      } else if (command[1] === 1) { // 编辑分站信息
        this.stationSetObj.type = 0
        let row = command[0]
        this.stationSetObj = {
          show: this.stationSetObj.show,
          type: this.stationSetObj.type,
          stationId: row.substationId,
          stationName: row.name,
          getAccount: row.recipetAccount,
          payer: row.recipetUserName,
          getBankName: row.recipetBankName,
          otherBankName: row.recipetBankName,
          kefuChat: row.serviceWechatNum,
          kefuQQ: row.serviceQq,
          kefuPhone: row.servicePhone,
          siterName: row.masterName,
          siterPhone: row.masterPhone,
          siterQQ: row.masterQq,
          stationAddress: row.domainName,
          adminPassword: row.adminPassword,
          yuantongPrice: row.price,
          adminAccount: row.adminUserName
        }
        this.stationSetObj.show = true
      } else if (command[1] === 2) { // 添加分站
        this.stationSetObj.type = 1
        for (let m in this.stationSetObj) {
          if (!(m === 'type' || m === 'show')) {
            this.stationSetObj[m] = ''
          }
        }
        this.stationSetObj.show = true
      } else if (command[1] === 3) { // 扣除金额
        this.deleMoneyObj.row = command[0]
        this.deleMoneyObj.show = true
      } else if (command[1] === 4) { // 重置密码
        this.resetPassObj.row = command[0]
        this.resetPassObj.show = true
      }
    },
    // 确认重置密码
    sureToReset () {
      this.$ajax.post('/api/substation/resetPwd', {
        channenlAccountId: this.userInfo.channelAccountId,
        substationAccountId: this.resetPassObj.row.adminAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getList()
          this.resetPassObj.show = false
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
    setList (data) {
      this.tableData = data
    },
    // 确定添加按钮
    sureToPost () {
      let url = ''
      if (this.stationSetObj.type === 0) { // 编辑分站
        url = '/api/substation/updateSubstationInfo'
      } else if (this.stationSetObj.type === 1) { // 添加分站
        url = '/api/substation/addSubstation'
      }
      this.$ajax.post(url, {
        substationId: this.stationSetObj.stationId,
        substationName: this.stationSetObj.stationName,
        recipetContent: (this.stationSetObj.getBankName === '999' ? this.stationSetObj.otherBankName : this.stationSetObj.getBankName) + '-' + this.stationSetObj.payer + '-' + this.stationSetObj.getAccount,
        serviceQQ: this.stationSetObj.kefuQQ,
        serviceWechatNum: this.stationSetObj.kefuChat,
        serviceTelephone: this.stationSetObj.kefuPhone,
        masterName: this.stationSetObj.siterName,
        masterTelephone: this.stationSetObj.siterPhone,
        masterQQ: this.stationSetObj.siterQQ,
        domainName: this.stationSetObj.stationAddress,
        adminUserName: this.stationSetObj.adminAccount,
        adminPassword: this.stationSetObj.adminPassword ? md5(this.stationSetObj.adminPassword) : '',
        price: this.stationSetObj.yuantongPrice,
        channelId: this.userInfo.channelId,
        channelAccountId: this.userInfo.channelAccountId,
        recipetName: this.stationSetObj.payer,
        recipetAccount: this.stationSetObj.getAccount,
        recipetBankName: (this.stationSetObj.getBankName === '999' ? this.stationSetObj.otherBankName : this.stationSetObj.getBankName)
      }).then((data) => {
        if (data.data.code === '200') {
          this.stationSetObj.show = false
          this.getList()
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          for (let m in this.stationSetObj) {
            if (!(m === 'type' || m === 'show')) {
              this.stationSetObj[m] = ''
            }
          }
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$message.error('服务器错误！')
      })
    }
  },
  mounted () {
    this.getBank()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.stationManger
  margin 20px
  padding 20px
  background #ffffff
  font-size 14px
  ::-webkit-scrollbar
    display block
    width 100%
    height 8px
  ::-webkit-scrollbar-thumb
    background #eeeeee
    border-radius 5px
  h2
    font-size 14px
    color #333333
    line-height 1
    padding-bottom 10px
    margin-bottom 20px
    border-bottom 1px solid RGBA(204, 204, 204, 0.5)
    font-weight bold
  .search
    padding-bottom 20px
    display flex
    .left
      flex 1
      span
        margin-right 10px
      .btn
        margin-left 20px
    .right
      flex 1
      text-align right
</style>
