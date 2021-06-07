<template>
  <SlotProduct :optionUnit="arrayDataUnit" :productData="productData">
    <template v-slot:header>
      <h3>แก้ไขสินค้า</h3>
    </template>
    <br />

    <br />
    <template v-slot:footer="slotProps">
      <b-button
        class="text-center" 
        variant="success"
        @click="updateProduct(slotProps.data)"
        >บันทึก</b-button
      >
    </template>
    
  </SlotProduct>
</template>

<script>
import { pageManageData } from "../../utils/constant.js";
//import { status } from "../utils/constant.js";
import SlotProduct from "./SlotProduct.vue";
//import { localhost } from "../utils/constant.js";

export default {
  components: {
    SlotProduct,
  },
  data() {
    return {
      pageManageData: pageManageData,
      productData: {},
      arrayDataUnit: [],
    };
  },
  mounted: function() {
    this.getDataEditProduct();
    // console.log("xccxc",this.productData)
  },
  methods: {
    updateProduct(value) {
      // console.log("edit:", value);
      const objProduct = {
        IdProduct: value.dataId,
        ProductName: value.nameProduct,
        ProductPrice: parseInt(value.namePrice),
        IdUnit: value.nameUnit,
      };
      this.$store
        .dispatch("product/updateProduct", objProduct)
        .then((response) => {
          // console.log(response);
          if (response.data == status.SUCCEES) {
            alert("แก้ไขสินค้าสำเร็จ");
            this.$store.commit("product/SET_PAGE", pageManageData.LISTPRODUCT);
          } else if (response.data == status.DUPLICATE) {
            alert("ข้อมูลสินค้าซ้ำ");
          } else if (response.data == status.NULL) {
            alert("ไม่พบข้อมูล");
            this.$store.commit("product/SET_PAGE", pageManageData.LISTPRODUCT);
          } else if (response.data == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
            this.$store.commit("product/SET_PAGE", pageManageData.LISTPRODUCT);
          }
        });
    },
    getDataEditProduct() {
      //this.$store.dispatch("unit/getDataUnit");
      // console.log("id",this.dataId)
      // const id = this.dataId
      this.$store
        .dispatch("product/getDataEditProduct", this.dataIdProduct)
        .then((response) => {
           console.log(response.nameProduct);
          let countUnit = response.getUnit.length;
          for (let i = 0; i < countUnit; i++) {
            const dataUnit = {
              value: response.getUnit[i].idUnit,
              text: response.getUnit[i].nameUnit,
            };
            this.arrayDataUnit.push(dataUnit);
          }
          this.productData = {
            nameDataProduct: response.nameProduct,
            nameDataPrice: response.productPrice,
            nameDataUnit: response.idUnit,
          };
        });
    },
  },
  computed: {
    dataIdProduct() {
      return this.$store.state.product.idProduct;
    },
  },
};
</script>

<style scoped></style>
