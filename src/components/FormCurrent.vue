<template>
  <div class="item__row">
    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click="dekrement">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <input type="text" name="count" v-model.number="counter">
      <button type="button" aria-label="Добавить один товар" @click="counter++">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    <button class="button button--primery" type="submit" @click="$emit('counter-change', counter)">В корзину</button>
  </div>

</template>

<script>
export default {
  name: 'FormCurrent',
  data() {
    return {
      counter: 1
    };
  },
  methods: {
    dekrement() {
      if (this.counter > 1) {
        return this.counter--;
      }
    }
  }
};
</script>
