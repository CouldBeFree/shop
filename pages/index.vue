<template>
  <div>
    <h1>Products shop</h1>
    <v-row>
      <v-col col="12" sm="6">
        <v-form ref="products">
          <v-text-field
            label="{our_hostname}/products/?page=3&limit=10"
            required
            :rules="[v => !!v || 'Url is required']"
            color="warning"
            clearable
            v-model="productsUrl"
          ></v-text-field>
          <v-btn @click="getProductsFromInput" color="warning">Get products</v-btn>
        </v-form>
      </v-col>
      <v-col col="12" sm="6">
        <v-form ref="product">
          <v-text-field
            label="{our_hostname}/products/2"
            required
            color="warning"
            clearable
            :rules="[v => !!v || 'Url is required']"
            v-model="productUrl"
          ></v-text-field>
          <v-btn color="warning" @click="getProduct">Get product</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row v-if="products">
      <v-col v-for="(product, index) in products" :key="index" cols="12" sm="3">
        <product-card
          :url="product.product_url"
          :title="product.name"
          :index="index"
          :loading="loading"
        ></product-card>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="text-center mt-4" v-if="productsLength > 1">
          <v-pagination
            :length="productsLength"
            :value="meta.page"
            @input="onPageSelect($event)"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <div v-else>
      <h2>No products</h2>
    </div>
    <v-snackbar
      :value="error"
      :timeout="3000"
      top
      color="error"
    >
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
import productCard from '../components/productCard';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  async fetch ({ store }) {
    await store.dispatch('common/getProducts')
  },
  data(){
    return {
      productUrl: '',
      productsUrl: ''
    }
  },
  components: {
    productCard
  },
  computed: {
    ...mapState('common', {
      products: state => state.products.products,
      meta: state => state.products.meta,
      loading: state => state.loading,
      error: state => state.error
    }),
    productsLength(){
      return Math.ceil(this.meta.count / this.meta.limit)
    }
  },
  methods: {
    ...mapActions('common', ['getProducts', 'getProductsFromInput']),
    ...mapMutations('common', ['setPageIndex', 'setLoading', 'setError', 'setProducts']),
    async onPageSelect(val){
      this.setPageIndex(val);
      await this.getProducts();
    },
    getProduct(){
      if(this.$refs.product.validate()){
        let id = this.productUrl.split('/');
        id = id.splice(-1)[0];
        this.$router.push({ path: `/product/${id}` })
      }
    },
    async getProductsFromInput(){
      if(this.$refs.products.validate()){
        this.setLoading(true);
        this.setError('');
        try{
          const { data } = await this.$axios.get(this.productsUrl);
          this.setProducts(data);
        }
        catch (e) {
          this.setError(e.message)
        }
        this.setLoading(false);
      }
    }
  }
}
</script>
