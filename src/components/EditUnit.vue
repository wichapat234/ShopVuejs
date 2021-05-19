<template>
  <div  class="text-center">
    <h1>แก้ไขหน่วยสินค้า</h1>
    <input type="text" v-model="setNameEdit"/><br /><br />
    <input type="hidden" v-model="idUnit">
    <b-button variant="success" @click="updateUnit()">บันทึก</b-button>
  </div>
</template>

<script>
import { menuId } from "../utils/constant.js";
export default {
  data() {
    return {
     setNameEdit:""
    };
  },
  
  props:[
      "nameUnit",
      "idUnit"
  ],
  methods: {
    updateUnit() { //updateUnit
       this.objId = { IdUnit: this.idUnit,Name:this.setNameEdit}; //objId
      //alert(id_unit)
     // console.log(this.obj_id);
      this.axios
        .post("http://localhost:40019/Unit/Update_Unit", this.objId)
        .then((response) => {
          if (response.data == "seccess") {
            alert("แก้ไขข้อมูลสำเร็จ");
            this.$emit('backPage',{idMenu:menuId.UNIT});    
          } else if (response.data == "fail") {
            alert("ข้อมูลสินค้าซ้ำ");
          } else if (response.data == "null") {
            alert("ข้อมูลนี้ถูกลบไปแล้ว");
            this.$emit('backPage',{idMenu:menuId.UNIT});  
          }
        });
    },
  },
  mounted() {
    this.setNameEdit = this.nameUnit
  }
};
</script>

<style></style>
