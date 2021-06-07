<template>
  <div  class="text-center">
    <h3>แก้ไขหน่วยสินค้า</h3>
    <input type="text" v-model="nameEdit"/><br /><br />
    <b-button variant="success" @click="updateUnit()">บันทึก</b-button>
  </div>
</template>

<script>
import { status } from "../../utils/constant.js";
import { pageManageData } from "../../utils/constant.js";
export default { 
  data() {
    return {
     nameEdit:"",
    };
  },
    mounted: function() {
      this.dataEditUnit();
  },
  methods: {
     dataEditUnit() {
       this.$store.dispatch("unit/getDataEditUnit", this.dataId)
        .then((response) => {
            this.nameEdit = response.name
        });
    },
    updateUnit() { //updateUnit
      const objId = { IdUnit:parseInt(this.dataId),Name:this.nameEdit}; 
     // console.log("com",objId)
       this.$store.dispatch("unit/updateUnit", objId)
        .then((response) => {
          if (response.data == status.SUCCEES) {
            alert("แก้ไขข้อมูลสำเร็จ");
            this.$store.commit('unit/SET_ID_UNIT', undefined);
            this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTUNIT);
          } else if (response.data == status.DUPLICATE) {
            alert("ข้อมูลสินค้าซ้ำ");
          } else if (response.data == status.NULL) {
            alert("ไม่พบข้อมูล");
            this.$store.commit('unit/SET_ID_UNIT', undefined);
            this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTUNIT);
          }else if (response.data == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
            this.$store.commit('unit/SET_ID_UNIT', undefined);
            this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTUNIT);
          }
        });
    },
  },
  computed:{
    dataId(){
      return this.$store.state.unit.idUnit
    }
  }

};
</script>

<style></style>
