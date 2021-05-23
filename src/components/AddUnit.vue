<template>
<div  class="text-center">
     <h1>เพิ่มหน่วยสินค้า</h1>
     <input v-model="nameUnit" ><br><br>
     <b-button variant="success" @click="saveUnit()">บันทึก</b-button>
    </div>
 
</template>

<script>

import { status } from "../utils/constant.js";
import { unitPageId } from "../utils/constant.js"; 
export default {

data(){
    return{
        nameUnit:"",
        objUnit:{},
    };
}, 
methods: {
    saveUnit() {
        this.objUnit={Name:this.nameUnit};
      //  console.log(this.objunit);

       this.axios
         .post("http://localhost:40019/Unit/Insert_Unit",this.objUnit)
         .then(response => {
        if(response.data ==  status.SUCCEES){
            alert("บันทึกสำเร็จ")
            this.$emit("subPageUnit",{idPage:unitPageId.LISTUNIT});          
        }else if(response.data == status.Duplicate){
            alert("หน่วยสินค้าซ้ำ")
        }else if(response.data == status.ERROR){
            alert("เกิดข้อผิดพลาด")
            this.$emit("subPageUnit",{idPage:unitPageId.LISTUNIT});  
        }
      })
      //console.log(this.list)
    }
}
};

</script>

<style scoped>

</style>