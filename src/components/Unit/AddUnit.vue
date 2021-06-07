<template>
  <div class="text-center">
    <h3>เพิ่มหน่วยสินค้า</h3>
    <input v-model="nameUnit" /><br /><br />
    <b-button variant="success" @click="saveUnit()">บันทึก</b-button>
  </div>
</template>

<script>
import { status } from "../../utils/constant.js";
import { pageManageData } from "../../utils/constant.js";
export default {
  data() { 
    return {
      nameUnit: "",
    };
  },
  methods: {
    saveUnit() {
     // const objUnit = { Name: this.nameUnit };
      this.$store.dispatch("unit/addUnit",this.nameUnit).then((response) => {
        if (response == status.SUCCEES) {
          alert("บันทึกสำเร็จ");
          this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTUNIT);
        } else if (response == status.DUPLICATE) {
          alert("หน่วยสินค้าซ้ำ");
        } else if (response == status.ERROR) {
          alert("เกิดข้อผิดพลาด");
          this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTUNIT);
        }
      });
    },
  },
};
</script>

<style scoped></style>
