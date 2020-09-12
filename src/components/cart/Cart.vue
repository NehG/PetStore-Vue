<template>
	<v-card class="mx-auto" max-width="auto" flat>
		<v-alert
			max-width="800"
			class="mx-auto"
			v-if="isCartEmpty"
			outlined
			border="left"
			elevation="5"
			dense
		>
			<v-row align="center">
				<v-col class="grow">Sorry, your cart is empty.</v-col>
				<v-col class="shrink">
					<v-btn dark to="/">Shop Now!</v-btn>
				</v-col>
			</v-row>
		</v-alert>
		<v-list v-else>
			<v-list-item v-for="item in cart" :key="item.cId" class="my-2">
				<CartCard
					:name="item.name"
					:cId="item.cId"
					:price="item.price"
					:image="item.image"
					:id="item.id"
					:_timestamp="item._timestamp"
				/>
			</v-list-item>
		</v-list>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex"
import CartCard from "./CartCard.vue"

export default {
	name: "Cart",
	components: {
		CartCard
	},
	computed: {
		...mapGetters("cart", { cart: "itemsInCart", isCartEmpty: "isCartEmpty" })
	}
}
</script>

<style></style>
