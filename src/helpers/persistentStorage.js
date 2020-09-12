/* NOTE: localStorage has no expiry (technically) 
         but we are setting expiry at (../store.config.js) 
                 for faster cart rendering also authenticating data
   ALTERNATIVE SOLN: Adding 
    TODO: use in-memory db (redis) in future -- performance feature
*/
import _ from "lodash"
import moment from "moment"
import logger from "./logger"

export const config = { EXPIRY: { LOCALSTORAGE: 5 } } // in minutes

export const PersitentStorage = {
	rehydrate: (key = "cart") => getItemsJSON(key),
	persist: (value, key = "cart", expiry = config.EXPIRY.LOCALSTORAGE) =>
		setJSONItems(key, value, expiry)
}

export const isPersistedDataRetrivable = () =>
	!persistentStorageDisabled() &&
	!isPersistedDataEmpty() &&
	!isPersistedDataExpired()

export const persistentStorageDisabled = () => {
	try {
		window.localStorage.setItem("localStorageEnabled", "true")
		const result =
			window.localStorage.getItem("localStorageEnabled") === "true"
				? false
				: true
		window.localStorage.removeItem("localStorageEnabled")
		return result
	} catch (err) {
		return true
	}
}
export const isPersistedDataEmpty = () =>
	_.isEmpty(PersitentStorage.rehydrate())

export const isPersistedDataExpired = () =>
	moment(
		_.get(JSON.parse(localStorage.getItem("cart")), "expiry")
	).isSameOrBefore(moment().unix())

const getItemsJSON = key => {
	logger.info(
		`-- Retrived ${_.upperFirst(key)} Items from Persitent Storage --`
	)
	return _.get(JSON.parse(localStorage.getItem(key)), "value", null)
}

const setJSONItems = (key, value, expiry) => {
	try {
		localStorage.setItem(
			key,
			JSON.stringify({
				value,
				expiry: expiry
					? moment()
							.add(expiry, "minute")
							.unix()
					: null
			})
		)

		logger.info(
			`-- Snapshot ${_.upperFirst(key)} to Persitent Storage --`,
			!persistentStorageDisabled() ? "[SUCCESS]" : "[DISABLED]"
		)
	} catch (err) {
		logger.captureException(err)
	}
}
