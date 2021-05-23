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
          <b-form-select v-model="nameUnit" :options="arrayDataUnit"></b-form-select>
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
import { productPageId } from "../utils/constant.js";
import { status } from "../utils/constant.js";
export default {
  data() {
    return {
      arrayDataUnit: [],
      dataUnit:{value:"",text:""},
      nameProduct: "",
      nameUnit: 0,
      namePrice: 0,
      objProduct: {},
    };
  }, 
  mounted: function() {
    this.listUnit();
  },
  methods: {
    listUnit() {
      this.axios
        .post("http://localhost:40019/Product/Add_Product_Page")
        .then((response) => {
          console.log(response);
          let countUnit = response.data.unit.length
          this.nameUnit = response.data.unit[0].idUnit;
          for(let i=0 ;i<countUnit;i++){
            this.dataUnit ={value:response.data.unit[i].idUnit , text:response.data.unit[i].nameUnit}
            this.arrayDataUnit.push(this.dataUnit)          
          }
         // console.log( this.arrayDataUnit);
        //  this.dataUnit ={value=}
        //  this.dataUnit = {response.data.unit}
          
        });
    },
    saveProduct() {
      this.objProduct = {
        ProductPrice: parseInt(this.namePrice),
        ProductName: this.nameProduct,
        IdUnit: this.nameUnit,
      };
      this.axios
        .post("http://localhost:40019/Product/Insert_Product", this.LISTPRODUCT)
        .then((response) => {
          console.log(response.data)
          if(response.data == status.SUCCEES) {
            alert("บันทึกสำเร็จ");
            this.$emit("subPageProduct", { idPage: productPageId.LISTPRODUCT });
          }else if(response.data == status.DUPLICATE){
            alert("หน่วยสินค้าซ้ำ");
          }else if(response.data == status.ERROR){
            alert("เกิดข้อผิดพลาด")
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
