<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" :type="type" v-model="dataValue" :placeholder="placeholder">
  </BaseFormField>
</template>


<script>

import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type:{
      default: 'text'
    }
  },
  mixins: [formFieldMixin]
};
</script>
