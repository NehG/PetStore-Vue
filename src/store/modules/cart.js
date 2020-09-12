import _ from "lodash"
import moment from "moment"
import API from "@/store/api"
import logger from "@/helpers/logger"
import {
	PersitentStorage,
	isPersistedDataRetrivable,
	persistentStorageDisabled
} from "../../helpers/persistentStorage"

// API URL(baseURL + <URL>)
const URL = "/cart"

export default {
	namespaced: true,
	state: {
		list: [],
		isLoading: false,
		lastFetch: null
	},
	getters: {
		itemsInCart: state => state.list,
		isLoading: state => state.isLoading,
		lastFetch: state => state.lastFetch,
		noOfItemsInCart: (state, getters) =>
			_.get(getters, "itemsInCart", []).length,
		isCartEmpty: (state, getters) =>
			_.get(getters, "itemsInCart", []).length === 0
	},
	mutations: {
		setLoading: (state, bool) => {
			state.isLoading = bool
		},
		setCart: (state, payload) => {
			state.list = payload // list === products (list)
		},
		updateLastFetchToNow: (state, overrideTimetamp = null) => {
			state.lastFetch = overrideTimetamp || moment().unix()
		},
		addItemToCart: (state, payload) => {
			// state.cart[payload.cId] = _.omit(payload, "cId")
			// state.list = payload
			state.list.push(payload)
		},
		removeItemFromCart: (state, cId) => {
			// delete state.list[cId]
			// state.list = payload
			state.list = _.filter(state.list, function(item) {
				return item.cId !== cId
			})
		},
		rehydrate(state, lastFetch) {
			const rehydratedCart = PersitentStorage.rehydrate()

			if (rehydratedCart === null) return

			state.list = rehydratedCart
			state.lastFetch = lastFetch
		}
	},
	actions: {
		snapshotCartItemsToPersistentStorage: ({ getters }) =>
			!persistentStorageDisabled()
				? PersitentStorage.persist(getters.itemsInCart)
				: null,

		snapOrRetriveCart: ({ dispatch, commit, getters }) => {
			if (isPersistedDataRetrivable()) {
				const lastFetch = moment().unix()

				commit("rehydrate", lastFetch)

				// check if lastfetch is updated else there is a "PROBLEM" with "PersistentStorage"
				if (getters.lastFetch === lastFetch) return
				else
					logger.error(
						"[!IMPORTANT] -- Retrived Cart Items from Persitent Storage [FAILED] --",
						localStorage.getItem("cart"),
						lastFetch
					)
			}

			commit("setLoading", true)

			return API.GET(URL)
				.then(payload => {
					commit("setCart", payload)
					commit("updateLastFetchToNow")
					if (getters.noOfItemsInCart > 0)
						dispatch("snapshotCartItemsToPersistentStorage")
				})
				.finally(() => {
					commit("setLoading", false)
				})
		},

		addItemToCart: ({ dispatch, commit }, id) =>
			API.POST(URL, { id }).then(payload => {
				commit("addItemToCart", payload)
				commit("updateLastFetchToNow")
				dispatch("snapshotCartItemsToPersistentStorage")
			}),

		removeCartItemById: ({ commit, dispatch }, cId) =>
			API.DELETE(URL, cId).then(() => {
				commit("removeItemFromCart", cId)
				commit("updateLastFetchToNow")
				dispatch("snapshotCartItemsToPersistentStorage")
			})
	}
}
