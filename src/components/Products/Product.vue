<template>
  <div>
    <ListProduct
      v-if="isListProduct"
    />
    <AddProduct
      v-else-if="isAddProduct"    
    />
    <EditProduct
      v-else-if="isEditProduct"
    />
    <DetailProduct
      v-else-if="isDetailProduct"
    />
  </div>
</template>
<script>
import ListProduct from "./ListProduct.vue"; 
import AddProduct from "./AddProduct.vue";
import EditProduct from "./EditProduct.vue";
import DetailProduct from "./DetailProduct.vue";
import { pageManageData } from "../../utils/constant.js"; 

export default {
  components: {
    AddProduct,
    ListProduct,
    EditProduct,
    DetailProduct,
  },
  data() {
    return {
    };
  },
  methods: {
  },
   computed:{
    isListProduct(){
      return this.$store.state.pageglobal.pageName == pageManageData.LISTPRODUCT
    },
    isAddProduct(){
      return this.$store.state.pageglobal.pageName == pageManageData.ADDPRODUCT
    },
    isEditProduct(){
      return this.$store.state.pageglobal.pageName == pageManageData.EDITPRODUCT
    },
    isDetailProduct(){
      return this.$store.state.pageglobal.pageName == pageManageData.DETAILPRODUCT
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
