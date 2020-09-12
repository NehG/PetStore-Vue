<template>
	<v-card class="mx-auto" width="100%" outlined>
		<v-list-item three-line>
			<v-list-item-avatar rounded size="100" color="grey">
				<img :src="image" alt="cart-product-image" />
			</v-list-item-avatar>

			<v-list-item-content class="text-left">
				<v-list-item-title class="headline mb-1">{{ name }}</v-list-item-title>
				<v-list-item-subtitle class="subtitle-1 mt-1"
					>CAD
					<v-chip small color="black" class="font-weight-black" dark
						>$ {{ parseFloat(price).toFixed(2) }}</v-chip
					>
					<small class="font-weight-medium ml-1">+ taxes</small>
				</v-list-item-subtitle>
				<div class="caption font-italic font-weight-light mt-2">
					added {{ fromNow }}
				</div>
			</v-list-item-content>
			<v-card-actions class="float-right mt-2">
				<v-btn outlined @click="removeItemFromCartById" color="error"
					>Remove</v-btn
				>
			</v-card-actions>
		</v-list-item>
	</v-card>
</template>

<script>
import moment from "moment"

export default {
	name: "CartCard",
	props: {
		name: {
			type: String,
			default: "No Name Brand"
		},
		price: [String, Number],
		image: String,
		id: String,
		cId: {
			type: String,
			required: true
		},
		_timestamp: {
			type: [String, Number],
			required: true
		}
	},
	computed: {
		fromNow: (self = this) => moment(self._timestamp).fromNow()
	},
	methods: {
		removeItemFromCartById: function() {
			this.$store.dispatch("cart/removeCartItemById", this.cId)
		}
	}
}
</script>

<style></style>
