import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"

import ProductCard from "@/components/products/ProductCard.vue"

import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(VueRouter)

// removes vuetify warnings
document.body.setAttribute("data-app", true)
describe("ProductCard.vue", () => {
	let wrapper

	beforeEach(() => {
		wrapper = mount(ProductCard, {
			propsData: {
				id: "34903cdb-1172-476a-80d6-12080ddf7824",
				name: "Test",
				price: 10
			}
		})
	})

	it("renders", () => {
		expect(wrapper.exists()).toBe(true)
	})

	it("check if child ProductCard exists", () => {
		expect(wrapper.findComponent(ProductCard)).toBeTruthy()
	})

	describe("Child to Parent Emitting:", () => {
		it("emit `addProductToCartById` event when `Add to Cart` btn is clicked", () => {
			wrapper.find("[data-test='addToCartBtn']").trigger("click")

			expect(wrapper.emitted().addProductToCartById[0]).toEqual([
				"34903cdb-1172-476a-80d6-12080ddf7824"
			])
		})
		it("emit `deleteProductById` event when `Remove Btn` is clicked", () => {
			wrapper.find("[data-test='deleteFromProductsBtn']").trigger("click")

			expect(wrapper.emitted().removeProductById[0]).toEqual([
				"34903cdb-1172-476a-80d6-12080ddf7824"
			])
		})
	})
})
