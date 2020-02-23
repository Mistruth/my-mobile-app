import routes from './routes'

const pagesPath = require.context('../pages/', true, /.index\.tsx$/).keys()
const pages = pagesPath.map((item:{match:any}) => {
  return (item.match(/\w+/))[0].toLocaleLowerCase()
})

const routeMap = pages.map(item => {
  return {
    path: routes[item] || ('/' + item),
    exact: true,
    component: require('../pages/' + item).default
  }
})

export default routeMap
