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
      <h1 class="content__title">Оформление заказа</h1>
    </div>
    <div class="loader" v-if="orderPageLoading">
      <div class="l_main">
        <div class="l_square"><span></span><span></span><span></span></div>
        <div class="l_square"><span></span><span></span><span></span></div>
        <div class="l_square"><span></span><span></span><span></span></div>
        <div class="l_square"><span></span><span></span><span></span></div>
      </div>
    </div>
    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" v-model="formData.name"
                          placeholder="Введите ваше полное имя"/>
            <BaseFormText title="Адрес доставки" :error="formError.address" v-model="formData.address"
                          placeholder="Введите ваш адрес"/>
            <BaseFormText title="Телефон" type="tel" :error="formError.phone" v-model="formData.phone"
                          placeholder="Введите ваш телефон"/>
            <BaseFormText title="Email" type="email" :error="formError.email" v-model="formData.email"
                          placeholder="Введи ваш Email"/>
            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment" v-model="formData.comment"
                              placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">Самовывоз <b>бесплатно</b></span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">Курьером <b>500 ₽</b></span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">Картой при получении</span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">Наличными при получении</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ProductsInOrderPage :products="products" :loading="loading"/>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>
          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>


<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import ProductsInOrderPage from '@/components/ProductsInOrderPage.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'OrderPage',
  components: {
    BaseFormText,
    BaseFormTextarea,
    ProductsInOrderPage
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderPageLoading: false
    };
  },
  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters({
      products: 'orderDetailProducts',
      totalPrice: 'cartTotalPrice',
      loading: 'getCartLoading'
    }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderPageLoading = true;
      clearTimeout(this.loadOrderTimer);
      this.loadOrderTimer = setTimeout(() => {
        axios.post(API_BASE_URL + '/api/orders', {
          ...this.formData
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
          .then(response => {
            this.$store.commit('resetCart');
            this.orderPageLoading = false;
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({
              name: 'orderInfo',
              params: { id: response.data.id }
            });
          })
          .catch(error => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
            this.orderPageLoading = false;
          });
      }, 3000);
    }
  }
};
</script>
