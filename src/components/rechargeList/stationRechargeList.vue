<template>
  <div class="stationRechargeList">
    <h2>分站充值记录</h2>
    <div class="search">
      <div class="left">
        <span>付款方式</span>
        <el-select v-model="payType" style="width:180px;margin-right:20px;" placeholder="请选择">
          <el-option label="全部" value="">
          </el-option>
          <el-option label="网银转账" value="1">
          </el-option>
        </el-select>
        <span>充值状态</span>
        <el-select v-model="rechargeStatus" style="width:180px;margin-right:20px;" placeholder="请选择">
          <el-option label="全部" value="">
          </el-option>
          <el-option label="等待付款" value="1">
          </el-option>
          <el-option label="等待收货" value="2">
          </el-option>
          <el-option label="等待收款" value="3">
          </el-option>
          <el-option label="充值失败" value="4">
          </el-option>
          <el-option label="订单取消" value="5">
          </el-option>
          <el-option label="充值完成" value="6">
          </el-option>
        </el-select>
        <span>分站ID</span>
        <el-input v-model="substationId" style="width:180px;" placeholder="请输入"></el-input>
        <em class="btn" @click="getList">查询</em>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed="left" prop="substationId" label="站点ID" align="center" width="185">
        </el-table-column>
        <el-table-column prop="substationName" label="站点名称" align="center" width="120">
        </el-table-column>
        <el-table-column prop="rechargeId" label="充值编号" align="center" width="185">
        </el-table-column>
        <el-table-column prop="rechargeId" label="交易号" align="center" width="120">
          <template slot-scope="scope">
            <span class="template">{{ scope.row.aaa ? scope.row.aaa : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payTypeDetail" label="付款方式" align="center" width="120">
        </el-table-column>
        <el-table-column prop="money" label="充值金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="beforMoney" label="充值前金额" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.beforMoney ? scope.row.beforMoney : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="afterMoney" label="充值后金额" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.afterMoney ? scope.row.afterMoney : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stautsDetail" label="充值状态" align="center" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==1 || scope.row.status==2 || scope.row.status==3" @click="checkRecharge(1, scope.row)" type="text" size="small">确认到账</el-button>
            <el-button v-if="scope.row.status==1 || scope.row.status==2 || scope.row.status==3 || scope.row.status==4" @click="checkRecharge(0, scope.row)" type="text" size="small">取消订单</el-button>
            <span v-if="scope.row.status==5 || scope.row.status==6">--</span>
          </template>
        </el-table-column>
        <el-table-column prop="passTime" label="充值时间" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.passTime ? scope.row.passTime : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="备注" align="center" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
    <div class="alertGroup">
      <el-dialog title="充值审核" :append-to-body="true" :visible.sync="checkRechargeObj.show" width="600px" top="25vh">
        <div v-if="checkRechargeObj.type==1" class="cont" style="text-align:center;">
          <span>确认通过充值审核?</span>
        </div>
        <div v-if="checkRechargeObj.type==0" class="cont" style="text-align:center;">
          <span>确认驳回充值审核?</span>
        </div>
        <div class="buttons" style="text-align:center;margin-top:40px;">
          <span class="btn-b" style="margin-right:10px;" @click="checkRechargeObj.show = false">取消</span>
          <span class="btn" @click="sureToCheck">确定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'stationRechargeList',
  mixins: [pageCommon],
  data () {
    return {
      currentPage: 1,
      apiUrl: '/api/substation/recharge/getRechargeListForChannelId',
      checkRechargeObj: {
        show: false,
        type: ''
      },
      rechargeStatus: '',
      substationId: '',
      payType: '',
      tableData: []
    }
  },
  computed: {
    params () {
      return {
        payType: this.payType,
        rechargeStatus: this.rechargeStatus,
        channelId: this.userInfo.channelId,
        substationId: this.substationId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    setList (data) {
      this.tableData = data
    },
    // 审核充值
    checkRecharge (type, row) {
      this.checkRechargeObj.type = type
      this.checkRechargeObj.row = row
      this.checkRechargeObj.show = true
    },
    // 确认操作按钮
    sureToCheck () {
      let url = ''
      let data = ''
      if (parseInt(this.checkRechargeObj.type) === 0) { // 驳回
        url = '/api/substation/recharge/cancelRechargeSheet'
        data = {
          rechargeId: this.checkRechargeObj.row.rechargeId
        }
      } else if (parseInt(this.checkRechargeObj.type) === 1) { // 通过
        url = '/api/substation/recharge/passRechargeSheet'
        data = {
          rechargeId: this.checkRechargeObj.row.rechargeId,
          operateUserId: this.userInfo.channelAccountId
        }
      }
      this.$ajax.post(url, data).then((data) => {
        if (data.data.code === '200') {
          this.checkRechargeObj.show = false
          this.getList()
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('服务器错误！')
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.stationRechargeList
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
  .template
    font-size 12px
  .search
    padding-bottom 20px
    border-bottom 1px solid #e5e5e5
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
  .table
    margin-top 20px
</style>
