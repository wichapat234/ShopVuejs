<template>
  <div id="app">
    <Header/>
    <Transaction v-if="$store.getters['pageglobal/isBillComponentsActive']" />
    <Unit v-else-if="$store.getters['pageglobal/isUnitComponentsActive']"  />
    <Product v-else-if="$store.getters['pageglobal/isProductComponentsActive']" />
  </div>
</template>
<script>

//import { pageManageData } from "./utils/constant.js"; 
import Header from "./components/Header.vue";
import Product from "./components/Products/Product.vue";
import Transaction from "./components/Transaction/Transaction.vue";
import Unit from "./components/Unit/Unit.vue";


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
    };
  },
  computed:{
     
  }
}
</script>

<style></style>
