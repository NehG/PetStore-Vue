import Vuex from "vuex"
import axios from "axios"
import { omit, cloneDeep } from "lodash"
import logger from "@/helpers/logger"
import MockAdaptor from "axios-mock-adapter"
import { createLocalVue } from "@vue/test-utils"
import { createStore, products as mockProducts } from "../boilerplate"

describe("PRODUCTS", () => {
	// declare axios and store variables for tests
	let store, localVue, products

	localVue = createLocalVue()
	localVue.use(Vuex)

	// before each and every test, instantiate mockAxios and store from scratch
	beforeEach(() => {
		store = createStore()
		products = cloneDeep(mockProducts)
	})

	// testing products/getters in isolation
	describe("PRODUCTS/GETTERS", () => {
		it("'listOfProducts' should return state/products: list", () => {
			// Arrange
			const state = { list: [{ id: 1, name: "Test 1" }], isLoading: false }

			// Act
			const listOfProducts = products.getters.products(state)

			// Assert
			expect(listOfProducts).toEqual(state.list)
		})

		it("'isLoading' should return state/isLoading: bool", () => {
			// Arrange
			const state = { isLoading: true }

			// Act
			const isLoading = products.getters.isLoading(state)

			// Assert
			expect(isLoading).toBe(true)
		})

		it("'lastFetch' should return state/lastFetch: String | Number | null (if action/fetchProducts is not dispatched)", () => {
			const currentTimeStamp = Date.now()
			const state = { lastFetch: currentTimeStamp }

			const lastFetch = products.getters.lastFetch(state)

			expect(lastFetch).toEqual(currentTimeStamp)
		})

		it("'isProductsListEmpty' should returns true/false based on 'state/list'.length", () => {
			const state = { list: [{ id: 1 }, { id: 2 }] }

			const isProductsListEmpty = products.getters.isProductsListEmpty(state)

			expect(isProductsListEmpty).toBeFalsy()
		})
	})

	// testing products/mutations in isolation
	describe("PRODUCTS/MUTATUIONS", () => {
		it("'setLoading' takes bool [parameter] and should update 'state/isLoading'", () => {
			const state = { isLoading: false }

			products.mutations.setLoading(state, true)

			expect(products.getters.isLoading(state)).toBeTruthy()
		})

		it("'setProducts' takes payload [parameter] and sets to 'state.list'", () => {
			const state = { list: [] }

			products.mutations.setProducts(state, [{ id: 1 }])

			expect(products.getters.products(state)).toEqual([{ id: 1 }])
		})

		it("'updateLastFetchToNow' sets 'state/lastFetch' to current timestamp", () => {
			const state = { lastFetch: null }

			products.mutations.updateLastFetchToNow(state)

			expect(products.getters.lastFetch(state)).not.toBeNull()
		})

		it("'addProduct' takes payload [parameter] and sets to 'state/list'", () => {
			const state = { list: [] }

			products.mutations.addProduct(state, { id: 1 })

			expect(products.getters.products(state)).toEqual([{ id: 1 }])
		})

		it("'removeProduct' takes payload [parameter] and sets to 'state/list'", () => {
			const state = { list: [{ id: 1 }, { id: 2 }] }

			products.mutations.removeProduct(state, 1)

			expect(products.getters.products(state)).toEqual([{ id: 2 }])
		})
	})

	// testing products/actions in isolation
	describe("PRODUCT/ACTIONS", () => {
		let mockAxios

		beforeEach(() => {
			mockAxios = new MockAdaptor(axios)
		})

		// ACTION: products/fetchProducts
		describe("ACTION: fetchProducts", () => {
			it("it should `commit` 'setLoading'", async () => {
				// Arrange
				store.commit = jest.fn()
				mockAxios.onGet("/products").reply(200)

				// Act
				await store.dispatch("products/fetchProducts")

				// Asserts
				expect(store.commit).toHaveBeenNthCalledWith(
					1,
					"products/setLoading",
					true,
					undefined
				)
				expect(store.commit).toHaveBeenNthCalledWith(
					4,
					"products/setLoading",
					false,
					undefined
				)
			})

			// [actions/fetchProducts] -> because of conflicting name in vs-code
			it("it should `commit` 'updateLastFetchToNow' [actions/fetchProducts]", async () => {
				store.commit = jest.fn()
				mockAxios.onGet("/products").reply(200)

				await store.dispatch("products/fetchProducts")

				expect(store.commit).toHaveBeenCalledWith(
					"products/updateLastFetchToNow",
					undefined,
					undefined
				)
			})

			it("it should `commit` 'setProducts'", async () => {
				store.commit = jest.fn()
				mockAxios.onGet("/products").reply(200)

				await store.dispatch("products/fetchProducts")

				expect(store.commit).toBeCalledWith(
					"products/setProducts",
					undefined,
					undefined
				)
			})

			it("it should commit exact data to `state.list` i.e. `products/products` getter [actions/fetchProducts]", async () => {
				mockAxios.onGet("/products").reply(200, [{ id: 1 }])

				await store.dispatch("products/fetchProducts")

				expect(store.getters["products/products"]).toEqual([{ id: 1 }])
			})
		})

		// ACTION: products/addNewProduct
		describe("ACTION: addNewProduct", () => {
			const payload = {
				id: 1,
				name: "addNewProduct -- nTags -- Test",
				price: 1,
				image: ""
			}

			it("it should `commit` 'updateLastFetchToNow' [actions/addNewProduct]", async () => {
				store.commit = jest.fn()
				mockAxios.onPost("/products").reply(200, payload)

				await store.dispatch("products/addNewProduct", payload)

				expect(store.commit).toHaveBeenCalledWith(
					"products/updateLastFetchToNow",
					undefined,
					undefined
				)
			})

			it("it should `commit` 'addProduct'", async () => {
				store.commit = jest.fn()
				mockAxios.onPost("/products").reply(200, payload)

				await store.dispatch("products/addNewProduct", payload)

				expect(store.commit).toBeCalledWith(
					"products/addProduct",
					payload,
					undefined
				)
			})

			it("it should commit exact data to `state.list` i.e. `products/products` getter [actions/addNewProduct]", async () => {
				mockAxios.onPost("/products").reply(200, payload)

				await store.dispatch("products/addNewProduct", omit(payload, "id"))

				// Note: API sends back response with new inserted item, so we just set state to response
				expect(store.getters["products/products"]).toContainEqual(payload)
			})
		})

		// ACTION: products/removeProductById
		describe("ACTION: removeProductById", () => {
			it("it should `commit` 'updateLastFetchToNow' [actions/removeProductById]", async () => {
				store.commit = jest.fn()
				mockAxios.onDelete("/products/1").reply(200)

				await store.dispatch("products/removeProductById", 1)

				expect(store.commit).toHaveBeenCalledWith(
					"products/updateLastFetchToNow",
					undefined,
					undefined
				)
			})

			it("it should `commit` 'removeProduct'", async () => {
				store.commit = jest.fn()
				mockAxios.onDelete("/products/1").reply(200)

				await store.dispatch("products/removeProductById", 1)

				expect(store.commit).toBeCalledWith(
					"products/removeProduct",
					1,
					undefined
				)
			})

			it("it should commit exact data to `state.list` i.e. `products/products` getter [actions/removeProductById]", async () => {
				store = createStore({ list: [{ id: 1 }, { id: 2 }] })

				await store.dispatch("products/removeProductById", 1)

				expect(store.getters["products/products"]).toEqual([{ id: 2 }])
			})
		})

		describe("ACTIONS: API ERROR", () => {
			it("[METHOD: GET] should call `LogRocket()`'s `captureException()` and send error", async () => {
				const spy = jest.spyOn(logger, "captureException")
				mockAxios.onGet("/products").reply(500)

				await store.dispatch("products/fetchProducts")

				expect(spy).toBeCalled()
			})

			it("[METHOD: DELETE] should call `LogRocket()`'s `captureException()` and send error", async () => {
				const spy = jest.spyOn(logger, "captureException")
				mockAxios.onDelete("/products/1").reply(500)

				await store.dispatch("products/removeProductById", 1)

				expect(spy).toBeCalled()
			})

			it("[METHOD: POST] should call `LogRocket()`'s `captureException()` and send error", async () => {
				const spy = jest.spyOn(logger, "captureException")
				mockAxios.onPost("/products").reply(500)

				await store.dispatch("products/addNewProduct", {})

				expect(spy).toBeCalled()
			})
		})
	})
})
