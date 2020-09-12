<template>
	<div>
		<v-app-bar dark>
			<v-icon class="mr-2">mdi-tag-text-outline</v-icon>

			<router-link to="/" class="text-decoration-none white--text">
				<v-toolbar-title>Pet Store</v-toolbar-title>
			</router-link>

			<v-spacer />

			<v-btn color="white" elevation="5" outlined to="/products/new"
				>Add New Product</v-btn
			>

			<v-btn icon to="/cart" class="ml-2 mr-1">
				<v-badge
					color="green"
					:content="noOfItemsInCart"
					:value="noOfItemsInCart"
					overlap
				>
					<v-icon>mdi-cart</v-icon>
				</v-badge>
			</v-btn>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: "Header",
	props: {
		noOfItemsInCart: {
			type: Number,
			default: 0
		}
	}
}
</script>
