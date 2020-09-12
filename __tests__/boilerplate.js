import "@/store/store"
import Vuex from "vuex"
import { cloneDeep } from "lodash"
import cartModule from "@/store/modules/cart"
import productsModule from "@/store/modules/products"

export const products = productsModule
export const cart = cartModule

export const store = () => ({
	modules: { products: cloneDeep(productsModule), cart: cloneDeep(cartModule) }
})

// Store Factory
export const createStore = (initialState = {}, module = "products") => {
	let localStore = store()
	localStore.modules[module].state = {
		...localStore.modules.products.state,
		...initialState
	}
	return new Vuex.Store(localStore)
}

it("BOILERPLATE - MOCK VUEX STORE @ __tests__/boilerplate.js", () => {})
