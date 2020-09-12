// Lazy Import -- Performance
// TODO vue@3.x -> use all lazy import -> it auto caches imports
const Cart = () => import("./cart/Cart.vue")
const Header = () => import("./shared/Header.vue")
const Products = () => import("./products/Products.vue")
const NewProduct = () => import("./products/NewProduct.vue")

export { Header, Products as ListOfProducts, NewProduct, Cart }
