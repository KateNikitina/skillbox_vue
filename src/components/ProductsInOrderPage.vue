<template>
  <ul class="cart__orders">


    <li class="cart__order" v-for="item in products" :key="item.productId">
      <h3>{{item.product.title}}</h3>
      <b>{{ item.product.price | numberFormat }} ₽</b>
      <span>Артикул: {{item.productId}}</span>
      <span>Кол-во: {{item.amount}}</span>
    </li>

  </ul>
</template>


<script>

import numberFormat from '@/helpers/numberFormat';

export default {
  name:'ProductsInOrderPage',
  props:['products'],
  filters: {
    numberFormat
  },
};
</script>
