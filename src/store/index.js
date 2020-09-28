import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: true,
  },
  mutations: {
    updateCartProduct(state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        };
      });
    },
    updateCartLoading(state, variable) {
      state.cartLoading = variable;
    },
  },
  getters: {
    getCartLoading(state) {
      return state.cartLoading;
    },
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((sum, item) => (item.product.price * item.amount) + sum, 0);
    }
  },
  actions: {

    deleteProductFromCart(context, { productId }) {
      //console.log(productId);
      // return (new Promise(resolve => setTimeout(resolve, 2000)))
      //.then(() => {
      return axios.delete(API_BASE_URL + `/api/baskets/products`, {
        params: {
          productId: productId,
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          //console.log(response)
          //context.commit('deleteCartProduct', productId);
          //context.commit('updateCartProductsData', response.data.items);
        });
      //});
    },
    addProductCart(context, { productId, amount }) {
      context.commit('updateCartLoading', true);
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
          return axios.post(API_BASE_URL + `/api/baskets/products`, {
            productId: productId,
            quantity: amount
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
              context.commit('updateCartLoading', false);
            });
        });
    },
    loadCart(context) {
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
          return axios.get(API_BASE_URL + `/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
            .then(response => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    preloaderLoadCart({ dispatch, commit }) {
      return dispatch('loadCart')
        .then(() => {
          commit('updateCartLoading', false);
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProduct', {
        productId,
        amount
      });
      if (amount < 1) {
        return;
      }
      return axios.put(API_BASE_URL + `/api/baskets/products`, {
        productId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    }

  }
});
