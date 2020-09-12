<template>
	<v-form ref="form" v-model="valid" class="ma-5">
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="name"
						:rules="productNameRules"
						clearable
						label="Name/Title"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12">
					<v-text-field
						v-model="price"
						clearable
						prepend-icon="mdi-currency-usd"
						:rules="productPriceRules"
						label="Price"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12">
					<v-text-field
						v-model="image"
						clearable
						:rules="productImageRules"
						label="Image URL"
						required
					></v-text-field>
				</v-col>
			</v-row>
		</v-container>

		<v-container fluid class="mx-auto mb-5">
			<h2 class="text-left ml-5 font-weight-thin">Preview</h2>
			<center>
				<ProductCard
					:id="generateId"
					:name="name"
					:image="image"
					:price="price"
					:elevate="10"
					preview
				/>
			</center>
		</v-container>
		<v-btn color="success" class="mr-2" outlined @click="validateAndAdd"
			>Looks Good!</v-btn
		>
		<v-btn color="error" clas="ml-2" outlined @click="resetForm"
			>Try Again</v-btn
		>
	</v-form>
</template>

<script>
import { uniqueId } from "lodash"
import ProductCard from "./ProductCard.vue"
import { mapActions } from "vuex"

export default {
	name: "NewProduct",
	components: {
		ProductCard
	},
	computed: {
		generateId: () => uniqueId()
	},
	methods: {
		...mapActions("products", { addNewProduct: "addNewProduct" }),
		validateAndAdd() {
			if (this.$refs.form.validate()) {
				this.addNewProduct({
					name: this.name,
					price: this.price,
					image: this.image
				})
				this.$router.push("/")
			}
		},
		resetForm() {
			this.$refs.form.reset()
		}
	},
	data: () => ({
		valid: false,
		name: "", // product (name ~ title)
		productNameRules: [v => !!v || "Name/Title is required"],
		image: "", // product image url
		productImageRules: [
			v => !!v || "Product Image URL is required",
			v =>
				/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/.test(v) ||
				"Image URL must be valid"
		],
		price: "",
		productPriceRules: [
			v => !!v || "Product Price is required",
			v => /^[+]?([.]\d+|\d+([.]\d+)?)$/.test(v) || "Price must be valid"
		]
	})
}
</script>

<style></style>
