import Vue from "vue"
import Router from "vue-router"
import { ListOfProducts, Cart, NewProduct } from "@/components"

Vue.use(Router)

export const routes = [
	{
		path: "/",
		name: "Index",
		component: ListOfProducts,
		meta: {
			title: "Products"
		}
	},
	{
		path: "/cart",
		name: "Cart",
		component: Cart,
		meta: {
			title: "Cart"
		}
	},
	{
		path: "/products/new",
		name: "NewProductForm",
		component: NewProduct,
		meta: {
			title: "New Product"
		}
	},
	// otherwise redirect to index or [error page --future TODO]
	{ path: "*", redirect: "/" }
]

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})
