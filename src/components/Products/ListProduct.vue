<template>
  <div class="text-center">
    <h3>รายการสินค้า</h3>
    <br />
    <b-button variant="info" @click="addProduct()">เพิ่มสินค้า</b-button>
    <br /><br />
    <table class="table table-striped table-Active">
      <colgroup>
        <col width="100" />
        <col width="100" />
        <col width="100" />
        <col width="150" />
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
        <tr v-for="list in dataProduct" :key="list.idProduct">
          <td>{{ list.nameProduct }}</td>
          <td>{{ list.nameUnit }}</td>
          <td>{{ list.productPrice }}</td>
          <td>
            <b-button
              variant="warning"
              v-on:click="editProduct(list.idProduct)"
              >แก้ไข</b-button
            >&nbsp;
            <b-button
              variant="danger"
              v-on:click="deleteProduct(list.idProduct)"
              >ลบ</b-button
            >
            &nbsp;
            <b-button
              variant="primary"
              v-on:click="
                detailProduct(list.idProduct)
              "
              >รายละเอียด</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { status } from "../../utils/constant.js";
import { pageManageData } from "../../utils/constant.js";
export default {
  data() {
    return {
   //   dataProduct: [],
      status: status,
    };
  },
  mounted: function() {
    this.listProduct();
  }, 
  methods: {
    detailProduct(id) {
       this.$store.commit('product/SET_ID_PRODUCT', id);
       this.$store.commit('pageglobal/SET_PAGE', pageManageData.DETAILPRODUCT);

    },
    listProduct() {
      this.$store.dispatch("unit/getDataUnit");
      this.$store.dispatch("product/getDataProduct");
    },
    addProduct() {
      this.$store.commit('pageglobal/SET_PAGE', pageManageData.ADDPRODUCT);
    },
    editProduct(productId) {
      console.log(productId)
      this.$store.commit('product/SET_PAGE', pageManageData.EDITPRODUCT);
      const objProduct = { IdProduct: parseInt(productId) };
      this.$store.commit('product/SET_ID_PRODUCT',productId);
      this.$store.dispatch("product/checkDataProduct", objProduct)
        .then((response) => {
          if (response == status.SUCCEES) {
            this.$store.commit('pageglobal/SET_PAGE', pageManageData.EDITPRODUCT); 
          } else if (response == status.NULL) {
            alert("ไม่พบข้อมูลนี้");
            this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTPRODUCT);
          }
        });
    },
    deleteProduct(idProduct) {
      console.log(idProduct)
      const objProduct = { IdProduct: idProduct };
       this.$store.dispatch("product/deleteProduct", objProduct)
        .then((response) => {
          console.log(response);
          if (response == status.SUCCEES) {
            alert("ลบข้อมูลสำเร็จ");
            this.listProduct();
          } else if (response == status.NULL) {
            alert("ไม่พบข้อมูลนี้");
            this.listProduct(); 
          } else if (response == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
            this.listProduct();
          }
        });
    },
  },
  computed:{
     dataProduct() {
      return this.$store.state.product.allDataProduct
    },
  }
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
