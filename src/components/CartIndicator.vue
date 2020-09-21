<template>
  <img src="img/loading.gif" v-if="loading" style="height: 30px;" />
  <router-link class="header__cart" :to="{name:'cart'}" aria-label="Корзина с товарами" v-else>
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartIndicator',
  computed: {
    ...mapGetters({
      loading: 'getCartLoading'
    }),
  }
};

</script>
