const localRechargeList = () =>
  import(/* webpackChunkName: "localRechargeList" */ '@/components/rechargeList/localRechargeList')
const stationRechargeList = () =>
  import(/* webpackChunkName: "stationRechargeList" */ '@/components/rechargeList/stationRechargeList')
const rechargeList = [{
  path: 'rechargeList/localRechargeList',
  component: localRechargeList,
  name: 'localRechargeList',
  meta: { title: '本站充值记录' }
}, {
  path: 'rechargeList/stationRechargeList',
  component: stationRechargeList,
  name: 'stationRechargeList',
  meta: { title: '分站充值记录' }
}]

export default rechargeList
