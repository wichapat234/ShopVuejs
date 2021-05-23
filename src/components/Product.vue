<template>
  <div> 
    <ListProduct v-if="pageProduct == productPageId.LISTPRODUCT" @subPageProduct="switcPageProduct"/>
    <AddProduct v-if="pageProduct == productPageId.ADDPRODUCT" @subPageProduct="switcPageProduct"/>
    <EditProduct v-if="pageProduct == productPageId.EDITPRODUCT" @subPageProduct="switcPageProduct" :idProduct="idProduct"/>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { productPageId } from "../utils/constant.js"; 
import ListProduct from "./ListProduct.vue";
import AddProduct from "./AddProduct.vue";
import EditProduct from "./EditProduct.vue";

export default {
   components: {
    AddProduct,
    ListProduct,
    EditProduct
  },
  data() {
    return {
      productPageId:productPageId,
      pageProduct:3,
      idProduct: 0,
    };
  },
  methods: {
   switcPageProduct(value){
     console.log(value)
     this.pageProduct = value.idPage
     this.idProduct = value.idProduct;
   }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border: 1px solid;
  width: 50%;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
}
 th {
  border: 1px solid;
  font-size: 20px;
  height: 50px;
}
td {
   height: 50px;

}
</style>
