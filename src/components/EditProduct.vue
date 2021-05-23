<template>
  <div class="text-center">
    <h1>แก้ไขสินค้า</h1>
    <br />
    <table>
      <tbody>
        <tr>
          <th>ชื่อสินค้า</th>
          <td><input v-model="nameProduct" /></td>
        </tr>
        <tr>
          <th>ราคาสินค้า</th>
          <td><input type="number" v-model="productPrice" /></td>
        </tr>
        <tr>
          <th>หน่วยสินค้า</th>
          <td>
          <b-form-select v-model="idUnit" :options="arrayDataUnit"></b-form-select>
          </td>
        </tr>
      </tbody>
    </table>
    <br />

    <b-button class="text-center" variant="success" @click="updateProduct()"
      >บันทึก</b-button
    >
  </div>
</template>

<script>
import {productPageId} from  "../utils/constant.js";
import { status } from "../utils/constant.js";
export default {
  data() {
    return {
      nameProduct: "",
      idUnit: 0,
      productPrice: 0,
      arrayDataUnit: [],
      dataUnit:{value:"",text:""},
    };
  },
   mounted: function() {
    this.dataEditProduct(); 
  },
  props: ["idProduct"],
  methods: {
    dataEditProduct() {
      console.log(this.idProduct)
      this.axios
        .post(
          "http://localhost:40019/Product/Edit_Product_Page/?id=" +
            this.idProduct
        )
        .then((response) => {
          console.log(response)
           let countUnit = response.data.unit.length;
           for(let i=0 ;i<countUnit;i++){
            this.dataUnit ={value:response.data.unit[i].idUnit , text:response.data.unit[i].nameUnit}
            this.arrayDataUnit.push(this.dataUnit)          
          }
          this.nameProduct = response.data.nameProduct;
          this.productPrice = response.data.productPrice;
          this.idUnit = response.data.idUnit;
        });
    },
    updateProduct() {
      this.objProduct = {
        IdProduct: this.idProduct,
        ProductName: this.nameProduct,
        ProductPrice: parseInt(this.productPrice),
        IdUnit: this.idUnit,
      };
      this.axios
        .post("http://localhost:40019/Product/Update_Product", this.objProduct)
        .then((response) => {
            console.log(response)
          if (response.data == status.SUCCEES) {
            alert("แก้ไขสินค้าสำเร็จ");
            this.$emit("subPageProduct",{idPage:productPageId.LISTPRODUCT})
          } else if (response.data == status.DUPLICATE) {
            alert("ข้อมูลสินค้าซ้ำ");
          } else if (response.data == status.NULL) {
            alert("ไม่พบข้อมูล");
            this.$emit("subPageProduct",{idPage:productPageId.LISTPRODUCT})
          } else if (response.data == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
            this.$emit('subPageProduct',{idPage:productPageId.LISTPRODUCT});  
          }
        });
    },
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
