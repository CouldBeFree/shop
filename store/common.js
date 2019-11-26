export const state = () => ({
  products: [],
  loading: false,
  product: {},
  error: '',
  page: 1,
  url: ''
});

export const mutations = {
  setLoading(state, loading){
    state.loading = loading
  },
  setProducts(state, products){
    state.products = products
  },
  setProduct(state, product){
    state.product = product
  },
  setError(state, error){
    state.error = error
  },
  setPageIndex(state, page){
    state.page = page
  }
};

export const actions = {
  async getProducts({state, commit}){
    commit('setLoading', true);
    commit('setError', '');
    try{
      const { data } = await this.$axios.get('https://api.predic8.de:443/shop/products/?limit=12', {params: { page: state.page }});
      commit('setProducts', data);
    }catch (e) {
      commit('setError', e.message)
    }
    commit('setLoading', false);
  },
  async getProduct({state, commit}, id){
    commit('setLoading', true);
    commit('setError', '');
    try{
      const { data } = await this.$axios.get(`https://api.predic8.de:443/shop/products/${id}`);
      commit('setProduct', data);
    }catch (e) {
      commit('setError', e.message)
    }
    commit('setLoading', false);
  }
};
