import Vuetify from "vuetify"
import router from "@/router"
import { createStore } from "../boilerplate"
import { createLocalVue, mount } from "@vue/test-utils"

import Products from "@/components/products/Products.vue"
import ProductCard from "@/components/products/ProductCard.vue"

import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)

// Wrapper factory
const createWrapper = (store, options = {}, component = Products) => {
	let vuetify = new Vuetify()
	return mount(component, {
		store,
		router,
		localVue,
		vuetify,
		...options
	})
}

// removes vuetify warnings
document.body.setAttribute("data-app", true)
describe("Products.vue", () => {
	let store, wrapper

	beforeEach(() => {
		store = createStore()
		wrapper = createWrapper(store)
	})

	it("renders", () => {
		expect(wrapper.exists()).toBe(true)
	})

	it("check if child ProductCard exists", () => {
		expect(wrapper.findComponent(ProductCard)).toBeTruthy()
	})

	describe("Loading-Skeleton on `products/isLoading`", () => {
		it(":true should show loading-skeleton", () => {
			wrapper = createWrapper(
				createStore({
					isLoading: true
				})
			)

			expect(
				wrapper.find(".v-skeleton-loader--is-loading").exists()
			).toBeTruthy()
		})

		it(":false should not show loading-skeleton", () => {
			wrapper = createWrapper(
				createStore({
					isLoading: false
				})
			)

			expect(
				wrapper.find(".v-skeleton-loader--is-loading").exists()
			).toBeFalsy()
		})
	})

	describe("Alert-Box on `products/isProductsListEmpty`", () => {
		it(":true should show alert-box", () => {
			expect(wrapper.find(".v-alert").exists()).toBeTruthy()
		})

		it(":false should not show alert-box", () => {
			wrapper = createWrapper(
				createStore({
					list: [{ id: "1", name: "N", price: "10" }]
				})
			)

			expect(wrapper.find(".v-alert").exists()).toBeFalsy()
		})
	})

	describe("ProductCard on `products/products`", () => {
		describe("if length > 0", () => {
			it("should show", () => {
				wrapper = createWrapper(
					createStore({
						list: [{ id: "1", name: "d", price: 2 }]
					})
				)

				expect(wrapper.find("[data-test='item-card']").exists()).toBeTruthy()
			})

			it("should shows corrent number of items", () => {
				wrapper = createWrapper(
					createStore({
						list: [
							{ id: "1", name: "d", price: 2 },
							{ id: "2", name: "dds", price: 2 }
						]
					})
				)

				expect(wrapper.findAll("[data-test='item-card']")).toHaveLength(2)
			})
		})

		it("should not show none if false", () => {
			wrapper = createWrapper(
				createStore({
					list: []
				})
			)

			expect(wrapper.find(".v-card").exists()).toBeFalsy()
		})
	})
})

// wrapper.vm.$store.commit("products/setLoading", true)
// store.state.products.
