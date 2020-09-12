<template>
	<v-container key="center">
		<!-- TODO: use https://github.com/egoist/vue-content-loader for custom SVG skeleton loader -->
		<v-skeleton-loader
			:loading="productsAreLoading"
			height="330"
			type="list-item-two-line"
		>
			<v-alert
				v-if="isEmpty"
				icon="mdi-tag-off"
				outlined
				text
				border="left"
				elevation="5"
				dense
				class="mx-auto"
				max-width="800"
			>
				<v-row class="justify-center"
					>Tune in, we will be right back! with new products.
					<br />
					<small
						>NOTE: CodeSandBox (Backend Server) hibernates and reloades every 30
						mins. So, please try refeshing page or add a new product.</small
					>
				</v-row>
			</v-alert>
			<v-row v-else align="center" no-gutters>
				<v-col
					xs="12"
					sm="6"
					md="4"
					lg="3"
					xl="2"
					cols="12"
					class="my-3"
					align="center"
					:key="product.id"
					v-for="product in productsList"
				>
					<!-- child to parent data passing -->
					<ProductCard
						:id="product.id"
						:name="product.name"
						:price="product.price"
						:image="product.image"
						v-on:addProductToCartById="addProductToCartById"
						v-on:removeProductById="removeProductById"
						data-test="item-card"
					/>
				</v-col>
			</v-row>
		</v-skeleton-loader>
	</v-container>
</template>

<script>
import ProductCard from "./ProductCard.vue"
import { mapGetters, mapActions } from "vuex"

export default {
	name: "Products",
	components: {
		ProductCard
	},
	computed: {
		...mapGetters("products", {
			productsList: "products",
			productsAreLoading: "isLoading",
			isEmpty: "isProductsListEmpty"
		})
	},
	methods: {
		...mapActions("cart", {
			addProductToCartById: "addItemToCart"
		}),
		...mapActions("products", {
			removeProductById: "removeProductById"
		})
	}
}
</script>

<style></style>
