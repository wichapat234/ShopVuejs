<template>
  <div class="text-center">
    <h1>รายการสินค้า</h1>
    <br />
    <b-button variant="info" @click="addProduct(1)">เพิ่มสินค้า</b-button>
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
export default {
  data() {
    return {
      dataProduct: [],
      editProductPage: 2,
      objProduct: {},
      idProduct: 0,
    };
  },
  methods: {
    listProduct() {
      this.axios
        .post("http://localhost:40019/Product/List_Product")
        .then((response) => {
          this.dataProduct = response.data;
        });
    },
    addProduct(value) {
      this.$emit("subPageProduct", { pageAddProduct: value });
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
          if (response.data.status == "Seccess") {
            this.$emit("subPageProduct", {
              pageEditProduct: this.editProductPage,
              idProduct: response.data.id,
            });
          } else {
            alert("ข้อมูลนี้ถูกลบไปแล้ว");
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
          if (response.data == "Seccess") {
            alert("ลบข้อมูลสำเร็จ");
            this.listProduct();
          } else {
            alert("ข้อมูลนี้ถูกลบไปแล้ว");
            this.listProduct();
          }
        });
    },
  },
  mounted: function() {
    this.listProduct();
  },
};
</script>
<style scoped>
table {
  border: 1px solid;
  width: 900px;
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
