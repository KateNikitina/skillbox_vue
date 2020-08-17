<template>
  <li class="catalog__item" >
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">{{product.title}}</a>
    </h3>

    <span class="catalog__price">{{product.price}} ₽</span>
    <span class="catalog__title">{{category}} </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="(item, index) in product.colorCode" :key="index">
        <label class="colors__label" >
          <input class="colors__radio sr-only" type="radio" value="#73B6EA">
          <span class="colors__value" :style="`background-color: ${item};`"></span>
        </label>
      </li>
    </ul>

  </li>
</template>

<script>



export default {
  name: 'ProductItem',
  props: ['product','categories'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
  computed:{
    category(){
      let category = '';
      category = this.categories.filter((category) => this.product.categoryId === category.id)[0].title;
      return category;
    }
  }
};
</script>
