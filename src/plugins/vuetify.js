import Vue from "vue"
// Install Vuetify
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vuetify.config.silent = false // true ---> production else false

Vue.use(Vuetify)

export default new Vuetify({
	theme: { light: true },
	icons: {
		iconfont: "mdiSvg" // using svg icons! performance (long-run)
	}
})
