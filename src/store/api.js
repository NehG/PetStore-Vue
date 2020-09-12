import axios from "axios"
// import store from "./store"
import logger from "@/helpers/logger"

// BASE_URL = "https://petstore-api.vercel.app/api/",

// axios common config
// const $axiosConfig = {
// 	baseURL: "https://s0872.sse.codesandbox.io/api/",
// 	timeout: 10000 //CodeSandBox (Backend API) timeout's
// }

const $axiosConfig = {
	baseURL: "https://r9zmffb9h7.execute-api.ca-central-1.amazonaws.com/prod/", // AWS Serverless REST API using NodeJS
	timeout: 3000
}

export default {
	async POST(url, data) {
		try {
			const response = await axios.request({
				method: "POST",
				...$axiosConfig,
				url,
				data
			})
			return response.data
		} catch (error) {
			logger.captureException(error)
			// alert("Something! went side-ways :( ! Report sent to Admin.")
			// throw new Error(error.message)
		}
	},
	async GET(url) {
		try {
			const response = await axios.request({
				method: "GET",
				...$axiosConfig,
				url
			})
			return response.data
		} catch (error) {
			logger.captureException(error)
			// alert("Something! went side-ways :( ! Report sent to Admin.")
			// throw new Error(error.message)
		}
	},
	async DELETE(url, id) {
		try {
			await axios.request({
				method: "DELETE",
				...$axiosConfig,
				url: `${url}/${id}`
			})
		} catch (error) {
			logger.captureException(error)
			// alert("Something! went side-ways :( ! Report sent to Admin.")
			// throw new Error(error.message)
		}
	}
}
