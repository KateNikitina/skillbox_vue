<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'cart'}">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>
    </div>

    <section class="cart" v-if="this.$store.state.orderInfo">
      <h1 class="content__title">Заказ оформлен <span>№ {{this.$store.state.orderInfo.id}}</span></h1>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>
          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">Получатель</span>
              <span class="dictionary__value">{{this.$store.state.orderInfo.name}}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Адрес доставки</span>
              <span class="dictionary__value">{{this.$store.state.orderInfo.address}}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Телефон</span>
              <span class="dictionary__value">{{this.$store.state.orderInfo.phone}}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Email</span>
              <span class="dictionary__value">{{this.$store.state.orderInfo.email}}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Способ оплаты</span>
              <span class="dictionary__value">картой при получении</span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ProductsInOrderPage :products="products" :loading="loading"/>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{this.$store.state.orderInfo.totalPrice | numberFormat}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>

  </main>

</template>

<script>
import { mapGetters } from 'vuex';
import ProductsInOrderPage from '@/components/ProductsInOrderPage.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderInfoPage',
  components: { ProductsInOrderPage },
  filters: {
    numberFormat
  },
  computed:{
    ...mapGetters({
      loading: 'getCartLoading',
      products: 'orderInfoProducts'
    }),
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  }
};
</script>
