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
            <select v-model="idUnit">
              <option
                v-for="list in dataUnit"
                :key="list.idUnit"
                :value="list.idUnit"
                >{{ list.nameUnit }}</option
              >
            </select>
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
import {menuId} from  "../utils/constant.js";
export default {
  data() {
    return {
      dataUnit: [],
      nameProduct: "",
      idUnit: 0,
      productPrice: 0,
    };
  },
  props: ["idProduct"],
  methods: {
    dataEditProduct() {
      this.axios
        .post(
          "http://localhost:40019/Product/Edit_Product_Page/?id=" +
            this.idProduct
        )
        .then((response) => {
          this.dataUnit = response.data.unit;
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
          if (response.data == "seccess") {
            alert("บันทึกสำเร็จ]");
            this.$emit("backPage",{idMenu:menuId.PRODUCT})
          } else if (response.data == "fail") {
            alert("ข้อมูลสินค้าซ้ำ");
          } else if (response.data == "null") {
            alert("ข้อมูลนี้ถูกลบไปแล้ว");
            this.$emit("backPage",{idMenu:menuId.PRODUCT})
          }
        });
    },
  },
  mounted: function() {
    this.dataEditProduct();
  },
};
</script>

<style>
table {
  margin-left: auto;
  margin-right: auto;
}
th {
  width: 30%;
}
</style>
