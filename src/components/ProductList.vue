<template>
  <ul class="catalog__list" >
    <ProductItem v-for="product in products" :key="product.id" :product="product" :categories="categories" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products', 'categories'],
};
</script>
