const stationManger = () =>
  import(/* webpackChunkName: "stationManger" */ '@/components/manger/stationManger')
const manger = [{
  path: 'manger/stationManger',
  component: stationManger,
  name: 'stationManger',
  meta: { title: '分站管理' }
}]

export default manger
