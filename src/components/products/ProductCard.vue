<template>
	<v-card class="align-center" max-width="245" :elevation="elevate">
		<v-img :src="image" alt="No Image" contain />

		<v-card-title>{{ name }}</v-card-title>

		<v-divider class="mx-4 my-2" />

		<!-- <v-card-text> -->
		<h3>
			<div class="my-4 text-left ml-5 mb-0 pb-0">
				CAD $ {{ parseFloat(price).toFixed(2) }}
			</div>
		</h3>
		<v-card-actions>
			<v-btn
				class="ma-2 ml-3"
				outlined
				color="dark"
				data-test="addToCartBtn"
				@click="addProductToCartById"
				:disabled="preview"
				>Add to Cart</v-btn
			>
			<v-spacer />
			<v-btn
				class="ma-2 mr-3"
				icon
				fab
				data-test="deleteFromProductsBtn"
				color="error"
				@click="deleteProductById"
				:disabled="preview"
			>
				<v-icon>mdi-tag-minus</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		name: {
			type: String,
			default: "No Name Brand"
		},
		price: [String, Number],
		image: String,
		id: {
			type: [String, Number],
			required: true
		},
		preview: {
			type: Boolean,
			default: false // if true: disables btn's
		},
		elevate: Number
	},
	methods: {
		addProductToCartById: function() {
			this.$emit("addProductToCartById", this.id)
		},
		deleteProductById: function() {
			this.$emit("removeProductById", this.id)
		}
	}
}
</script>

<style></style>
