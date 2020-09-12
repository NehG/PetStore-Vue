<template>
	<v-app>
		<v-container class="pt-0">
			<Header :noOfItemsInCart="noOfItemsInCart" />

			<!-- Sizes your content based upon application components -->
			<v-main>
				<h1 class="text-left my-4 text-uppercase font-weight-light">
					<span v-if="this.$route.name !== 'Index'">
						<v-btn dark @click="$router.go(-1)" class="my-auto mx-auto"
							>Go Back</v-btn
						>
						<v-divider vertical class="ml-4" style="display: inline;" />
					</span>
					{{ title }}
				</h1>
				<v-divider />
				<!-- Provides the application the proper gutter -->
				<v-container fluid>
					<!-- If using vue-router -->
					<router-view></router-view>
				</v-container>
			</v-main>
		</v-container>
	</v-app>
</template>

<script>
import { Header } from "@/components"
import { mapGetters, mapActions } from "vuex"

export default {
	name: "App",
	components: {
		Header
	},
	computed: {
		title: (self = this) => self.$route.meta.title,
		...mapGetters("products", {
			products: "products",
			products_IsLoading: "isLoading"
		}),
		...mapGetters("cart", {
			noOfItemsInCart: "noOfItemsInCart",
			cart_IsLoading: "isLoading"
		})
	},
	created() {
		this.fetchProducts()
		this.snapOrRetriveCart()
	},
	methods: {
		...mapActions({
			fetchProducts: "products/fetchProducts",
			snapOrRetriveCart: "cart/snapOrRetriveCart"
		})
	}
}
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
