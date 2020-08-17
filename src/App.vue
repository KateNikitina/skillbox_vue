<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">152 товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-code.sync="filterColorCode"/>
      <section class="catalog">
        <ProductList :products="products" :categories="categories"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import products from "./data/products";
import categories from "./data/categories";

import ProductList from "./components/ProductList.vue";
import BasePagination from "./components/BasePagination.vue";
import ProductFilter from "./components/ProductFilter.vue";

export default {
  name: "App",
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorCode: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      let arr = []
      if (this.filterColorCode !== 0) {
        filteredProducts.map(i => {
          let item = i.colorCode.filter(color => {
            return color === this.filterColorCode
          })
           item.length !== 0 ? arr.push(i) : "";
        })
        filteredProducts = arr;
      }
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price
          >= this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => (product.price
          <= this.filterPriceTo));
      }
      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId
          === this.filterCategoryId);
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    categories() {
      return categories;
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
