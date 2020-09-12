import Vue from "vue"
import Vuex from "vuex"
import LogRocket from "logrocket"
import cart from "./modules/cart"
import creatPlugin from "logrocket-vuex"
import products from "./modules/products"

Vue.use(Vuex)

const logrocketPlugin = creatPlugin(LogRocket)

export default new Vuex.Store({
	modules: {
		products,
		cart
	},
	plugins: [logrocketPlugin]
})
