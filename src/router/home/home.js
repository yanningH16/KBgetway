import manger from '../manger/manger'
import rechargeList from '../rechargeList/rechargeList'
import money from '../money/money'
const Home = (resolve) => {
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}
const defaultHome = [{
  path: '/home',
  redirect: {
    name: 'leftMoney'
  }
}]
const home = [{
  path: '/',
  component: Home,
  name: 'home',
  children: [...defaultHome, ...manger, ...rechargeList, ...money]
}]
export default home
