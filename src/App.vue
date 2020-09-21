<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapActions(['loadCart', 'preloaderLoadCart']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.preloaderLoadCart();
  },

};
</script>
