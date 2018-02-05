<template>
  <div class="stationRechargeList">
    <h2>分站充值记录</h2>
    <div class="search">
      <div class="left">
        <span>付款方式</span>
        <el-select v-model="payType" style="width:180px;margin-right:20px;" placeholder="请选择">
          <el-option label="全部" value="">
          </el-option>
          <el-option label="支付宝转账" value="1">
          </el-option>
          <el-option label="网银转账" value="2">
          </el-option>
        </el-select>
        <span>充值状态</span>
        <el-select v-model="rechargeStatus" style="width:180px;margin-right:20px;" placeholder="请选择">
          <el-option label="全部" value="">
          </el-option>
          <el-option label="成功" value="1">
          </el-option>
          <el-option label="失败" value="0">
          </el-option>
        </el-select>
        <span>分站ID</span>
        <el-input v-model="substationId" style="width:180px;" placeholder="请输入"></el-input>
        <em class="btn" @click="getList">查询</em>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed="left" prop="userName" label="站点ID" align="center" width="100">
        </el-table-column>
        <el-table-column prop="userName" label="站点名称" align="center" width="200">
        </el-table-column>
        <el-table-column prop="userName" label="充值编号" align="center" width="200">
        </el-table-column>
        <el-table-column prop="userName" label="交易号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="付款方式" align="center" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="充值金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="充值前金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="充值后金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="充值状态" align="center" width="120">
          <template slot-scope="scope">
            <span class="template">充值成功</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">确认到账</el-button>
            <el-button type="text" size="small">取消订单</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="充值时间" align="center" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="备注" align="center" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
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
