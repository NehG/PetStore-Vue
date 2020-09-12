// Lazy Import -- Performance
const Cart = () => import("./cart/Cart.vue")
const Header = () => import("./shared/Header.vue")
const Products = () => import("./products/Products.vue")
const NewProduct = () => import("./products/NewProduct.vue")

export { Header, Products as ListOfProducts, NewProduct, Cart }
