<template>
  <div class="text-center" id="tableUnit">
    
    <h1>รายการหน่วยสินค้า</h1>
    <br />
    <b-button variant="info" v-on:click="addUnit()">เพิ่มหน่วยสินค้า</b-button>
    <br /><br />
    <table class="table table-striped table-Active">
      <thead class="thead-dark">
        <tr>
          <th>หน่วยนับ</th>
          <th>เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" (list)  in dataUnit" :key="list.idUnit">
          <td >{{list.nameUnit }}</td>
          <td>
            <b-button variant="warning" v-on:click="editUnit(list.idUnit)">แก้ไข</b-button>&nbsp;
            <b-button variant="danger" v-on:click="deleteUnit(list.idUnit)">ลบ</b-button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { unitPageId } from "../utils/constant.js"; 
import { menuId } from "../utils/constant.js";
import { status } from "../utils/constant.js";

export default {
  name:"tableUnit",
  data() {
    return {
      dataUnit: [],
      unitPageId:unitPageId,
      objId: {},
      menuId:menuId,
      idUnit:0,
      nameUnit:"",
      pageAddUnit:0,
      component:'listUnit',
      
    };
  },
   mounted: function() {
    this.listUnit();
  },
  methods: {
    listUnit() {
      //  alert("132");
      this.axios
        .post("http://localhost:40019/Unit/List_Unit")
        .then((response) => {
          this.dataUnit = response.data.unit;
          console.log(response.data.unit);
        });
    },
    addUnit() {
    //  console.log(value)
      this.$emit("subPageUnit",{idPage:unitPageId.ADDUNIT})
    },
    deleteUnit(idUnit) {
      this.objId = { IdUnit: idUnit };
      this.axios
        .post("http://localhost:40019/Unit/Delete", this.objId)
        .then((response) => {
          if (response.data == status.SUCCEES) {
            alert("ลบข้อมูลสำเร็จ");       
               this.listUnit();
          } else if(response.data == status.NULL){
            alert("ไม่พบข้อมูลนี้");
             this.listUnit();
          }else if(response.data == status.ERROR){
            alert("เกิดข้อผิดพลาด");
             this.listUnit();
          }
        });
    },
    editUnit(value){
         this.idUnit = value
         this.objId = { IdUnit: this.idUnit };
      this.axios
        .post(
          "http://localhost:40019/Unit/Check_Edit_Unit",
          this.objId
        )
        .then((response) => {
          console.log(response)
          if (response.data.status == status.SUCCEES) {
            this.$emit("subPageUnit", {
              idPage:unitPageId.EDITUNIT,
              idUnit: response.data.id,
            });
          } else if(response.data == status.NULL) {
            alert("ไม่พบข้อมูลนี้");
            this.listProduct();
          }
        });
    }
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border: 1px solid;
  width: 50%;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
}
 th {
  border: 1px solid;
  font-size: 20px;
  height: 50px;
}
td {
   height: 50px;

}
</style>
