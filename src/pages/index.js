import ProductDetail from './ProductDetail'
import Aigc from './aigc'
import HomePage from './Home/HomePage'

const routes = [
  { path: '/', component: <HomePage /> },
  { path: '/product-detail/:address', component: <ProductDetail /> },
  { path: '/suicasso', component: <Aigc /> }
]

export default routes;