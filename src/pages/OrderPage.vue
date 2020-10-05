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

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" v-model="formData.name" placeholder="Введите ваше полное имя"/>
            <BaseFormText title="Адрес доставки" :error="formError.address" v-model="formData.address" placeholder="Введите ваш адрес"/>
            <BaseFormText title="Телефон" type="tel" :error="formError.phone" v-model="formData.phone" placeholder="Введите ваш телефон"/>
            <BaseFormText title="Email" type="email" :error="formError.email" v-model="formData.email" placeholder="Введи ваш Email"/>
            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comments" v-model="formData.comments" placeholder="Ваши пожелания"/>
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
          <ProductsInOrderPage :products="products" />
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>
          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.</p>
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
      formError: {}
    };
  },
  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      loading: 'getCartLoading'
    }),
  }
};
</script>
