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
        <el-table-column fixed="left" prop="substationId" label="站点ID" align="center" width="190">
        </el-table-column>
        <el-table-column prop="substationName" label="站点名称" align="center" width="200">
        </el-table-column>
        <el-table-column prop="rechargeId" label="充值编号" align="center" width="200">
        </el-table-column>
        <!-- <el-table-column prop="userName" label="交易号" align="center" width="120">
        </el-table-column> -->
        <el-table-column prop="payTypeDetail" label="付款方式" align="center" width="120">
        </el-table-column>
        <el-table-column prop="money" label="充值金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="beforMoney" label="充值前金额" align="center" width="120">
          <template slot-scope="scope">
            <span class="template">{{scope.row.beforMoney||'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="afterMoney" label="充值后金额" align="center" width="120">
          <template slot-scope="scope">
            <span class="template">{{scope.row.afterMoney||'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stautsDetail" label="充值状态" align="center" width="120">
          <!-- <template slot-scope="scope">
            <span class="template">充值成功</span>
          </template> -->
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.stautsDetail==='等待付款'||scope.row.stautsDetail==='等待收款'||scope.row.stautsDetail==='等待收货'">款已到账</el-button>
            <el-button type="text" size="small" @click="handleClickCecal(scope.row)" v-if="scope.row.stautsDetail==='等待付款'||scope.row.stautsDetail==='等待收款'||scope.row.stautsDetail==='等待收货'">驳回订单</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="充值时间" align="center" width="160">
        </el-table-column>
        <el-table-column prop="comment" label="备注" align="center" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
    <!-- 当点击款已到账的弹框 -->
    <el-dialog title="用户充值确认" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- <p>
        <span>到账日期</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
      </p>
      <p class="markets">
        <span>备注</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </p> -->
      <span>确认已到账?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="surePay">确 定</el-button>
      </span>
    </el-dialog>
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
      tableData: [],
      dialogVisible: false
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
        pageSize: this.pageSize,
        rechargeId: ''
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
    handleClick (val) {
      console.log(val)
      this.dialogVisible = true
      this.rechargeId = val.rechargeId
    },
    surePay () {
      this.$ajax.post('/api/substation/recharge/passRechargeSheet', {
        rechargeId: this.rechargeId,
        operateUserId: this.userInfo.channelAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '通过成功'
          })
          this.getList()
          this.dialogVisible = false
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClickCecal (data) {
      console.log(data)
      let rechargeId = data.rechargeId
      this.$confirm('你确认取消订单么? 请谨慎操作', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((data) => {
        this.$ajax.post('/api/substation/recharge/cancelRechargeSheet', {
          rechargeId: rechargeId
          // operateUserId: this.userInfo.substationAccountId
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              type: 'success',
              message: '已驳回'
            })
            this.getList()
          } else {
            this.$message({
              type: 'warning',
              message: data.data.message
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
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
