<template>
  <ul class="cart__orders">
    <img src="img/loading.gif" v-if="loading" style="height: 30px;display: block;margin: 0 auto;" />
    <li class="cart__order" v-for="item in products" :key="item.productId" v-else>
      <h3>{{item.title}}</h3>
      <b>{{ item.price | numberFormat }} ₽</b>
      <span>Артикул: {{item.productId}}</span>
      <span>Кол-во: {{item.amount}}</span>
    </li>

  </ul>
</template>


<script>

import numberFormat from '@/helpers/numberFormat';

export default {
  name:'ProductsInOrderPage',
  props:['products','loading'],
  filters: {
    numberFormat
  },
};
</script>
