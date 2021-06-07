<template>
  <SlotProduct>
    <template v-slot:header>
      <h3>รายละเอียดสินค้า</h3>
    </template>
    <template v-slot:footer>
      <b-button
        class="text-center" 
        variant="outline-secondary"
        @click="backMenu()"
        >กลับหน้ารายการ</b-button
      >
    </template>
  </SlotProduct>
</template>

<script>
import { pageManageData } from "../../utils/constant.js";
import SlotProduct from "./SlotProduct.vue";
export default {
  data() {
    return {
      pageManageData: pageManageData,
    };
  },
  components: {
    SlotProduct,
  },
  mounted: function(){

  },
  methods: {
    backMenu() {
       this.$store.commit('product/SET_PAGE', pageManageData.LISTPRODUCT);
    },
  },
};
</script>

<style scoped>
</style>
