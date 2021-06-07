<template>
  <div class="text-center">
    <slot name="header"></slot>
    <table>
      <tbody>
        <tr>
          <th>ชื่อสินค้า</th>
          <td>
            <input
              v-model="productData.nameDataProduct"
              placeholder="กรอกชื่อสินค้า"
              :readonly="namePage == pageManageData.DETAILPRODUCT"
            />
          </td>
        </tr>
        <tr>
          <th>ราคาสินค้า</th>
          <td>
            <input
              type="number"
              v-model="namePrice"
              :readonly="namePage == pageManageData.DETAILPRODUCT"
            />
          </td>
        </tr>
        <tr>
          <th>หน่วยสินค้า</th>
          <td>
            <b-form-select
              v-model="nameUnit"
              :options="optionUnit"
              :disabled="namePage == pageManageData.DETAILPRODUCT"
            ></b-form-select>
          </td>
        </tr>
      </tbody>
    </table>
    <slot
      name="footer"
      v-bind:data="{ nameProduct, namePrice, nameUnit }"
    ></slot>
  </div>
</template>

<script>
import { pageManageData } from "../../utils/constant.js";

export default {
  data() {
    return {
      arrayDataUnit: [],
      nameProduct: "", 
      namePrice: 0,
      nameUnit:0,
      pageManageData: pageManageData,
      //idProduct:0
    };
  },
  props:{
    optionUnit : Array,
    productData : Object
  } ,
  mounted: function() { 
    // console.log("datapro",this.productData)
    // console.log("option",this.optionUnit) 
    this.setOption()
    this.setDataEdit()
  },
  methods: {  
    setOption(){
      this.nameUnit = this.dataIdUnit
    },
    setDataEdit(){  
     // console.log("cc",this.productData.nameDataProduct)
      // this.nameProduct = this.productData.nameDataProduct;
      // this.namePrice = this.productData.nameDataPrice;
      // this.nameUnit = this.productData.nameDataUnit;
    }
   
  },
  computed: {
    dataIdUnit() {
      return this.$store.state.unit.idUnit;
    },
    namePage(){
       return this.$store.state.product.pageName;
    }
  },
};
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}
th {
  width: 30%;
}
</style>
