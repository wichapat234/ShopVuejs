<template>
  <div id="app">
    <Header @num="switchPage" />
    <Transaction v-if="numMenu == menuId.TRANSACTION" />

    <Unit v-if="numMenu == menuId.UNIT" @subPageUnit="switchPage" />
    <AddUnit v-if="pageAddUnit == unitPageId.ADDUNIT" @backPage="switchPage" />
    <EditUnit
      v-if="pageEditUnit == unitPageId.EDITUNIT"
      @backPage="switchPage"
      :nameUnit="nameUnit"
      :idUnit="idUnit"
    />

    <Product v-if="numMenu == menuId.PRODUCT" @subPageProduct="switchPage" />
    <AddProduct v-if="pageAddProduct == productPageId.ADDPRODUCT"  @backPage="switchPage"/>
    <EditProduct v-if="pageEditProduct == productPageId.EDITPRODUCT" :idProduct="idProduct"  @backPage="switchPage"/>
    
  </div>
</template>

<script>
import { menuId } from "./utils/constant.js";
import { unitPageId } from "./utils/constant.js";
import { productPageId } from "./utils/constant.js";
import EditProduct from "./components/EditProduct.vue";
import AddProduct from "./components/AddProduct.vue";
import AddUnit from "./components/AddUnit.vue";
import EditUnit from "./components/EditUnit.vue";
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
    AddUnit,
    EditUnit,
    AddProduct,
    EditProduct

  },
  data() {
    return {
      numMenu: 1,
      pageEditUnit: 0,
      pageAddUnit: 0,
      nameUnit: "",
      idUnit: 0,
      menuId: menuId,
      unitPageId: unitPageId,
      pageAddProduct: 0,
      pageEditProduct:0,
      productPageId: productPageId,
      idProduct:0
    };
  },
  methods: {
    switchPage(value) {
      this.numMenu = value.idMenu;
      this.pageAddUnit = value.pageAddUnit;
      this.pageEditUnit = value.pageEditUnit;
      this.nameUnit = value.nameUnit;
      this.idUnit = value.idUnit;
   
      this.pageAddProduct = value.pageAddProduct;
      this.pageEditProduct = value.pageEditProduct;
      this.idProduct = value.idProduct;
    },
  },
}
</script>

<style></style>
