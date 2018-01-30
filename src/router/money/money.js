const leftMoney = () =>
  import(/* webpackChunkName: "leftMoney" */ '@/components/money/leftMoney')
const money = [{
  path: 'money/leftMoney',
  component: leftMoney,
  name: 'leftMoney',
  meta: { title: '账户余额' }
}]

export default money
