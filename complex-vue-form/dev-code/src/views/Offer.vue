<template lang="pug">
  .section.offer
    .offer__data
      h1 Offer Data
      .form-data
        pre {{offer}}
</template>

<script>
import { mapState } from "vuex";

export default {

  name: 'Offer',

  computed: {
    ...mapState(['offer'])
  }
}
</script>

<style scoped lang="scss">
.offer {
  background-color: #fff;
  box-shadow: 0px 0px 29px 0px rgba(128,128,128,0.15);

  .offer__data {
    padding: 20px 0;

    h1 {
      font-size: 1.4rem;
      margin: 20px 0;
      text-align: center;
    }
  }
}
</style>
