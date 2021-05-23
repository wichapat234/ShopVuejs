<template>
  <div class="text-center">
    <h1>รายการสินค้า</h1>
    <br />
    <b-button variant="info" @click="addProduct()">เพิ่มสินค้า</b-button>
    <br /><br />
    <table class="table table-striped table-Active">
      <colgroup>
        <col width="100" />
        <col width="100" />
        <col width="100" />
        <col width="100" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">สินค้า</th>
          <th scope="col">ชื่อหน่วย</th>
          <th scope="col">ราคา/ชิ้น</th>
          <th scope="col">เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in dataProduct" :key="list.product_Id">
          <td>{{ list.nameProduct }}</td>
          <td>{{ list.nameUnit }}</td>
          <td>{{ list.productPrice }}</td>
          <td>
            <b-button
              variant="warning"
              v-on:click="editProduct(list.product_Id)"
              >แก้ไข</b-button
            >&nbsp;
            <b-button
              variant="danger"
              v-on:click="deleteProduct(list.product_Id)"
              >ลบ</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

import { productPageId } from "../utils/constant.js"; 
import { status } from "../utils/constant.js";

export default {
  data() {
    return {
      dataProduct: [],
      productPageId: productPageId,
      objProduct: {},
      idProduct: 0,
      status:status
    };
  },
  mounted: function() {
    this.listProduct();
  },
  methods: {
    listProduct() {
      this.axios
        .post("http://localhost:40019/Product/List_Product")
        .then((response) => {
          this.dataProduct = response.data;
        });
    },
    addProduct() {
      this.$emit("subPageProduct", { idPage:productPageId.ADDPRODUCT});
    },
    editProduct(productId) {
      this.idProduct = productId;
      this.objProduct = { IdProduct: this.idProduct };
      this.axios
        .post(
          "http://localhost:40019/Product/Check_Edit_Product",
          this.objProduct
        )
        .then((response) => {
          if (response.data.status == status.SUCCEES) {
            this.$emit("subPageProduct", {
              idPage: productPageId.EDITPRODUCT,
              idProduct: response.data.id,
            });
          } else if(response.data.status == status.NULL){
            alert("ไม่พบข้อมูลนี้");
           this.listProduct();
          }
        });
    },
    deleteProduct(idProduct) {
      this.objProduct = { IdProduct: idProduct };
      this.axios
        .post("http://localhost:40019/Product/Delete_Product", this.objProduct)
        .then((response) => {
          console.log(response);
          if (response.data == status.SUCCEES) {
            alert("ลบข้อมูลสำเร็จ");
            this.listProduct();
          } else if(response.data == status.NULL){
            alert("ไม่พบข้อมูลนี้");
            this.listProduct();
          }else if(response.data == status.ERROR){
            alert("เกิดข้อผิดพลาด");
             this.listProduct();
          }
        });
    },
  },
};
</script>
<style scoped>
table {
  border: 1px solid;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
}
th,
tr {
  border: 1px solid;
  width: 60px;
  height: 62px;
}
th {
  font-size: 20px;
}
</style>
