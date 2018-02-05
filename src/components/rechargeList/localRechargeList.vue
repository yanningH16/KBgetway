<template>
  <div class="localRechargeList">
    <h2>本站充值记录</h2>
    <div class="search">
      <div class="left">
        <span>付款方式</span>
        <el-select v-model="payWay" style="width:180px;" placeholder="请选择">
          <el-option label="全部" value="">
          </el-option>
          <el-option label="网银转账" value="1">
          </el-option>
        </el-select>
        <em class="btn" @click="getList">查询</em>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="address" label="充值编号" align="center">
        </el-table-column>
        <el-table-column prop="address" label="交易号" align="center">
        </el-table-column>
        <el-table-column prop="address" label="付款方式" align="center">
        </el-table-column>
        <el-table-column prop="address" label="充值金额" align="center">
        </el-table-column>
        <el-table-column prop="address" label="充值前金额" align="center">
        </el-table-column>
        <el-table-column prop="address" label="充值后金额" align="center">
        </el-table-column>
        <el-table-column prop="address" label="充值状态" align="center">
          <template slot-scope="scope">
            <span class="template">充值成功</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="充值时间" align="center">
        </el-table-column>
        <el-table-column prop="address" label="备注" align="center">
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
  name: 'localRechargeList',
  mixins: [pageCommon],
  data () {
    return {
      currentPage: 1,
      apiUrl: '/api/channel/recharge/getRechargeListByChannel',
      payWay: '',
      tableData: []
    }
  },
  computed: {
    params () {
      return {
        channelId: this.userInfo.channelId,
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
.localRechargeList
  margin 20px
  padding 20px
  background #ffffff
  font-size 14px
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
