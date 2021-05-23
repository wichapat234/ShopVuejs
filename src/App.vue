<template>
  <div id="app">
    <Header @num="switchPage" />
    <Transaction v-if="numMenu == menuId.TRANSACTION" />
    <Unit v-if="numMenu == menuId.UNIT" @subPageUnit="switchPage" />
    <Product v-if="numMenu == menuId.PRODUCT" @subPageProduct="switchPage" />
    
  </div>
</template>
<script>
import { menuId } from "./utils/constant.js";
import Header from "./components/Header.vue";
import Product from "./components/Product.vue";
import Transaction from "./components/Transaction.vue";
import Unit from "./components/Unit.vue";


export default {
  name: "App",
  components: {
    Unit,
    Header,
    Transaction,
    Product,
  },
  data() {
    return {
      numMenu: 1,
      menuId: menuId,
    };
  },
  methods: {
    switchPage(value) {
      this.numMenu = value.idMenu;
     // this.pageAddUnit = value.pageAddUnit;
      this.pageEditUnit = value.pageEditUnit;
    //  this.nameUnit = value.nameUnit;
      
      this.pageAddProduct = value.pageAddProduct;
      this.pageEditProduct = value.pageEditProduct;
      this.idProduct = value.idProduct;
    },
  },
}
</script>

<style></style>
