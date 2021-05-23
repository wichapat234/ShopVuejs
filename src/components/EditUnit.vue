<template>
  <div  class="text-center">
    <h1>แก้ไขหน่วยสินค้า</h1>
    <input type="text" v-model="nameEdit"/><br /><br />
    <b-button variant="success" @click="updateUnit()">บันทึก</b-button>
  </div>
</template>

<script>
import { unitPageId } from "../utils/constant.js";
import { status } from "../utils/constant.js";
export default { 
  data() {
    return {
     nameEdit:"",
    };
  },
    mounted: function() {
      this.dataEditUnit();
  },
  props:[
      "idUnit"
  ],
  methods: {
     dataEditUnit() {
      this.axios
        .post(
          "http://localhost:40019/Unit/Edit_Unit_Page/?id=" +
            this.idUnit
        )
        .then((response) => {
           // console.log(response.data.unit1.nameUnit)
            this.nameEdit = response.data.unit1.nameUnit

        });
    },
    updateUnit() { //updateUnit
      this.objId = { IdUnit:parseInt(this.idUnit),Name:this.nameEdit}; //objId
      this.axios
        .post("http://localhost:40019/Unit/Update_Unit", this.objId)
        .then((response) => {
          if (response.data == status.SUCCEES) {
            alert("แก้ไขข้อมูลสำเร็จ");
            this.$emit('backPage',{idPage:unitPageId.LISTUNIT});    
          } else if (response.data == status.DUPLICATE) {
            alert("ข้อมูลสินค้าซ้ำ");
          } else if (response.data == status.NULL) {
            alert("ไม่พบข้อมูล");
            this.$emit('backPage',{idPage:unitPageId.LISTUNIT});  
          }else if (response.data == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
            this.$emit('backPage',{idPage:unitPageId.LISTUNIT});  
          }
        });
    },
  },

};
</script>

<style></style>
