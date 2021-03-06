import _ from "lodash"
import moment from "moment"
import API from "@/store/api"

// API URL(baseURL + <URL>)
const URL = "/products"

export default {
	namespaced: true,
	state: {
		list: [],
		isLoading: false,
		lastFetch: null
	},
	getters: {
		products: state => state.list,
		isLoading: state => state.isLoading,
		lastFetch: state => state.lastFetch,
		isProductsListEmpty: state => _.get(state, "list", []).length === 0
	},
	mutations: {
		setLoading: (state, bool) => {
			state.isLoading = bool
		},
		setProducts: (state, payload) => {
			state.list = payload // list === products (list)
		},
		updateLastFetchToNow: state => {
			state.lastFetch = moment().unix()
		},
		addProduct: (state, payload) => {
			// state.list[payload.id] = _.omit(payload, "id")
			// state.list = payload // api is config to return updated payload
			state.list.push(payload)
		},
		removeProduct: (state, id) => {
			// delete state.list[id]
			// state.list = payload // api is config to return updated payload so no point 'delete state.list[id]'
			state.list = _.filter(state.list, function(item) {
				return item.id !== id
			})
		}
	},
	actions: {
		fetchProducts({ commit }) {
			commit("setLoading", true)
			return API.GET(URL)
				.then(payload => {
					commit("setProducts", payload)
					commit("updateLastFetchToNow")
				})
				.finally(() => {
					commit("setLoading", false)
				})
		},
		addNewProduct: (context, { name, price, image }) =>
			API.POST(URL, { name, image, price }).then(payload => {
				context.commit("addProduct", payload)
				context.commit("updateLastFetchToNow")
			}),
		removeProductById: (context, id) =>
			API.DELETE(URL, id).then(() => {
				context.commit("removeProduct", id)
				context.commit("updateLastFetchToNow")
			})
	}
}
