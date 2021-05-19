<template>
  <div class="text-center">
    <h1>เพิ่มสินค้า</h1>
    <br />
    <table>
      <tbody>
        <tr>
          <th>ชื่อสินค้า</th>
          <td><input v-model="nameProduct" placeholder="กรอกชื่อสินค้า" /></td>
        </tr>
        <tr>
          <th>ราคาสินค้า</th>
          <td><input type="number" v-model="namePrice" /></td>
        </tr>
        <tr>
          <th>หน่วยสินค้า</th>
          <td>            
            <b-form-select v-model="nameUnit" >
              <b-form-select-option :value="0"
              >เลือกหน่วยสินค้า</b-form-select-option
              >
              <b-form-select-option
                v-for="list in dataUnit"
                :key="list.idUnit"
                :value="list.idUnit"
                >{{ list.nameUnit }}</b-form-select-option
              >
            </b-form-select>
          </td>
        </tr>
      </tbody>
    </table>
    <br />

    <b-button class="text-center" variant="success" @click="saveProduct()"
      >บันทึก</b-button
    >
  </div>
</template>

<script>
import { menuId } from "../utils/constant.js";
export default {
  data() {
    return {
      dataUnit: [],
      nameProduct: "",
      nameUnit: 0,
      namePrice: 0,
      objProduct: {},
    };
  },
  methods: {
    listUnit() {
      this.axios
        .post("http://localhost:40019/Product/Add_Product_Page")
        .then((response) => {
          this.dataUnit = response.data.unit;
          console.log(response);
        });
    },
    saveProduct() {
      this.objProduct = {
        ProductPrice: parseInt(this.namePrice),
        ProductName: this.nameProduct,
        IdUnit: this.nameUnit,
      };
      this.axios
        .post("http://localhost:40019/Product/Insert_Product", this.objProduct)
        .then((response) => {
          if (response.data == "seccess") {
            alert("บันทึกสำเร็จ");
            this.$emit("backPage", { idMenu: menuId.PRODUCT });
          } else {
            alert("หน่วยสินค้าซ้ำ");
          }
        });
    },
  },
  mounted: function() {
    this.listUnit();
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
