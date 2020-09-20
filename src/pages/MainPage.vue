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

import products from '@/data/products';
import categories from '@/data/categories';

import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

import axios from 'axios';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorCode: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      let arr = [];
      if (this.filterColorCode !== 0) {
        filteredProducts.map(i => {
          let item = i.colorCode.filter(color => {
            return color === this.filterColorCode;
          });
          item.length !== 0 ? arr.push(i) : '';
        });
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
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url
          };
        })
        : [];
    },
    categories() {
      return categories;
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    }
  },
  methods: {
    loadProducts() {
      axios.get(`http://vue-study.dev.creonit.ru/api/products?page=${this.page}&limit=${this.productsPerPage}`)
        .then(response => this.productsData = response.data);
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>
